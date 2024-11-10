import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      app: "/src/app",
      assets: "/src/assets",
      widgets: "/src/widgets",
    },
  },
})
