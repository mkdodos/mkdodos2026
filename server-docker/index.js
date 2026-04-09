console.log("當前系統時區:", process.env.TZ);
console.log("Node.js 認定現在時間:", new Date().toString());

const express = require("express");
// 關鍵：處理跨域問題
const cors = require("cors");
const app = express();
// 允許前端 React 連線
app.use(cors());
app.use(express.json()); // 這一行必須放在路由掛載之前
// Docker Test
const studentsRouter = require("./routes/students");
const stocksRouter = require("./routes/stocks");
const stockTradesRouter = require("./routes/stock_trades");

app.use("/api/stocks", stocksRouter);
app.use("/api/stock-trades", stockTradesRouter);

app.use("/students", studentsRouter); //

app.get("/", (req, res) => {
  // res.send("歡迎光臨!");
  res.json({ message: "歡迎光臨!" });
});

app.get("/api", (req, res) => {
  // res.send("歡迎光臨!");
  res.json({ message: "api!" });
});
app.get("/api/message", (req, res) => {
  res.json({ message: "來自 Express 後端的問候！🚀" });
});

app.listen("3000", () => {
  console.log(process.env.NODE_ENV);
});
