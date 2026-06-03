const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組
const helper = require("../utils/db-helper");

const TABLE_NAME = "wp_demand"; // 只要改這裡，就能套用到不同資料表

// 尋找合適的庫存
// 外徑相同,長度大於等於,依長度由小到大排序
router.get("/stock-fit", async (req, res) => {
  // 配合網址 /stock-fit?len=1200&od=50
  try {
    // 1. 從 req.query 取值，並轉為數字
    const reqLen = Number(req.query.len);
    const reqOd = Number(req.query.od);
    // 簡單的驗證：確保參數存在且為有效數字
    if (isNaN(reqLen) || isNaN(reqOd)) {
      return res
        .status(400)
        .json({ success: false, msg: "請提供正確的 len 與 od 參數" });
    }
    const sql = `    
      SELECT 
          id, 
          sn,
          od, 
          len, 
          (len - $1) AS remain_len
      FROM wp_stock 
      WHERE od = $2 
        AND len >= $1
      ORDER BY len ASC
      LIMIT 1;
          `;
    // 2. 將取出的變數放入 values 陣列，順序必須與 SQL 中的 $1, $2 對應
    const values = [reqLen, reqOd];
    // const values = [1200, 50];
    const result = await db.query(sql, values);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "讀取失敗" });
  }
});

// 取得資料
router.get("/", async (req, res) => {
  try {
    const data = await helper.getAll(TABLE_NAME);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "讀取失敗" });
  }
});

// 新增資料
router.post("/", async (req, res) => {
  try {
    // 直接把 req.body 丟進去，它會自動抓欄位名稱
    const newItem = await helper.create(TABLE_NAME, req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, msg: "新增失敗" });
  }
});

// 更新與刪除以此類推...

// 更新資料
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newItem = await helper.update(TABLE_NAME, id, req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, msg: "更新失敗" });
    console.log(err);
  }
});

// 刪除資料
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newItem = await helper.delete(TABLE_NAME, id);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, msg: "更新失敗" });
    console.log(err);
  }
});

module.exports = router;
