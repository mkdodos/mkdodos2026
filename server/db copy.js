// db.js
require('dotenv').config(); // 關鍵！這行會載入 .env 的內容到 process.env
const { Pool } = require('pg');

// 設定連線資訊
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'db0224',
//   password: '123',
//   port: 5432,
// });

// process  node 提供的全域物件
// process.env 讀取環境變數(正式環境)
// dotenv 套件： 讀取 .env 檔案裡的文字，然後把這些內容塞進 process.env 這個全域物件裡。(開發環境)
//


// 💡 建立一個判斷邏輯：如果是正式環境，強制使用特定 IP；否則讀取 .env 或預設 localhost

// $env:NODE_ENV = "production"

const dbHost = process.env.NODE_ENV === 'production' 
// 正式主機的資料庫實體 IP
  ? (process.env.DB_HOST_PROD || '192.168.1.6')              
  // 開發環境先讀 .env，沒有就用 localhost
  : (process.env.DB_HOST || 'localhost'); 


const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  // host: process.env.DB_HOST,
  // host: dbHost,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ 資料庫連線失敗！', err.stack);
  } else {
    console.log('✅ 資料庫連線成功，伺服器時間：', res.rows[0].now);
  }
});