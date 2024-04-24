import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import path from 'path';  // Import the path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Existing React plugin
    VitePWA({ // PWA plugin configuration
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'], // Add more assets as needed
      manifest: {
        name: 'My React PWA',
        short_name: 'ReactPWA',
        description: 'An example Progressive Web App built with React and Vite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // Path to the icons (ensure these files exist)
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      workbox: {
        // Workbox options for custom service worker rules, if needed
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'),  // Alias configuration to resolve src directory
    }
  },
})
