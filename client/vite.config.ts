import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 允許透過 IP 訪問
    port: 5173, // 你也可以在這裡指定想要的 port
    proxy: {
      "/api": "http://192.168.0.10:3001", // 只要是 /api 開頭的請求，自動轉給後端
    },
    open: true, // 專案啟動時自動開啟瀏覽器
  },
});
