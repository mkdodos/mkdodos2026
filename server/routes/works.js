const express = require("express");
const router = express.Router();
const db = require("../dbAccess");

router.get("/", async (req, res) => {
  const sql = `
      SELECT Max(VAL(工作單號)) AS maxId
      FROM 進貨表;
    `;

  try {
    const data = await db.query(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  //   res.send("根");
});

router.post("/add", async (req, res) => {});

module.exports = router;
