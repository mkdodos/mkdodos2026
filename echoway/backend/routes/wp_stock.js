const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組
const helper = require("../utils/db-helper");

const TABLE_NAME = "wp_stock"; // 只要改這裡，就能套用到不同資料表

// 取得資料
router.get("/family-tree", async (req, res) => {
  try {
    const sql = `
    
    
    WITH RECURSIVE family_tree AS (
    -- 1. 起點：選定原始母材
    SELECT id, sn, od, len, parent_id, 1 AS level
    FROM wp_stock
    WHERE parent_id IS NULL AND id = 1

    UNION ALL

    -- 2. 遞迴：找所有子層（誰的 parent_id 是我）
    SELECT t.id, t.sn, t.od, t.len, t.parent_id, ft.level + 1
    FROM family_tree ft
    JOIN wp_stock t ON t.parent_id = ft.id
)
-- 3. 輸出結果，利用 level 做縮排視覺化
SELECT 
    id, 
    repeat(' | ', level - 1) || sn AS tree_structure, 
    len, 
    level
FROM family_tree;
    
    `;
    const result = await db.query(sql);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
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

module.exports = router;
