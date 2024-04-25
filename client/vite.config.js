import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'], 
      manifest: {
        name: 'Desktop Scheduler',
        short_name: 'DS',
        description: 'Desktop Scheduler is a simple and easy to use desktop application that allows you to schedule your tasks and events.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
      {
        src: '/leaf.png',  // Assuming leaf.png is directly in the public folder
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/leaf.png',  // Reusing the same icon for simplicity; ideally have different sizes
        sizes: '512x512',
        type: 'image/png',
      }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    }
  },
})

