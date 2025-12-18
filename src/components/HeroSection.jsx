import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

const HeroSection = ({ onStartSession }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [50, 0, 50],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 max-w-4xl text-center" variants={containerVariants}>
        {/* Logo / Branding */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
        >
          The Vibe Translator
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform non-verbal cues into real-time emotional intelligence. See emotions, understand moods, connect deeper.
        </motion.p>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '👁️', title: 'Real-time Detection', desc: 'Instant emotion recognition' },
            { icon: '🎨', title: 'Visual Feedback', desc: 'Dynamic color morphing UI' },
            { icon: '♿', title: 'Accessible Design', desc: 'Built for everyone' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              whileHover={{
                y: -5,
                borderColor: 'rgba(168, 85, 247, 0.8)',
              }}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onStartSession}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Session</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default HeroSection
