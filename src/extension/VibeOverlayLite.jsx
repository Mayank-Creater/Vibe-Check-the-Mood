import React from 'react'

const emotionConfig = {
  joyful: {
    emoji: '😊',
    color: 'from-yellow-400 to-orange-400',
    glowColor: 'shadow-lg shadow-yellow-500/50',
    bgGradient: 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30',
    borderColor: 'border-yellow-500/50',
    textColor: 'text-yellow-100',
  },
  intense: {
    emoji: '🔥',
    color: 'from-red-500 to-orange-600',
    glowColor: 'shadow-lg shadow-red-500/50',
    bgGradient: 'bg-gradient-to-br from-red-900/30 to-orange-900/30',
    borderColor: 'border-red-500/50',
    textColor: 'text-red-100',
  },
  calm: {
    emoji: '😌',
    color: 'from-blue-400 to-cyan-400',
    glowColor: 'shadow-lg shadow-blue-500/50',
    bgGradient: 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30',
    borderColor: 'border-blue-500/50',
    textColor: 'text-blue-100',
  },
  sarcastic: {
    emoji: '😏',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'shadow-lg shadow-purple-500/50',
    bgGradient: 'bg-gradient-to-br from-purple-900/30 to-pink-900/30',
    borderColor: 'border-purple-500/50',
    textColor: 'text-purple-100',
  },
  confused: {
    emoji: '😕',
    color: 'from-amber-500 to-yellow-600',
    glowColor: 'shadow-lg shadow-amber-500/50',
    bgGradient: 'bg-gradient-to-br from-amber-900/30 to-yellow-900/30',
    borderColor: 'border-amber-500/50',
    textColor: 'text-amber-100',
  },
  neutral: {
    emoji: '🤷',
    color: 'from-slate-400 to-slate-500',
    glowColor: 'shadow-lg shadow-slate-500/30',
    bgGradient: 'bg-gradient-to-br from-slate-900/30 to-slate-800/30',
    borderColor: 'border-slate-500/30',
    textColor: 'text-slate-100',
  },
}

export default function VibeOverlayLite({ emotion = 'neutral', confidence: propConfidence, faceDetected = true, detectionStatus = 'Ready' }) {
  const config = emotionConfig[emotion] || emotionConfig.neutral
  const confidence = propConfidence !== undefined ? propConfidence : Math.floor(Math.random() * 25) + 75

  return (
    <div className="absolute right-6 bottom-6 max-w-xs z-20">
      <div className={`${config.bgGradient} ${config.borderColor} ${config.glowColor} backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300`}>
        <div className="text-6xl mb-4 select-none">{config.emoji}</div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold capitalize mb-1">{emotion}</h3>
          <p className={`text-sm ${config.textColor} opacity-80`}>Detected Vibe</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Confidence</span>
            <span className="text-sm font-bold text-green-400">{confidence}%</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/10">
            <div className={`h-full bg-gradient-to-r ${config.color}`} style={{ width: `${confidence}%`, transition: 'width 1s ease-out' }} />
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex justify-between">
            <span>Face Detected:</span>
            <span className={`font-medium ${faceDetected ? 'text-green-400' : 'text-yellow-400'}`}>{faceDetected ? '✓ Yes' : '⚠ Searching'}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-white font-medium">{detectionStatus}</span>
          </div>
          <div className="flex justify-between">
            <span>Detection:</span>
            <span className={`font-medium ${config.color.includes('yellow') ? 'text-yellow-400' : 'text-purple-400'}`}>
              {faceDetected ? 'Active' : 'Standby'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
