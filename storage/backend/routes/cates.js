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

module.exports = router;
