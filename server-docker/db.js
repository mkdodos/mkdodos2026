const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: "db",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// 測試連線並印出資料庫身分
pool.query(
  "SELECT version(), current_database(), inet_server_addr()",
  (err, res) => {
    if (err) {
      console.error("❌ 連線失敗:", err.stack);
    } else {
      const version = res.rows[0].version;
      const isDocker = version.toLowerCase().includes("linux");

      console.log("--- 🛡️ 資料庫連線報告 ---");
      console.log(`📍 目標資料庫: ${res.rows[0].current_database}`);
      console.log(
        `🌐 伺服器位址: ${res.rows[0].inet_server_addr || "localhost"}`,
      );
      console.log(
        `🖥️ 執行環境: ${isDocker ? "🐳 Docker (Linux)" : "🪟 實體安裝 (Windows)"}`,
      );
      console.log(`📄 版本詳情: ${version}`);
      console.log("------------------------");
    }
  },
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
