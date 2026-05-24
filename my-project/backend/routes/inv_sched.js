const db = require("../db"); // 引入連線模組
const express = require("express");
const router = express.Router();
const helper = require("../utils/db-helper");

const TABLE_NAME = "inv_scheds"; // 只要改這裡，就能套用到不同資料表

// 取得資料

router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT 
        s.stock_name,
        sc.id,
        sc.task_id,
        sc.buy_day,
        sc.amt
      FROM inv_stocks s
      INNER JOIN inv_tasks t ON s.stock_no = t.stock_no
      INNER JOIN inv_scheds sc ON t.id = sc.task_id
    `;

    const result = await db.query(sql);

    // 注意：這裡假設你用的是 pg 模組，所以用 result.rows
    res.json({
      success: true,
      data: result.rows || result,
    });
  } catch (err) {
    console.error("Database Error:", err); // 使用 console.error 較符合慣例
    res.status(500).json({ success: false, msg: "讀取失敗" });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     // const data = await helper.getAll(TABLE_NAME);
//     const { data } = await db.query(
//       `SELECT
//     inv_stocks.stock_name,inv_scheds.buy_day,
//     inv_scheds.amt
// FROM inv_stocks
// INNER JOIN inv_tasks ON inv_stocks.stock_no = inv_tasks.stock_no
// INNER JOIN inv_scheds ON inv_tasks.id = inv_scheds.task_id;`,
//     );

//     res.json({ success: true, data: data });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, msg: "讀取失敗" });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const data = await helper.getAll(TABLE_NAME);
//     res.json({ success: true, data });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, msg: "讀取失敗" });
//   }
// });

// 取得某 task id 資料
router.get("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const { rows } = await db.query(
      `SELECT * FROM ${TABLE_NAME} WHERE task_id = $1`,
      [taskId],
    );
    // 處理找不到數據的情況
    if (rows.length === 0) {
      return res.status(404).json({ success: false, msg: "找不到該任務" });
    }

    // const data = await helper.getAll(TABLE_NAME);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "讀取失敗" });
  }
});

// 新增資料
router.post("/", async (req, res) => {
  try {
    // 直接把 req.body 丟進去，它會自動抓欄位名稱
    const newItem = await helper.create(TABLE_NAME, req.body);
    res.status(201).json({ success: true, data: newItem, id: newItem.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "新增失敗" });
  }
});

// 更新與刪除以此類推...

// 更新資料 (通常需要 ID)
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 假設 helper.update 接收 (資料表名, ID, 更新內容)
    const updatedItem = await helper.update(TABLE_NAME, id, req.body);

    if (!updatedItem) {
      return res.status(404).json({ success: false, msg: "找不到該筆資料" });
    }

    res.json({ success: true, data: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "更新失敗" });
  }
});

// 刪除資料
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // 假設 helper.delete 接收 (資料表名, ID)
    const result = await helper.delete(TABLE_NAME, id);

    if (!result) {
      return res.status(404).json({ success: false, msg: "找不到該筆資料" });
    }

    res.json({ success: true, msg: "刪除成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "刪除失敗" });
  }
});

module.exports = router;
