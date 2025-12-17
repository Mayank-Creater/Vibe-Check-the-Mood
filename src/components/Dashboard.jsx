import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import WebcamFeed from './WebcamFeed'
import VibeOverlay from './VibeOverlay'
import HistoryLog from './HistoryLog'
import SimulationControls from './SimulationControls'
import { useVibeDetection } from '../hooks/useVibeDetection'
import { useEmotionSimulation } from '../hooks/useEmotionSimulation'

const Dashboard = ({ onEndSession }) => {
  const webcamRef = useRef(null)
  const [isRunning, setIsRunning] = useState(true)
  const [useAIDetection, setUseAIDetection] = useState(true)
  
  // AI Detection Hook
  const {
    currentVibe,
    detectionStatus,
    confidence,
    faceDetected,
    modelsLoaded,
    triggerManualVibe,
  } = useVibeDetection(webcamRef, isRunning && useAIDetection)
  
  // Fallback to manual simulation
  const { currentEmotion, emotionHistory, simulateEmotion, clearHistory } = useEmotionSimulation()
  
  // Use AI detection if active, otherwise use manual simulation
  const displayEmotion = useAIDetection ? currentVibe : currentEmotion
  const displayConfidence = useAIDetection ? confidence : undefined

  const toggleSimulation = useCallback(() => {
    setIsRunning(!isRunning)
  }, [isRunning])
  
  const handleEmotionChange = useCallback((emotion) => {
    if (useAIDetection) {
      triggerManualVibe(emotion)
    } else {
      simulateEmotion(emotion)
    }
  }, [useAIDetection, triggerManualVibe, simulateEmotion])

  return (
    <motion.div
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="relative z-50 border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Vibe Translator</h1>
              <p className="text-xs text-purple-300">Real-time Emotion Detection</p>
            </div>
          </div>

          <motion.button
            onClick={onEndSession}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Webcam Feed Area - Spans 3 columns */}
          <motion.div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 aspect-video rounded-2xl overflow-hidden border border-purple-500/30">
              <WebcamFeed ref={webcamRef} />
              
              {/* Vibe Overlay */}
              <VibeOverlay 
                emotion={displayEmotion} 
                confidence={displayConfidence}
                faceDetected={faceDetected}
                detectionStatus={detectionStatus}
              />

              {/* Detection Status Badge */}
              <motion.div
                className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-cyan-500/50 flex items-center gap-2 z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={isRunning && faceDetected ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-cyan-300">
                  {!isRunning ? 'Paused' : modelsLoaded ? 'AI Detection' : 'Simulation Mode'}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* History Log - Right Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <HistoryLog emotions={emotionHistory} />
          </motion.div>
        </div>

        {/* Controls Section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SimulationControls
            onEmotionChange={handleEmotionChange}
            onToggleSimulation={toggleSimulation}
            isRunning={isRunning}
            onClearHistory={clearHistory}
            currentEmotion={displayEmotion}
            useAIDetection={useAIDetection}
            onToggleAIDetection={() => setUseAIDetection(!useAIDetection)}
            modelsLoaded={modelsLoaded}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
