import { useState, useRef, useCallback, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, RefreshCw } from 'lucide-react'
import Webcam from 'react-webcam'

const WebcamFeed = forwardRef((props, ref) => {
  const internalRef = useRef(null)
  const webcamRef = ref || internalRef
  const [facingMode, setFacingMode] = useState('user') // 'user' = front camera, 'environment' = back camera
  const [isWebcamReady, setIsWebcamReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  }

  const handleFlipCamera = useCallback(() => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'))
  }, [])

  const handleUserMedia = () => {
    setIsWebcamReady(true)
    setHasError(false)
  }

  const handleUserMediaError = (error) => {
    console.error('Webcam error:', error)
    setHasError(true)
    setIsWebcamReady(false)
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Webcam Video */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={handleUserMedia}
        onUserMediaError={handleUserMediaError}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
        mirrored={facingMode === 'user'}
      />

      {/* Loading State */}
      {!isWebcamReady && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950" style={{ zIndex: 2 }}>
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mb-4"
            >
              <Camera className="w-16 h-16 text-purple-400 mx-auto" />
            </motion.div>
            <p className="text-sm text-slate-400">Initializing camera...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950" style={{ zIndex: 2 }}>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-lg font-bold text-red-400 mb-2">Camera Access Denied</h3>
            <p className="text-sm text-slate-400 mb-4 max-w-xs">
              Please allow camera access in your browser settings to use The Vibe Translator.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Camera indicator - with glassmorphism */}
      {isWebcamReady && (
        <motion.div
          className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-green-500/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ zIndex: 10 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-green-300">Live Camera</span>
        </motion.div>
      )}

      {/* Flip Camera Button - with glassmorphism */}
      {isWebcamReady && (
        <motion.button
          onClick={handleFlipCamera}
          className="absolute bottom-4 right-4 p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 hover:border-purple-500/50 transition-all duration-300 shadow-lg group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ zIndex: 10 }}
        >
          <RefreshCw className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
        </motion.button>
      )}

      {/* Subtle overlay for glassmorphism effect */}
      {isWebcamReady && (
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10"
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  )
})

WebcamFeed.displayName = 'WebcamFeed'

export default WebcamFeed
