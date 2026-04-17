const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入剛才寫的連線模組

// 取得資料
router.get("/", async (req, res) => {
  let sql = ` SELECT           
          items.id ,
          items.item_name,
          boxes.name as box_name,
          box_id
      FROM items
      LEFT JOIN boxes ON items.box_id = boxes.id      
    `;
  try {
    const { q } = req.query; // 取得 ?q= 內容

    // const result = await db.query("SELECT * FROM items ORDER BY id DESC");
    let params = [];

    // 如果有搜尋關鍵字，加上 WHERE 子句
    // 關鍵字搜尋多個欄位
    if (q) {
      // 使用 %${q}% 進行包含搜尋
      sql += ` WHERE items.item_name ILIKE $1 
               OR items.category ILIKE $2 
               OR boxes.name ILIKE $3 `;
      const searchTerm = `%${q}%`;
      params = [searchTerm, searchTerm, searchTerm];
    }

    // 加上排序，讓最新的資料排在前面
    sql += " ORDER BY items.id DESC";

    const result = await db.query(sql, params);
    res.json({
      success: true,
      // sql,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    console.error(sql);
    res.status(500).send("資料庫連線出錯");
  }
});

// 新增資料
router.post("/", async (req, res) => {
  const { box_id, item_name, category } = req.body;
  const finalBoxId = box_id === undefined || box_id === "" ? null : box_id;
  // box_id !== undefined ? box_id : null;
  try {
    const sql = `INSERT INTO items (box_id,item_name,category) VALUES (${finalBoxId},'${item_name}','${category}')
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
  const { box_id, item_name, category } = req.body;
  try {
    // const sql = `UPDATE items SET item_name = '${item_name}',category='${category}' WHERE id=${id}; `;
    const sql = `
      UPDATE items 
      SET 
        item_name = '${item_name}',
        category = '${category}',
        box_id= ${box_id} 
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

module.exports = router;
