import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        // verborgen pagina: nergens gelinkt, alleen bereikbaar via de exacte url
        wieRijdt: 'rit-fwgezser/index.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
