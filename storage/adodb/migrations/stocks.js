const ADODB = require("node-adodb");
const { Pool } = require("pg");

// --- 1. 設定 Access 連線 (來源) ---
const accessDbPath = "C:\\database\\後端server2000.mdb";
const access = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${accessDbPath};`,
);

// --- 2. 設定 PostgreSQL 連線 (目的地) ---
const pgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mkdodos",
  password: "123",
  port: 5432,
});

async function migrateData() {
  try {
    console.log("正在從 Access 讀取資料...");

    // 從 Access 讀取所有客戶資料
    const customers = await access.query("SELECT * FROM stocks");
    console.log(`讀取成功，共 ${customers.length} 筆資料。`);

    // --- 關鍵新增：先刪除 PG 中的所有記錄 ---
    console.log("正在清空 PostgreSQL 中的舊資料...");
    // RESTART IDENTITY 會讓 ID 從 1 開始重新計算
    await pgPool.query("TRUNCATE TABLE stocks_abc RESTART IDENTITY CASCADE");

    console.log("開始寫入 PostgreSQL...");

    // 使用迴圈逐筆新增至 PostgreSQL
    for (const row of customers) {
      const insertSql = `
        INSERT INTO stocks_abc (circle1, note_text) 
        VALUES ($1, $2)
        ; 
      `;
      // 對應 Access 中的欄位名稱
      const values = [row.Circle, row.NoteText];

      await pgPool.query(insertSql, values);
    }

    console.log("資料遷移完成！");
  } catch (error) {
    console.error("遷移過程中發生錯誤：", error);
  } finally {
    // 關閉 PG 連線池
    await pgPool.end();
  }
}

migrateData();
