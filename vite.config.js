import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Account-Recovery-WebApp/' : '/',
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true,
    historyApiFallback: true
  }
})
