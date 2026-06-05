

```javascript
// db.js
const { Pool } = require("pg");

// 設定連線資訊
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mkdodos",
  password: "123",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```


```javascript
// routes/boxes.js
const db = require("../db"); // 引入連線模組
const express = require("express");
const router = express.Router();
// 取得資料
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT ...`;
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
```

```javascript
// 參數化查詢
const { stock_id, demand_id, len } = req.query;
const sql = `INSERT INTO cut_logs (stock_id, demand_id, len)
			 VALUES ($1, $2, $3)`;  
await pool.query(sql, [stock_id, demand_id, len]);    
```


```javascript
const express = require("express");
const boxRouter = require("./routes/boxes"); // 引入路由檔案
const app = express();

const port = 3000;
const host = "0.0.0.0";

// 允許前端連線
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/boxes", boxRouter);

app.get("/", (req, res) => {
  res.send("首頁");
});

app.listen(port, host, () => {
  console.log("server 啟動!");
});
```