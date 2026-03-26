const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組

// import { Request, Response } from "express";

// 模擬資料庫
let stocks = [
  {
    id: "1",
    stock_symbol: "2330",
    stock_name: "台積電",
    current_price: "600",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    stock_symbol: "0050",
    stock_name: "元大台灣50",
    current_price: "150",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// 【GET】取得所有股票
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * from stocks ORDER BY id");
  res.json({ success: true, data: result.rows });
});

// 【POST】新增股票

// 【POST】新增資料到 PostgreSQL
router.post("/", async (req, res) => {
  const { stock_symbol, stock_name, current_price } = req.body;

  try {
    const query = `
      INSERT INTO stocks (stock_symbol, stock_name, current_price) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [stock_symbol, stock_name, current_price];

    const result = await db.query(query, values);

    // 回傳成功與資料
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "資料庫寫入出錯" });
  }
});
// router.post("/", (req, res) => {
//   const { stock_symbol, stock_name, current_price } = req.body;

//   const newStock = {
//     id: Date.now().toString(), // 產生簡易唯一 ID
//     stock_symbol,
//     stock_name,
//     current_price: current_price.toString(),
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   };

//   stocks.push(newStock);
//   res.status(201).json({ success: true, data: newStock });
// });

// 【PUT】更新股票資訊 (例如價格)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "UPDATE stocks SET stock_name = '馬克1' WHERE id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "找不到該股票" });
    }
    res.json({ success: true, message: "更新成功" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

  // const { id } = req.params;
  // const index = stocks.findIndex((s) => s.id === id);

  // if (index === -1) {
  //   return res.status(404).json({ success: false, message: "找不到該股票" });
  // }

  // // 更新內容並同步更新時間
  // stocks[index] = {
  //   ...stocks[index],
  //   ...req.body,
  //   updated_at: new Date().toISOString(),
  // };

  // res.json({ success: true, data: stocks[index] });
});

// 【DELETE】刪除股票
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM stocks WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "找不到該股票" });
    }
    res.json({ success: true, message: "刪除成功" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

  // const { id } = req.params;
  // const initialLength = stocks.length;
  // stocks = stocks.filter((s) => s.id !== id);

  // if (stocks.length === initialLength) {
  //   return res.status(404).json({ success: false, message: "找不到該股票" });
  // }

  // res.json({ success: true, message: "刪除成功" });
});

module.exports = router;
