const express = require("express");
const router = express.Router();
const ADODB = require("node-adodb");

// 取得資料
router.get("/", async (req, res) => {
  try {
    // 來源資料庫
    const sourceDB = "C:\\database\\後端server2000.mdb";
    const access = ADODB.open(
      `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${sourceDB};`,
    );
    // 讀取 Access 資料
    const accessSql = `
    SELECT   
      客戶編號 as id,
      客戶名稱 as cust_name,
      電話 as tel,
      住址 as addr
      FROM [客戶資料]   
  `;
    const rows = await access.query(accessSql);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err });
  }
});

module.exports = router;
