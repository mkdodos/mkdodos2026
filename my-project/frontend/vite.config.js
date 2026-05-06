import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 或者直接寫 true
    proxy: {
      // 當你的前端程式碼呼叫 /api 開頭的路徑時
      "/api": {
        target: "http://192.168.0.10:3000", // 目標後端伺服器 IP
        changeOrigin: true, // 允許跨域
        // 如果你的後端 API 本身沒有 /api 前綴，可以透過 rewrite 拿掉它
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
