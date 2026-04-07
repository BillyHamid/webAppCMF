import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // En dev : le front appelle `/finacom` → même origine (pas de CORS). Cible = API Finacom.
    proxy: {
      '/finacom': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/finacom/, ''),
      },
    },
  },
})
