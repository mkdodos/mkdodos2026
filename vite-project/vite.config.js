import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/vite-c/', // 必須跟 Nginx 的路徑一致
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 或者直接寫 true
    port: 5555      // 這是預設埠號，也可以自行更改
  }
})
