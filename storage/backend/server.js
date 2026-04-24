const express = require("express");
const boxRouter = require("./routes/boxes"); // 引入檔案
const itemRouter = require("./routes/items"); // 引入檔案
const cateRouter = require("./routes/cates"); // 引入檔案
const customerRouter = require("./routes/customers"); // 引入檔案
const stockRouter = require("./routes/stocks");

const db = require("./db"); // 引入剛才寫的連線模組
const app = express();

const port = 3000;
// const host = "localhost";
const host = "0.0.0.0";

// 允許前端連線
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/items", itemRouter);
app.use("/api/boxes", boxRouter);
app.use("/api/cates", cateRouter);
app.use("/api/customers", customerRouter);
app.use("/api/stocks", stockRouter);

app.get("/", (req, res) => {
  res.send("首頁123456");
});

app.listen(port, host, () => {
  console.log("server 啟動 123!");
});
