const express = require("express");
const router = express.Router();
const db = require("../db");
const helper = require("../utils/db-helper");

const TABLE_NAME = "wp_stock";

// 家族樹狀查詢
router.get("/:id/family-tree", async (req, res) => {
  try {
    const sql = `
     WITH RECURSIVE family_tree AS (
        SELECT id, sn, od, len, parent_id, 1 AS level
        FROM wp_stock
        WHERE id = ${req.params.id}

        UNION ALL

        SELECT t.id, t.sn, t.od, t.len, t.parent_id, ft.level + 1
        FROM family_tree ft
        JOIN wp_stock t ON t.parent_id = ft.id
      )
      SELECT 
        id, 
        sn AS tree_structure, 
        len, 
        level
      FROM family_tree;
    `;
    const result = await db.query(sql);
    res.json({
      success: true,
      data: result.rows,
      sql: sql,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

// 取得全部
router.get("/", async (req, res) => {
  try {
    const data = await helper.getAll(TABLE_NAME);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "讀取失敗" });
  }
});

// 新增
router.post("/", async (req, res) => {
  try {
    const newItem = await helper.create(TABLE_NAME, req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    console.error("新增失敗:", err); // 後端 terminal 看詳細錯誤
    res.status(500).json({
      success: false,
      msg: "新增失敗",
      error: err.message, // 回傳錯誤訊息給前端
    });
    // res.status(500).json({ success: false, msg: "新增失敗" });
  }
});

// 更新
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await helper.update(TABLE_NAME, id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ success: false, msg: "找不到資料" });
    }
    res.json({ success: true, data: updatedItem });
  } catch (err) {
    console.error("更新失敗:", err); // 後端 terminal 看詳細錯誤
    res.status(500).json({ success: false, msg: "更新失敗" });
  }
});

// 刪除
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await helper.delete(TABLE_NAME, id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, msg: "找不到資料" });
    }
    res.json({ success: true, data: deletedItem });
  } catch (err) {
    console.error("刪除失敗:", err); // 後端 terminal 看詳細錯誤
    res.status(500).json({ success: false, msg: "刪除失敗" });
  }
});

module.exports = router;
