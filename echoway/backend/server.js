const express = require("express");
const customerRouter = require("./routes/customers"); // 引入檔案
const stockRouter = require("./routes/stocks");
const feeRouter = require("./routes/fees");
const wpStockRouter = require("./routes/wp_stock");
const wpDemandRouter = require("./routes/wp_demand");
const wpCutLogsRouter = require("./routes/wp_cut_logs");

const db = require("./db"); // 引入剛才寫的連線模組
const app = express();

const port = 3001;
// const host = "localhost";
const host = "0.0.0.0";

// 允許前端連線
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/customers", customerRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/fees", feeRouter);
app.use("/api/wp-stock", wpStockRouter);
app.use("/api/wp-demand", wpDemandRouter);
app.use("/api/wp-cut-logs", wpCutLogsRouter);

app.get("/", (req, res) => {
  res.send("首頁");
});

app.listen(port, host, () => {
  console.log("server 啟動 3001!");
});
