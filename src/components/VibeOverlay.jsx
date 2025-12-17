import { motion } from 'framer-motion'

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
  // Legacy support for old emotions
  happy: {
    emoji: '😊',
    color: 'from-yellow-400 to-orange-400',
    glowColor: 'shadow-lg shadow-yellow-500/50',
    bgGradient: 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30',
    borderColor: 'border-yellow-500/50',
    textColor: 'text-yellow-100',
  },
  sad: {
    emoji: '😢',
    color: 'from-blue-400 to-cyan-400',
    glowColor: 'shadow-lg shadow-blue-500/50',
    bgGradient: 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30',
    borderColor: 'border-blue-500/50',
    textColor: 'text-blue-100',
  },
  angry: {
    emoji: '😠',
    color: 'from-red-500 to-orange-600',
    glowColor: 'shadow-lg shadow-red-500/50',
    bgGradient: 'bg-gradient-to-br from-red-900/30 to-orange-900/30',
    borderColor: 'border-red-500/50',
    textColor: 'text-red-100',
  },
  focused: {
    emoji: '😐',
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'shadow-lg shadow-purple-500/50',
    bgGradient: 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30',
    borderColor: 'border-purple-500/50',
    textColor: 'text-purple-100',
  },
}

const VibeOverlay = ({ emotion = 'neutral', confidence: propConfidence, faceDetected = true, detectionStatus = 'Ready' }) => {
  const config = emotionConfig[emotion] || emotionConfig.neutral
  const confidence = propConfidence !== undefined ? propConfidence : Math.floor(Math.random() * 25) + 75 // 75-99%

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  }

  return (
    <motion.div
      className="absolute right-6 bottom-6 max-w-xs z-20"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
      key={emotion}
    >
      {/* Glass card container */}
      <motion.div
        className={`${config.bgGradient} ${config.borderColor} ${config.glowColor} backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
      >
        {/* Emoji */}
        <motion.div
          className="text-6xl mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {config.emoji}
        </motion.div>

        {/* Vibe Label */}
        <div className="mb-4">
          <motion.h3
            className="text-2xl font-bold capitalize mb-1"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {emotion}
          </motion.h3>
          <p className={`text-sm ${config.textColor} opacity-80`}>Detected Vibe</p>
        </div>

        {/* Confidence Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Confidence</span>
            <motion.span
              className="text-sm font-bold text-green-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {confidence}%
            </motion.span>
          </div>
          
          {/* Confidence Bar */}
          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/10">
            <motion.div
              className={`h-full bg-gradient-to-r ${config.color}`}
              initial={{ width: '0%' }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

        {/* Additional Info */}
        <div className="space-y-2 text-xs text-slate-300">
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span>Face Detected:</span>
            <span className={`font-medium ${faceDetected ? 'text-green-400' : 'text-yellow-400'}`}>
              {faceDetected ? '✓ Yes' : '⚠ Searching'}
            </span>
          </motion.div>
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span>Status:</span>
            <span className="text-white font-medium">{detectionStatus}</span>
          </motion.div>
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span>Detection:</span>
            <span className={`font-medium ${config.color.includes('yellow') ? 'text-yellow-400' : 'text-purple-400'}`}>
              {faceDetected ? 'Active' : 'Standby'}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating particles */}
      <svg className="absolute -inset-4 w-full h-full pointer-events-none" style={{ filter: 'blur(1px)' }}>
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${20 + i * 15}%`}
            cy={`${40 + i * 10}%`}
            r="2"
            fill={config.color.includes('yellow') ? '#FBBF24' : config.color.includes('red') ? '#EF4444' : '#A855F7'}
            opacity="0.3"
            animate={{
              cy: [
                `${40 + i * 10}%`,
                `${30 + i * 10}%`,
                `${40 + i * 10}%`,
              ],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default VibeOverlay
