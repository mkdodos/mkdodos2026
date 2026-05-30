
```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: "0.0.0.0", // 或者直接寫 true
  },
});
```


## package.json

依據此檔案設定
命令列輸入 
`npm run dev` : 開啟 vite 伺服器
`npm run build` : 打包檔案到 dist 資料夾

```javascript
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },