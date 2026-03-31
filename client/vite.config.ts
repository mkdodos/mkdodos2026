import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 允許透過 IP 訪問
    port: 5173, // 你也可以在這裡指定想要的 port
    proxy: {
      "/api": {
        target: "http://mkdodos-server:3000", // 👈 改成你的後端容器名稱
        // target: "http://localhost:3000",
        changeOrigin: true,
        // 如果後端 API 本身就包含 /api 前綴，則不需要 rewrite
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // proxy: {
    // 只要是 /api 開頭的請求，自動轉給後端
    //"/api": "http://192.168.0.10:3001",
    // "/api": "http://localhost:3000",
    // },
    open: true, // 專案啟動時自動開啟瀏覽器
  },
});
