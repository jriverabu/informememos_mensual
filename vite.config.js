import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para asegurar que el despliegue en Netlify sea fluido
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})
