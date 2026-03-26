const express = require("express");
const app = express();
const router = express.Router(); //  建立路由器實例
const db = require("../dbAccess"); // 2. 引入你寫好的資料庫連線

router.get("/next-id", async (req, res) => {
  const sql = `
    SELECT Max(VAL(客戶編號)) AS maxId
    FROM 客戶資料;

  `;

  try {
    const data = await db.query(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  // const { id, name } = req.body;

  const { name } = req.body; // 只需要傳入名稱，編號由系統產生

  // 步驟 1：查詢目前最大的編號，並轉成數字處理
  // 使用 Val() 確保字串型態的編號也能正確比較大小 (例如 "10" > "9")
  const findMaxSql = `
      SELECT MAX(Val([客戶編號])) AS maxId 
      FROM [客戶資料] 
      
    `;

  try {
    const result = await db.query(findMaxSql);

    // 如果資料庫是空的，預設從 1 開始；否則取最大值 + 1
    const currentMax = result[0].maxId || 0;
    const nextId = (parseInt(currentMax) + 1).toString();

    const sql = `INSERT INTO [客戶資料] ([客戶編號], [客戶名稱]) VALUES ('${nextId}', '${name}')`;

    await db.execute(sql);
    res.json({ success: true, name, sql });
  } catch (err) {
    console.error("完整的錯誤物件:", err); // 在終端機查看
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
