import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',  // 添加这行！
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    sourcemap: true
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  define: {
    global: 'globalThis',
  }
})
