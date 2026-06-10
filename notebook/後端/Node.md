`node --watch index.js`

執行 index.js , 加上 --watch , index.js 有變動時會自動重啟

node -v 查看版本
大於 v18.11.0 才可使用 --watch

舊版 node 沒 --watch 需安裝 nodemon

```bash
npm install -g nodemon
# 使用方式
nodemon index.js
```
