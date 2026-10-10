import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'cleanup-legacy-pwa',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            if (req.url.startsWith('/src/main.jsx')) {
              req.url = req.url.replace('/src/main.jsx', '/src/main.tsx');
            } else if (req.url.startsWith('/manifest.webmanifest')) {
              res.setHeader('Content-Type', 'application/manifest+json');
              res.end('{}');
              return;
            } else if (req.url.includes('sw.js') || req.url.includes('workbox-')) {
              res.setHeader('Content-Type', 'application/javascript');
              res.end('self.addEventListener("install", () => self.skipWaiting()); self.addEventListener("activate", () => self.registration.unregister());');
              return;
            }
          }
          next();
        });
      }
    },
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
          animation: ['framer-motion', 'gsap']
        }
      }
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    fs: {
      allow: [
        '.',
        '/Users/anakolte/.gemini/antigravity-ide/brain/654d7a30-8aa7-4dd2-a528-6538ae759e55',
        '/Users/anakolte/.gemini/antigravity-ide/brain/685a2c53-5220-4a0f-bae3-dbca08ebdee3'
      ]
    }
  }
})
