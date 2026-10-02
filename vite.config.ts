import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' supaya path aset relatif -> aman di root domain maupun subfolder
export default defineConfig({
  plugins: [react()],
  base: './',
})
