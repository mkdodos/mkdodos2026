node adodb

```javascript
const express = require("express");
const router = express.Router();

const ADODB = require("node-adodb");

router.get("/", async (req, res) => {
  try {
    // 來源資料庫
    const sourceDB = "D:\\Dev\\echoway2026\\stocks.mdb";
    const access = ADODB.open(
      `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${sourceDB};`
    );
    // 讀取 Access 資料
    const accessSql = `SELECT * FROM Stocks`;
    const rows = await access.query(accessSql);
    res.json({ success: true, data: rows });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err });
  }
}); 

module.exports = router;

```

