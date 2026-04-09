FROM node:20-alpine
WORKDIR /usr/src/app

# 先複製 package.json 安裝套件
COPY package*.json ./
RUN npm install
# 💡 關鍵：全域安裝 nodemon
RUN npm install -g nodemon 

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]