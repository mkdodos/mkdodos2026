const ADODB = require("node-adodb");
const { Pool } = require("pg");
require("dotenv").config();

const accessPath = "C:\\database\\後端server2000.mdb";

// 1. 設定 Access 連線 (僅限 Windows)
const connectionString = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${accessPath};`;
const adodb = ADODB.open(connectionString);

// 2. 設定 PostgreSQL 連線
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // 範例：postgres://user:pass@localhost:5432/mydb
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function migrate() {
  try {
    console.log("--- 開始讀取 Access 資料 ---");
    // 假設你要遷移一個叫 'Users' 的資料表
    const users = await adodb.query("SELECT * FROM PlusFee");
    console.log(`讀取到 ${users.length} 筆資料`);

    console.log("--- 開始寫入 PostgreSQL ---");
    // 假設從 Access 讀出來的物件欄位名稱跟截圖一致
    for (const row of users) {
      await pool.query(
        "INSERT INTO customers_data (customer_id, length, price) VALUES ($1, $2, $3)",
        [row.CustomerID, row.Length, row.Price],
      );
    }

    console.log("✅ 遷移完成！");
  } catch (error) {
    console.error("❌ 遷移失敗:", error);
  } finally {
    await pool.end();
  }
}

migrate();
