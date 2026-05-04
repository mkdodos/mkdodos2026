const ADODB = require("node-adodb");
const { Pool } = require("pg");
const schemaMap = require("../tablesConfig");

// --- 1. 連線設定 ---
const accessDbPath = "C:\\database\\後端server2000.mdb";
const access = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${accessDbPath};`,
);

const pgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "echoway",
  password: "123",
  port: 5432,
});

// --- 2. 核心遷移工具函式 ---
async function migrateTable(config) {
  const { accessTable, pgTable, columns, dateFields = [] } = config;

  console.log(`\n--------------------------------------------`);
  console.log(`[開始遷移] Access: ${accessTable} => PG: ${pgTable}`);

  try {
    // A. 讀取 Access 資料
    const rows = await access.query(`SELECT * FROM [${accessTable}]`);
    console.log(`   讀取成功: 共 ${rows.length} 筆`);

    if (rows.length === 0) {
      console.log(`   此表無資料，跳過。`);
      return;
    }

    // B. 清空 PostgreSQL 目的地表
    console.log(`   正在清空 PG 資料表...`);
    await pgPool.query(`TRUNCATE TABLE ${pgTable} RESTART IDENTITY CASCADE`);

    // C. 準備 SQL 語句
    const pgCols = Object.keys(columns);
    const colNames = pgCols.join(", ");
    const placeholders = pgCols.map((_, i) => `$${i + 1}`).join(", ");
    const insertSql = `INSERT INTO ${pgTable} (${colNames}) VALUES (${placeholders})`;

    // D. 執行寫入
    console.log(`   開始寫入資料...`);
    for (const row of rows) {
      const values = pgCols.map((col) => {
        const accessKey = columns[col];
        let val = row[accessKey];

        // --- 關鍵：處理日期差一天的問題 ---
        if (dateFields.includes(col) && val) {
          // 使用 sv-SE 格式 (YYYY-MM-DD) 強制轉為字串，避免 JS 時區偏移
          return new Date(val).toLocaleDateString("sv-SE");
        }

        // 處理 null 或 undefined
        return val === undefined ? null : val;
      });

      await pgPool.query(insertSql, values);
    }
    console.log(`   ✅ ${pgTable} 遷移完成！`);
  } catch (err) {
    console.error(`   ❌ ${accessTable} 遷移失敗:`, err.message);
    throw err; // 丟出錯誤讓主程序知道
  }
}

// --- 3. 啟動主程序 ---
async function main() {
  const startTime = Date.now();
  try {
    for (const tableConfig of schemaMap) {
      await migrateTable(tableConfig);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n============================================`);
    console.log(`✨ 全部遷移任務成功！總耗時: ${duration} 秒`);
    console.log(`============================================`);
  } catch (error) {
    console.error("\n💥 遷移過程中斷：", error);
  } finally {
    await pgPool.end();
    console.log("PG 連線已關閉。");
  }
}

main();
