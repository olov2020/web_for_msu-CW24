/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    assetsDir: 'static',
    outDir: 'dist',
  },
  server: {
    port: 5173,
    cors: true,
    proxy: {
      "/api": {
        target: "127.0.0.1:5000",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
*/
