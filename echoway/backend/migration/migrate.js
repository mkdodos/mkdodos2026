const ADODB = require("node-adodb");
const pgp = require("pg-promise")({
  capSQL: true, // 在產生 SQL 時會自動處理大寫欄位引號等問題
});
const schemaMap = require("./tablesConfig");

// 來源資料庫
const sourceDB = "D:\\Dev\\echoway2026\\stocks.mdb";
// const sourceDB = "C:\\database\\後端server2000.mdb";

// --- 1. 連線設定 ---
// const access = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\database\\後端server2000.mdb;`);

const access = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${sourceDB};`,
);

const db = pgp({
  user: "postgres",
  host: "localhost",
  database: "echoway",
  password: "123",
  port: 5432,
});

async function migrateTable(config) {
  const { accessTable, pgTable, columns, dateFields = [] } = config;

  console.log(`\n>>> 正在處理: ${accessTable} -> ${pgTable}`);

  // --- A. 動態生成 Access SQL (格式化日期解決差一天問題) ---
  const selectFields = Object.keys(columns)
    .map((pgCol) => {
      const accessCol = columns[pgCol];
      if (dateFields.includes(pgCol)) {
        // 在 Access 端直接轉字串
        return `Format([${accessCol}], 'yyyy-mm-dd') AS [${accessCol}]`;
      }
      return `[${accessCol}] AS [${accessCol}]`;
    })
    .join(", ");

  const accessSql = `SELECT ${selectFields} FROM [${accessTable}]`;

  try {
    // B. 讀取 Access 資料
    const rows = await access.query(accessSql);
    if (rows.length === 0) return console.log("   無資料，跳過。");
    console.log(`   讀取成功: ${rows.length} 筆`);

    // C. 清空 PG 資料
    await db.none(`TRUNCATE TABLE ${pgTable} RESTART IDENTITY CASCADE`);

    // D. 資料格式轉換 (將 Access 的 Key 轉成 PG 的 Key)
    const dataToInsert = rows.map((row) => {
      let transformed = {};
      for (const [pgCol, accessCol] of Object.entries(columns)) {
        transformed[pgCol] = row[accessCol] === "" ? null : row[accessCol];
      }
      return transformed;
    });

    // E. 使用 pg-promise Helpers 進行批量寫入
    // ColumnSet 會定義哪些欄位要進入 INSERT 指令
    const cs = new pgp.helpers.ColumnSet(Object.keys(columns), {
      table: pgTable,
    });

    // 產生一個超大的 INSERT INTO ... VALUES (...), (...), ...
    const query = pgp.helpers.insert(dataToInsert, cs);

    await db.none(query);
    console.log(`   ✅ 批量寫入完成！`);
  } catch (err) {
    console.error(`   ❌ 遷移出錯:`, err.message);
  }
}

async function run() {
  const start = Date.now();
  try {
    for (const config of schemaMap) {
      await migrateTable(config);
    }
    console.log(`\n✨ 全部完成！總耗時: ${(Date.now() - start) / 1000} 秒`);
  } finally {
    pgp.end(); // 關閉連線池
  }
}

run();
