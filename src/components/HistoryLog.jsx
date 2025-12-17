import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

const emotionEmojis = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  focused: '😐',
  neutral: '🤷',
}

const emotionColors = {
  happy: 'text-yellow-400 bg-yellow-900/20',
  sad: 'text-blue-400 bg-blue-900/20',
  angry: 'text-red-400 bg-red-900/20',
  focused: 'text-purple-400 bg-purple-900/20',
  neutral: 'text-slate-400 bg-slate-900/20',
}

const HistoryLog = ({ emotions = [] }) => {
  const containerVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { staggerChildren: 0.1 },
  }

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="h-full bg-gradient-to-b from-slate-900/50 to-slate-950/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6 flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Vibe History</h2>
        <p className="text-sm text-slate-400">Last 20 detections</p>
      </div>

      {/* Timeline */}
      <motion.div
        className="flex-1 overflow-y-auto space-y-3 pr-2"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {emotions.length === 0 ? (
          <motion.div
            className="flex items-center justify-center h-full text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-center">
              <div className="text-2xl mb-2">🔮</div>
              <span className="text-sm">Waiting for emotions...</span>
            </p>
          </motion.div>
        ) : (
          emotions.map((entry, index) => (
            <motion.div
              key={`${entry.timestamp}-${index}`}
              variants={itemVariants}
              className={`p-3 rounded-lg backdrop-blur-sm border border-white/10 ${emotionColors[entry.emotion] || 'text-slate-400 bg-slate-900/20'} transition-all duration-200 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer`}
              whileHover={{ x: 5, scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{emotionEmojis[entry.emotion] || '🤷'}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm capitalize">{entry.emotion}</p>
                  <p className="text-xs opacity-75">{entry.time}</p>
                </div>
                <span className="text-xs font-bold opacity-60">{entry.confidence}%</span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Footer with stats */}
      {emotions.length > 0 && (
        <motion.div
          className="mt-6 pt-6 border-t border-white/10 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Detected:</span>
            <span className="text-purple-400 font-bold">{emotions.length}</span>
          </div>

          {/* Most common emotion */}
          {emotions.length > 0 && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Most Common:</span>
              <span className="text-pink-400 font-bold">
                {emotions.reduce((acc, curr) => {
                  acc[curr.emotion] = (acc[curr.emotion] || 0) + 1
                  return acc
                }, {}) &&
                  Object.entries(
                    emotions.reduce((acc, curr) => {
                      acc[curr.emotion] = (acc[curr.emotion] || 0) + 1
                      return acc
                    }, {})
                  ).sort((a, b) => b[1] - a[1])[0]?.[0]}
              </span>
            </div>
          )}

          {/* Clear button */}
          <button
            className="w-full mt-3 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={() => {
              // This would call the clear history function from parent
            }}
          >
            <Trash2 className="w-3 h-3" />
            Clear History
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default HistoryLog
