// db.js
const { Pool } = require("pg");

// 設定連線資訊
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "echoway",
  password: "123",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
