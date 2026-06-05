const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組
const helper = require("../utils/db-helper");

const TABLE_NAME = "wp_demand"; // 只要改這裡，就能套用到不同資料表

// 確定切割
// 1.新增餘料至庫存
// 2.新增切割記錄

router.get("/stock-fit-cut", async (req, res) => {
  try {
    //     const sql = `INSERT INTO wp_cut_logs
    // (stock_id,demand_id,cut_len,remain_len)
    // VALUES
    // (374,16,1,2)`;

    await db.query("BEGIN");

    const { stock_id, demand_id, cut_len, remain_len, od } = req.query;
    // 查詢一
    const sql = `INSERT INTO wp_cut_logs (stock_id, demand_id, cut_len, remain_len)
             VALUES ($1, $2, $3, $4)`;

    const result = await db.query(sql, [
      stock_id,
      demand_id,
      cut_len,
      remain_len,
    ]);

    // 查詢二
    const sql2 = `INSERT INTO wp_stock (parent_id,sn,od ,len)
             VALUES ($1, $2,$3, $4)`;

    await db.query(sql2, [stock_id, "1139", 1140, remain_len]);

    await db.query("COMMIT");

    res.json({
      success: true,
      data: req.query,
    });
  } catch (err) {
    await db.query("ROLLBACK"); // 任一失敗，全部取消
    res.status(500).json({ success: false, error: err.message });
    // console.error(err);
    // res.status(500).send("資料庫連線出錯");
  }

  // console.log(req.demain_id);
  // res.send(req.query.stock_id);
  // res.send(req.query.demand_id);
});

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
