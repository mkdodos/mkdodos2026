// routes/students.js
const express = require("express");
const router = express.Router(); // 1. 建立路由器實例
const db = require("../db"); // 2. 引入你寫好的資料庫連線

// 取得所有學生列表 (假設路徑是 /list)
router.get("/list", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tb保險");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫錯誤");
  }
});

// 取得單一學生資料 (假設路徑是 /:id)
// router.get("/:id", (req, res) => {
//   res.send(`正在讀取學號為 ${req.params.id} 的資料`);
// });

// 取得單一學生： GET http://localhost:3001/api/students/1
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM "PlusFee" WHERE "ID" = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "找不到該學生" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("伺服器錯誤");
    // 💡 關鍵：把錯誤印出來，才知道具體原因
    console.error("資料庫查詢出錯：", err.stack);
  }
});

// ... 前面已有的 GET 路由

// 新增一筆資料：POST http://localhost:3001/api/plusfee
router.post("/", async (req, res) => {
  // 從請求主體 (req.body) 取得前端傳來的資料
  const { price } = req.body;

  try {
    const sql = `
      INSERT INTO PlusFee (price) 
      VALUES ($1) 
      RETURNING *;
    `;
    const values = [price];

    const result = await db.query(sql, values);

    res.status(201).json({
      success: true,
      message: "資料新增成功",
      data: result.rows[0], // 回傳剛新增的那一筆，包含資料庫產生的 ID
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "新增失敗" });
  }
});

module.exports = router; // 3. 匯出路由器
