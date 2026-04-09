const express = require("express");
const db = require("./db"); // 引入剛才寫的連線模組
const app = express();

const port = 3000;
// const host = "localhost";
const host = "0.0.0.0";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("首頁123456");
});

// 取得資料
app.get("/api/items", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id DESC");
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

app.post("/api/items", async (req, res) => {
  const { box_id, item_name, category } = req.body;
  try {
    const sql = `INSERT INTO items (box_id,item_name,category) VALUES (${box_id},'${item_name}','${category}')`;
    const result = await db.query(sql);
    res.status(201).json({
      success: true,
      data: { sql },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

app.put("/api/items", async (req, res) => {
  const { id, box_id, item_name, category } = req.body;
  try {
    const sql = `UPDATE items SET item_name = '${item_name}',category='${category}' WHERE id=${id}; `;
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

app.delete("/api/items", async (req, res) => {
  const { id } = req.body;
  try {
    const sql = `DELETE FROM items WHERE id=${id}; `;
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

app.listen(port, host, () => {
  console.log("server 啟動!");
});
