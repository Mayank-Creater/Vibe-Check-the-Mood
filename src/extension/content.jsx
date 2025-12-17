/*
  Chrome extension content script entry.
  - Detects active video calls by scanning <video> elements
  - Mounts a React overlay that shows the detected vibe
*/
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

// Bring in Tailwind styles and base app styles into the content script bundle
import '@/index.css'

// Use a lightweight overlay without framer-motion to avoid peer conflicts
import VibeOverlay from './VibeOverlayLite.jsx'
import { useVibeDetection } from '@/hooks/useVibeDetection.js'

// Minimal process shim for environments (e.g., Chrome content scripts) that lack it
if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
  // eslint-disable-next-line no-undef
  window.process = { env: {} }
}

const CALL_HOST_HINTS = [
  'meet.google.com',
  'zoom.us',
  'teams.microsoft.com',
  'web.whatsapp.com',
  'discord.com',
  'whereby.com',
  'workplace.com',
  'slack.com',
  'jitsi',
]

function isLikelyCallEnvironment() {
  const href = window.location.href.toLowerCase()
  return CALL_HOST_HINTS.some((hint) => href.includes(hint))
}

function isVideoVisible(video) {
  if (!video || !video.isConnected) return false
  const style = window.getComputedStyle(video)
  if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity || '1') === 0) return false
  const rect = video.getBoundingClientRect()
  if (rect.width < 160 || rect.height < 120) return false
  // Must be in viewport at least partially
  if (rect.bottom < 0 || rect.right < 0 || rect.top > (window.innerHeight || 0) || rect.left > (window.innerWidth || 0)) {
    // allow offscreen if very large (some UIs scroll)
    return rect.width * rect.height > 320 * 240
  }
  return true
}

function isPlaying(video) {
  try {
    return !!(video && video.readyState >= 2 && !video.paused && !video.ended)
  } catch {
    return false
  }
}

function findLargestActiveVideo() {
  const videos = Array.from(document.querySelectorAll('video'))
  const candidates = videos.filter((v) => isVideoVisible(v) && (isPlaying(v) || v.srcObject instanceof MediaStream))
  if (candidates.length === 0) return null
  candidates.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)
  return candidates[0] || null
}

function VibeOverlayContainer() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    // Debug hook to confirm script injection
    // eslint-disable-next-line no-console
    console.info('[VibeCheck] content script mounted', { href: window.location.href })
  }, [])

  // Adapter ref to satisfy useVibeDetection which expects webcamRef.current.video
  const webcamLikeRef = useRef({ video: null })

  // Keep ref synced with chosen video element
  useEffect(() => {
    webcamLikeRef.current.video = activeVideo || null
  }, [activeVideo])

  // Re-scan for videos periodically and on DOM changes
  useEffect(() => {
    let stopped = false
    const rescan = () => {
      if (stopped) return
      const v = findLargestActiveVideo()
      if (v && v !== activeVideo) setActiveVideo(v)
    }
    const interval = window.setInterval(rescan, 1200)
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.addedNodes.length || m.removedNodes.length || m.attributeName === 'class' || m.attributeName === 'style') {
          rescan()
          break
        }
      }
    })
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] })
    rescan()
    return () => {
      stopped = true
      window.clearInterval(interval)
      mo.disconnect()
    }
  }, [])

  const isCall = useMemo(() => {
    return !!activeVideo || isLikelyCallEnvironment()
  }, [activeVideo])

  const detection = useVibeDetection(webcamLikeRef, enabled && isCall)

  // Small control button
  const toggle = () => setEnabled((v) => !v)

  // Always mount container so we can debug/force enable; hide card when not on a call

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2147483647 }}>
      {/* Toggle button */}
      <div style={{ position: 'fixed', top: 12, right: 12, pointerEvents: 'auto' }}>
        <button
          onClick={toggle}
          title={enabled ? 'Hide Vibe' : 'Show Vibe'}
          className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${enabled ? 'bg-purple-600/80 hover:bg-purple-600 text-white border-purple-400/50' : 'bg-black/40 hover:bg-black/60 text-slate-100 border-white/20'}`}
        >
          {enabled ? 'Vibe On' : 'Vibe Off'}
        </button>
      </div>

      {/* The overlay card */}
      {enabled && isCall && (
        <div style={{ position: 'fixed', right: 0, bottom: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'relative', pointerEvents: 'auto' }}>
            <VibeOverlay
              emotion={detection.currentVibe}
              confidence={detection.confidence}
              faceDetected={detection.faceDetected}
              detectionStatus={detection.detectionStatus}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function mount() {
  if (document.getElementById('vibe-check-overlay-root')) return

  const container = document.createElement('div')
  container.id = 'vibe-check-overlay-root'
  document.documentElement.appendChild(container)

  const root = createRoot(container)
  root.render(<VibeOverlayContainer />)
}

// Delay mount until DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mount()
} else {
  window.addEventListener('DOMContentLoaded', mount, { once: true })
}
