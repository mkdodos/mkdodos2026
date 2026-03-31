# 1. 使用 Node 環境
FROM node:20-alpine

# 2. 設定工作目錄
WORKDIR /usr/src/app

# 3. 複製設定檔並安裝套件
COPY package*.json ./
RUN npm install

# 4. 複製所有原始碼
COPY . .

# 5. 宣告 Vite 預設 Port
EXPOSE 5173

# 6. 啟動指令 (注意：必須加上 --host)
# 如果不加 --host，容器外的瀏覽器會連不進去
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]