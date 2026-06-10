const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入連線模組
const puppeteer = require("puppeteer");
const path = require("path");

router.get("/screenshot", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "hn.pdf");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com", {
      waitUntil: "networkidle2",
    });
    await page.pdf({ path: filePath, format: "A4", printBackground: true });
    await browser.close();

    res.sendFile(filePath); // 直接在瀏覽器開啟
  } catch (err) {
    res.status(500).send("失敗：" + err.message);
  }
});

router.get("/screenshot123", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://192.168.0.10:5173/cates", {
      waitUntil: "networkidle2",
    });
    await page.pdf({ path: "hn.pdf", format: "letter", printBackground: true });
    await browser.close();
    res.download("hn.pdf");
    // res.sendFile(path.resolve("hn.pdf"));
  } catch (err) {
    res.status(500).send("產生 PDF 失敗：" + err.message);
  }
});

// 取得資料
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM cates ORDER BY id DESC");
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

// 新增資料
router.post("/", async (req, res) => {
  const { cate_name } = req.body;

  try {
    const sql = `INSERT INTO cates (cate_name) 
    VALUES ('${cate_name}')
    RETURNING id
    `;
    const result = await db.query(sql);
    res.status(201).json({
      success: true,
      data: { sql },
      id: result.rows[0].id,
    });
    console.log("SQL 語句:", sql);
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
    console.log("SQL 語句:", err.sql);
  }
});

// 更新資料
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cate_name } = req.body;
  try {
    const sql = `
      UPDATE cates 
      SET 
        cate_name = '${cate_name}'       
      WHERE id = ${id};
    `;
    const result = await db.query(sql);
    res.status(200).json({
      success: true,
      data: { sql },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

// 刪除資料
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `DELETE FROM cates WHERE id=${id}; `;
    const result = await db.query(sql);
    res.status(204).json({
      success: true,
      data: { sql },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

module.exports = router;
