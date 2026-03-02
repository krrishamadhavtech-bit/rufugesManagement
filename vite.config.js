import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // CRITICAL: This allows the service worker to work during local development
      },
      manifest: {
        name: 'Refuge Management',
        short_name: 'RefugeMS',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg}'],
        runtimeCaching: [
          {
            // Cache same-origin assets
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'NetworkFirst',
            options: { cacheName: 'app-assets' }
          },
          {
            // Cache external images (CDNs like Unsplash, etc)
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Images don't change often, so CacheFirst is better
            options: {
              cacheName: 'external-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            }
          }
        ]
      }
    })
  ],
})
