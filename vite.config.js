// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/EasyGo/', // название репозитория
  server: {
    port: 3000,
    open: true // автоматически открывать браузер при запуске
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})