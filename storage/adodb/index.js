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
    const customers = await access.query("SELECT * FROM 客戶資料");
    console.log(`讀取成功，共 ${customers.length} 筆資料。`);

    console.log("開始寫入 PostgreSQL...");

    // 使用迴圈逐筆新增至 PostgreSQL
    for (const row of customers) {
      const insertSql = `
        INSERT INTO customers (cust_id, cust_name) 
        VALUES ($1, $2)
        ; 
      `;
      // row.客戶編號 與 row.客戶名稱 需對應 Access 中的欄位名稱
      const values = [row.客戶編號, row.客戶名稱];

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
