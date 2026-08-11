import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 80 },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion', 'gsap'],
          three: ['three']
        }
      }
    }
  },
  server: {
    fs: {
      allow: [
        '.',
        '/Users/anakolte/.gemini/antigravity-ide/brain/654d7a30-8aa7-4dd2-a528-6538ae759e55',
        '/Users/anakolte/.gemini/antigravity-ide/brain/685a2c53-5220-4a0f-bae3-dbca08ebdee3'
      ]
    }
  }
})
