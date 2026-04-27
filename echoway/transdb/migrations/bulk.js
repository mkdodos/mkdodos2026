const schemaMap = [
  {
    accessTable: "stocks",
    pgTable: "stocks",
    // 格式： { "PG 欄位名": "Access 欄位名" }
    columns: {
      circle1: "Circle",
      note_text: "NoteText"     
    }
  },
  {
    accessTable: "員工基本資料",
    pgTable: "employees",
    columns: {
      emp_id: "工作人員編號",
      emp_name: "姓名"      
    }
  }
];


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
  database: "echoway",
  password: "123",
  port: 5432,
});

async function migrateTable(config) {
  const { accessTable, pgTable, columns } = config;

  console.log(`--- 正在遷移: ${accessTable} -> ${pgTable} ---`);

  // 1. 讀取 Access 資料
  const rows = await access.query(`SELECT * FROM ${accessTable}`);
  
  // 2. 清空 PG 資料
  await pgPool.query(`TRUNCATE TABLE ${pgTable} RESTART IDENTITY CASCADE`);

  // 3. 準備 SQL 結構
  const pgCols = Object.keys(columns); // 例如: ["circle1", "note_text"]
  const accessCols = Object.values(columns); // 例如: ["Circle", "NoteText"]
  
  // 動態生成 INSERT INTO table (col1, col2) VALUES ($1, $2)
  const colNames = pgCols.join(", ");
  const placeholders = pgCols.map((_, i) => `$${i + 1}`).join(", ");
  const insertSql = `INSERT INTO ${pgTable} (${colNames}) VALUES (${placeholders})`;

  // 4. 執行寫入
  for (const row of rows) {
    // 根據對應關係抓取 row 的數值
    const values = accessCols.map(accessFieldName => row[accessFieldName]);
    await pgPool.query(insertSql, values);
  }

  console.log(`${pgTable} 遷移完成，共 ${rows.length} 筆資料。`);
}


async function main() {
  try {
    for (const tableConfig of schemaMap) {
      await migrateTable(tableConfig);
    }
    console.log("全部資料表處理完畢！");
  } catch (err) {
    console.error("遷移失敗：", err);
  } finally {
    await pgPool.end();
  }
}

main();