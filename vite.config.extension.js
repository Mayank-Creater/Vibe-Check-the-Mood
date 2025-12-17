import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite config specifically to build the Chrome extension content script
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-extension',
    emptyOutDir: true,
    // Build the content script as a self-contained bundle
    lib: {
      entry: path.resolve(__dirname, 'src/extension/content.jsx'),
      name: 'contentScript',
      formats: ['iife'],
      fileName: () => 'contentScript.js',
    },
    cssCodeSplit: false,
    define: {
      'process.env.NODE_ENV': '\"production\"',
      'process.env': '{}',
      'global': 'globalThis',
    },
    rollupOptions: {
      // Bundle everything (no externals) so content script is standalone
      external: [],
      output: {
        entryFileNames: 'contentScript.js',
        chunkFileNames: 'contentScript.[name].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (name.endsWith('.css')) return 'style.css'
          return '[name][extname]'
        },
        // Add process polyfill banner at the very top of the bundle
        banner: '(function(){if(typeof globalThis.process===\"undefined\"){globalThis.process={env:{NODE_ENV:\"production\"},emit:function(){},nextTick:function(f){Promise.resolve().then(f)}}}})();',
      },
    },
    target: 'chrome105',
  },
})
