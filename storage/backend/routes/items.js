const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入剛才寫的連線模組

// 取得資料
router.get("/", async (req, res) => {
  try {
    const sql = ` SELECT           
          items.id ,
          items.item_name,
          boxes.name as box_name,
          box_id
      FROM items
      INNER JOIN boxes ON items.box_id = boxes.id
      ORDER BY id DESC
    `;
    // const result = await db.query("SELECT * FROM items ORDER BY id DESC");
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
