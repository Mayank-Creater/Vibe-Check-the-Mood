/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vibe-dark': '#0a0e27',
        'vibe-darker': '#050812',
        'vibe-purple': '#a855f7',
        'vibe-blue': '#06b6d4',
        'vibe-pink': '#ec4899',
        'vibe-gold': '#fbbf24',
        'vibe-green': '#10b981',
        'vibe-red': '#ef4444',
      },
      backdropBlur: {
        'xl': '20px',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      keyframes: {
        'glow': {
          '0%, 100%': { 'text-shadow': '0 0 10px rgba(168, 85, 247, 0.5)' },
          '50%': { 'text-shadow': '0 0 30px rgba(168, 85, 247, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
