import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/stick-drift-fix/',
  plugins: [react(), tailwindcss()],
})
