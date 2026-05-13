import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: "0.0.0.0", // 或者直接寫 true
  },
  proxy: {
    // 當你的前端程式碼呼叫 /api 開頭的路徑時
    "/api": {
      target: "http://192.168.0.10:3001", // 目標後端伺服器 IP
      changeOrigin: true, // 允許跨域
    },
  },
});
