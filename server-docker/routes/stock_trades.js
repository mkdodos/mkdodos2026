const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組

// 【GET】取得所有資料
router.get("/", async (req, res) => {
  //   console.log("api/stock-trades");
  const result = await db.query("SELECT * from stock_trades ORDER BY id");
  res.json({ success: true, data: result.rows });
});

router.post("/", async (req, res) => {
  const {
    trade_date,
    stock_code,
    trade_type,
    quantity,
    unit_price,
    total_amount,
  } = req.body;

  try {
    const query = `
      INSERT INTO stock_trades (trade_date, stock_code, trade_type, quantity, unit_price, total_amount)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [
      trade_date,
      stock_code,
      trade_type,
      quantity,
      unit_price,
      total_amount,
    ];

    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
