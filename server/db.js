const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// 連線後立即設定 session 時區
// pool.on("connect", (client) => {
//   client.query("SET timezone = 'Asia/Taipei'");
// });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
