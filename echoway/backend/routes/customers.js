const express = require("express");
const router = express.Router();
const helper = require("../utils/db-helper");

const TABLE_NAME = "customers"; // 只要改這裡，就能套用到不同資料表

// 取得資料
router.get("/", async (req, res) => {
  try {
    const data = await helper.getAll(TABLE_NAME);
    res.json({ success: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, msg: err });
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
