const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入剛才寫的連線模組

// 取得資料
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM boxes ORDER BY id DESC");
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

// 新增資料
router.post("/", async (req, res) => {
  const { name, location } = req.body;
  // 沒有值時給 null
  const dest = location === undefined || location === "" ? null : location;
  try {
    // 2. 使用 $1, $2, $3 佔位符（防攻擊、自動處理 null）
    const sql = `
    INSERT INTO boxes (name, location) 
    VALUES ($1, $2)
    RETURNING id
  `;
    const values = [name, dest];
    const result = await db.query(sql, values);
    res.status(201).json({
      success: true,
      data: { sql },
      id: result.rows[0].id,
    });

    console.log("SQL 語句:", sql);
  } catch (err) {
    console.error(err);
    // res.status(500).send("資料庫連線出錯");
    res.status(500).send(err.sql);
    console.log("SQL 語句:", err.sql);
  }
});

// 更新資料
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  try {
    const sql = `
      UPDATE boxes 
      SET 
        name = '${name}',
        location = '${location}'        
      WHERE id = ${id};
    `;
    const result = await db.query(sql);
    res.status(200).json({
      success: true,
      data: { sql },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

// 刪除資料
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `DELETE FROM boxes WHERE id=${id}; `;
    const result = await db.query(sql);
    res.status(204).json({
      success: true,
      data: { sql },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

module.exports = router;
