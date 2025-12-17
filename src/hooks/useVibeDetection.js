import { useState, useEffect, useRef, useCallback } from 'react'
import * as faceapi from 'face-api.js'

// Predefined vibes for the demo
const VIBES = ['Joyful', 'Intense', 'Calm', 'Sarcastic', 'Confused']

export const useVibeDetection = (webcamRef, isActive = true) => {
  const [currentVibe, setCurrentVibe] = useState('neutral')
  const [detectionStatus, setDetectionStatus] = useState('Initializing...')
  const [confidence, setConfidence] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  
  const detectionIntervalRef = useRef(null)
  const lastVibeRef = useRef('neutral')
  const transitionTimeoutRef = useRef(null)

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/'
        
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ])
        
        setModelsLoaded(true)
        setDetectionStatus('Ready')
        console.log('Face detection models loaded successfully')
      } catch (error) {
        console.warn('Failed to load face-api models, using simulation mode:', error)
        setModelsLoaded(false)
        setDetectionStatus('Simulation Mode')
      }
    }

    loadModels()
  }, [])

  // Map face-api expressions to our vibes
  const mapExpressionToVibe = useCallback((expressions) => {
    if (!expressions) return null

    const expressionArray = Object.entries(expressions).sort((a, b) => b[1] - a[1])
    const dominantExpression = expressionArray[0]

    const expressionMap = {
      happy: 'Joyful',
      surprised: 'Intense',
      neutral: 'Calm',
      sad: 'Confused',
      angry: 'Intense',
      disgusted: 'Sarcastic',
      fearful: 'Confused',
    }

    return expressionMap[dominantExpression[0]] || 'Calm'
  }, [])

  // Simulate vibe detection with smooth transitions
  const simulateVibeDetection = useCallback(() => {
    const randomVibe = VIBES[Math.floor(Math.random() * VIBES.length)]
    const randomConfidence = Math.floor(Math.random() * 20) + 80 // 80-99%
    
    // Smooth transition - only change if different from last vibe
    if (randomVibe.toLowerCase() !== lastVibeRef.current) {
      // Clear any pending transition
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }

      // Add slight delay for smooth transition
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentVibe(randomVibe.toLowerCase())
        setConfidence(randomConfidence)
        lastVibeRef.current = randomVibe.toLowerCase()
      }, 150)
    }
  }, [])

  // Detect face and analyze vibe
  const detectVibeFromVideo = useCallback(async () => {
    if (!webcamRef?.current?.video || !isActive) return

    const video = webcamRef.current.video

    // Check if video is ready
    if (video.readyState !== 4) {
      setDetectionStatus('Initializing...')
      return
    }

    try {
      if (modelsLoaded) {
        // Real face detection using face-api.js
        setDetectionStatus('Analyzing...')

        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()

        if (detections) {
          setFaceDetected(true)
          setDetectionStatus('Face Detected')
          
          const vibe = mapExpressionToVibe(detections.expressions)
          const confidenceValue = Math.max(...Object.values(detections.expressions)) * 100

          // Smooth transition
          if (vibe && vibe.toLowerCase() !== lastVibeRef.current) {
            if (transitionTimeoutRef.current) {
              clearTimeout(transitionTimeoutRef.current)
            }

            transitionTimeoutRef.current = setTimeout(() => {
              setCurrentVibe(vibe.toLowerCase())
              setConfidence(Math.floor(confidenceValue))
              lastVibeRef.current = vibe.toLowerCase()
            }, 150)
          }
        } else {
          // No face detected
          setFaceDetected(false)
          setDetectionStatus('Searching...')
          
          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current)
          }
          
          transitionTimeoutRef.current = setTimeout(() => {
            setCurrentVibe('neutral')
            setConfidence(0)
            lastVibeRef.current = 'neutral'
          }, 150)
        }
      } else {
        // Fallback to simulation mode
        setDetectionStatus('Simulating...')
        simulateVibeDetection()
        setFaceDetected(true)
      }
    } catch (error) {
      console.error('Detection error:', error)
      setDetectionStatus('Searching...')
      setFaceDetected(false)
    }
  }, [webcamRef, isActive, modelsLoaded, mapExpressionToVibe, simulateVibeDetection])

  // Start/stop detection loop
  useEffect(() => {
    if (isActive && modelsLoaded !== null) {
      // Start detection every 1 second
      detectionIntervalRef.current = setInterval(() => {
        detectVibeFromVideo()
      }, 1000)

      // Run immediately on start
      detectVibeFromVideo()
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [isActive, modelsLoaded, detectVibeFromVideo])

  // Manual trigger for simulation mode
  const triggerManualVibe = useCallback((vibe) => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentVibe(vibe.toLowerCase())
      setConfidence(Math.floor(Math.random() * 20) + 80)
      lastVibeRef.current = vibe.toLowerCase()
      setFaceDetected(true)
    }, 150)
  }, [])

  return {
    currentVibe,
    detectionStatus,
    confidence,
    faceDetected,
    modelsLoaded,
    triggerManualVibe,
  }
}
