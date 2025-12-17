import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Zap } from 'lucide-react'

const SimulationControls = ({
  onEmotionChange,
  onToggleSimulation,
  isRunning,
  onClearHistory,
  currentEmotion,
  useAIDetection = true,
  onToggleAIDetection,
  modelsLoaded = false,
}) => {
  const emotions = ['joyful', 'intense', 'calm', 'sarcastic', 'confused']

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Emotion Selection Grid */}
      <motion.div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            {modelsLoaded && useAIDetection ? 'AI Detection Override' : 'Manual Simulation'}
          </h3>
          
          {/* AI Detection Toggle */}
          {onToggleAIDetection && (
            <motion.button
              onClick={onToggleAIDetection}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                useAIDetection
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-slate-700 text-slate-400 border border-slate-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {useAIDetection ? '🤖 AI Mode' : '🎮 Manual Mode'}
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {emotions.map((emotion) => (
            <motion.button
              key={emotion}
              onClick={() => onEmotionChange(emotion)}
              className={`relative px-6 py-3 rounded-lg font-semibold capitalize transition-all duration-300 ${
                currentEmotion === emotion
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {emotion}
              {currentEmotion === emotion && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-white/30"
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 flex-wrap">
          {/* Play/Pause */}
          <motion.button
            onClick={onToggleSimulation}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isRunning
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30'
            }`}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Resume
              </>
            )}
          </motion.button>

          {/* Clear History */}
          <motion.button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 transition-all duration-300"
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Clear History
          </motion.button>
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-6"
        variants={buttonVariants}
      >
        <p className="text-sm text-slate-300 leading-relaxed">
          <span className="text-cyan-400 font-semibold">💡 Tip:</span>{' '}
          {modelsLoaded && useAIDetection ? (
            <>
              AI detection is analyzing your facial expressions in real-time. Click emotion buttons to manually override detection, 
              or toggle to Manual Mode for full control.
            </>
          ) : (
            <>
              Click the emotion buttons above to simulate different vibes. Watch how the Vibe Overlay changes with smooth transitions. 
              {!modelsLoaded && ' AI models are loading in the background...'}
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default SimulationControls
