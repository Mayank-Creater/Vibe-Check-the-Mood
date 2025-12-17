import { useState, useCallback, useEffect } from 'react'

export const useEmotionSimulation = () => {
  const [currentEmotion, setCurrentEmotion] = useState('neutral')
  const [emotionHistory, setEmotionHistory] = useState([])
  const [isAutoSimulating, setIsAutoSimulating] = useState(false)

  // Format current time as HH:MM AM/PM
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  // Simulate emotion change
  const simulateEmotion = useCallback((emotion) => {
    setCurrentEmotion(emotion)

    // Add to history with timestamp and confidence
    setEmotionHistory((prev) => {
      const newEntry = {
        emotion,
        time: getCurrentTime(),
        confidence: Math.floor(Math.random() * 25) + 75, // 75-99%
        timestamp: Date.now(),
      }

      // Keep only last 20 entries
      const updated = [newEntry, ...prev]
      return updated.slice(0, 20)
    })
  }, [])

  // Auto-simulate emotions
  useEffect(() => {
    if (!isAutoSimulating) return

    const emotions = ['happy', 'sad', 'angry', 'focused', 'neutral']
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emotions.length
      simulateEmotion(emotions[currentIndex])
    }, 3000) // Change emotion every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoSimulating, simulateEmotion])

  // Clear history
  const clearHistory = useCallback(() => {
    setEmotionHistory([])
  }, [])

  // Toggle auto simulation
  const toggleAutoSimulation = useCallback(() => {
    setIsAutoSimulating((prev) => !prev)
  }, [])

  return {
    currentEmotion,
    emotionHistory,
    simulateEmotion,
    clearHistory,
    isAutoSimulating,
    toggleAutoSimulation,
  }
}
