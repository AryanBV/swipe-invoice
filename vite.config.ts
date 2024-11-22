import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdf-parse']
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      path: 'path-browserify',
      crypto: 'crypto-browserify',
      buffer: 'buffer',
    }
  },
  define: {
    'process.env': {},
    global: 'window'
  }
})