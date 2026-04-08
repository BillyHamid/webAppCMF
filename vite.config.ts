import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const finacomProxy = {
  '/finacom': {
    target: 'https://cmfback.onrender.com',
    changeOrigin: true,
    secure: true,
    rewrite: (path: string) => path.replace(/^\/finacom/, ''),
  },
} as const;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Dev : `/finacom` → API Finacom (évite CORS).
    proxy: { ...finacomProxy },
  },
  preview: {
    // Même logique pour `npm run preview` (évite CORS si base relative `/finacom`).
    proxy: { ...finacomProxy },
  },
})
