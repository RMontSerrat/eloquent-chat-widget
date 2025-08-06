import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // Define process.env for browser compatibility
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {},
    global: 'globalThis',
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'EloquentChatWidget',
      fileName: (format) => `eloquent-chat-widget.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Remove external dependencies to create a standalone widget
      output: {
        // Ensure the global variable is properly exposed
        globals: {},
        exports: 'named',
      }
    },
    cssCodeSplit: false,
  },
  preview: {
    open: '/demo.html',
    port: 4173,
    host: true
  },
})