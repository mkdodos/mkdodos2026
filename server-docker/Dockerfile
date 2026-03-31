# 1. 使用輕量級的 Node.js 映像檔 (Alpine 版本體積最小)
FROM node:20-alpine

# 2. 設定容器內的工作目錄
WORKDIR /usr/src/app

# 3. 先複製 package 檔案，這能利用 Docker Cache，若沒新增套件就不會重新 npm install
COPY package*.json ./

# 4. 安裝依賴
RUN npm install

# 5. 複製其餘的程式碼 (排除 .dockerignore 中定義的檔案)
COPY . .

# 6. 宣告容器監聽的埠號 (僅供參考)
EXPOSE 3000

# 7. 啟動指令
CMD ["node", "index.js"]