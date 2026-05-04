const express = require("express");
const router = express.Router();
const helper = require("../utils/db-helper");

const TABLE_NAME = "funds"; // 只要改這裡，就能套用到不同資料表

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
