console.log("當前系統時區:", process.env.TZ);
console.log("Node.js 認定現在時間:", new Date().toString());

const express = require("express");
// 關鍵：處理跨域問題
const cors = require("cors");
const app = express();
// 允許前端 React 連線
app.use(cors());
app.use(express.json()); // 這一行必須放在路由掛載之前

const worksRouter = require("./routes/works");
const customersRouter = require("./routes/customers");
const studentsRouter = require("./routes/students");

const stocksRouter = require("./routes/stocks");

app.use("/api/stocks", stocksRouter);

app.use("/works", worksRouter); // 所有關於作品的請求都找它
app.use("/customers", customersRouter); // 所有關於客戶的請求都找它
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

app.listen("3001", () => {
  console.log(process.env.NODE_ENV);
});
