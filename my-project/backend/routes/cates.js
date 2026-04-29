const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組

// 取得資料
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM cates ORDER BY id DESC");
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
  const { cate_name } = req.body;

  try {
    const sql = `INSERT INTO cates (cate_name) 
    VALUES ('${cate_name}')
    RETURNING id
    `;
    const result = await db.query(sql);
    res.status(201).json({
      success: true,
      data: { sql },
      id: result.rows[0].id,
    });
    console.log("SQL 語句:", sql);
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
    console.log("SQL 語句:", err.sql);
  }
});

// 更新資料
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cate_name } = req.body;
  try {
    const sql = `
      UPDATE cates 
      SET 
        cate_name = '${cate_name}'       
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
    const sql = `DELETE FROM cates WHERE id=${id}; `;
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
