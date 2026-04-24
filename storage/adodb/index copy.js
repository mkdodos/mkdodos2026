const ADODB = require("node-adodb");

// 設定資料庫路徑與連線字串
// Provider 為 Microsoft.ACE.OLEDB.12.0 (適用於 .accdb)
// 或 Microsoft.Jet.OLEDB.4.0 (適用於舊版 .mdb)
const connection = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\database\\後端server2000.mdb;Persist Security Info=False;",
);

async function query() {
  try {
    // 查詢資料
    const users = await connection.query("SELECT * FROM 客戶資料");
    console.log(JSON.stringify(users, null, 2));

    // 新增/更新資料使用 .execute()
    await connection.execute(
      "INSERT INTO 客戶資料 (客戶編號,客戶名稱) VALUES ('Gemini','馬克')",
    );
  } catch (error) {
    console.error("連線失敗：", error);
  }
}

query();
