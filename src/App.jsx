import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false)

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSessionActive ? (
          <HeroSection
            key="hero"
            onStartSession={() => setIsSessionActive(true)}
          />
        ) : (
          <Dashboard
            key="dashboard"
            onEndSession={() => setIsSessionActive(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
