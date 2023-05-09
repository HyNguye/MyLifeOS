import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/MyLifeOS/',
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@asset': path.resolve(__dirname, './src/assets'),
      '@comp' :path.resolve(__dirname, './src/components'),
      '@page' :path.resolve(__dirname, './src/pages'),
      '@app' :path.resolve(__dirname, './src/components/Application'),
    },
  }
})
