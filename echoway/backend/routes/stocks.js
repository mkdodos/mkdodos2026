const express = require("express");
const router = express.Router();
const helper = require("../utils/db-helper");

const db = require("../db");

const TABLE_NAME = "stocks"; // 只要改這裡，就能套用到不同資料表

/**
 * @param {Array} inventory - 庫存: [{ id: 'S1', len: 500, od: 50 }, ...]
 * @param {Array} demands - 需求: [{ id: 'D1', len: 300, od: 50 }, ...]
 */
function solveCuttingPlan(inventory, demands) {
  // 1. 需求由大到小 (Desc)
  const sortedDemands = [...demands].sort((a, b) => b.len - a.len);

  // 2. 庫存由小到大 (Asc) - 淺拷貝避免改動原始資料
  let stockPool = [...inventory].sort((a, b) => a.len - b.len);

  const results = [];
  const failed = [];

  for (const demand of sortedDemands) {
    // 3. 尋找第一個放得下的庫存 (且外徑相同)
    const bestFitIndex = stockPool.findIndex(
      (s) => s.od === demand.od && s.len >= demand.len,
    );

    if (bestFitIndex !== -1) {
      const stock = stockPool[bestFitIndex];

      // 紀錄分配結果
      results.push({
        demandId: demand.id,
        stockId: stock.id,
        cutLength: demand.len,
        beforeLen: stock.len,
        afterLen: stock.len - demand.len,
      });

      // 4. 更新該庫存的剩餘長度 (關鍵：下次迴圈會用更新後的長度來判斷)
      stock.len -= demand.len;

      // 5. 重新排序庫存 (選用)
      // 為了保持 "Best Fit" (找最接近的短料)，更新後重新排一次
      stockPool.sort((a, b) => a.len - b.len);
    } else {
      failed.push(demand);
    }
  }

  return {
    success: results,
    unfulfilled: failed,
    finalStock: stockPool, // 剩餘的庫存狀況
  };
}

// POST /api/cutting-plan
router.post("/cutting-plan", async (req, res) => {
  // const { demands } = req.body; // 傳入需求清單

  // 1. 從 PostgreSQL 撈取可用庫存 (使用 Row Lock 確保安全)
  // const sql = await db.query(
  //   'SELECT * FROM workpiece_inventory WHERE status = "available" FOR UPDATE',
  // );

  const sql = `SELECT id,length as len, outer_diameter as od FROM workpiece_inventory WHERE status = 'available'
     FOR UPDATE`;

  const { rows } = await db.query(sql);
  // console.log(inventory.rows);
  const inventory = rows.map((item) => ({
    ...item,
    od: Number(item.od),
    len: Number(item.len),
  }));
  // return;
  // --- 測試 ---
  // const inventory = [
  //   { id: "短料A", len: 400, od: 50 },
  //   { id: "長料B", len: 2000, od: 50 },
  //   { id: "短料C", len: 600, od: 50 },
  // ];

  const demands = [
    { id: "訂單1", len: 350, od: 50 },
    { id: "訂單2", len: 500, od: 50 },
    { id: "訂單3", len: 200, od: 50 },
  ];

  // 2. 執行 BFD 演算法 (剛剛寫的那段 JS)
  const plan = solveCuttingPlan(inventory, demands);

  // 3. 回傳結果（先不寫入資料庫，等使用者確認）
  res.json(plan);
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

module.exports = router;
