const express = require("express");
const router = express.Router(); //  建立路由器實例

router.get("/", async (req, res) => {
  // res.send("stocks");
  // res.json({ message: "stocks" });

  try {
    const result = await db.query(`  SELECT  *  FROM stocks`);

    // const result = await db.query("SELECT now()");

    // const result = await db.query("SHOW timezone; SELECT now();");
    // console.log("資料庫目前時區:", res[0].rows[0].timezone);
    // console.log("資料庫現在時間:", res[1].rows[0].now);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

const db = require("../db"); // 引入連線模組
// 取得資料庫
router.get("/db-test", async (req, res) => {
  try {
    const result = await db.query(
      `    SELECT 
      *, 
      to_char(created_at AT TIME ZONE 'Asia/Taipei', 'YYYY-MM-DD HH24:MI:SS') as formatted_date
    FROM stocks`,
    );

    // const result = await db.query("SELECT now()");

    // const result = await db.query("SHOW timezone; SELECT now();");
    // console.log("資料庫目前時區:", res[0].rows[0].timezone);
    // console.log("資料庫現在時間:", res[1].rows[0].now);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("資料庫連線出錯");
  }
});

module.exports = router; //  匯出路由器
