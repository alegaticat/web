import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- DEBE SER ASÍ

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() 
  ],
  base: '/web/', 
})