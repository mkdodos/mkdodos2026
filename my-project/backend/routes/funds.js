const express = require("express");
const router = express.Router();
const helper = require("../utils/db-helper");
const db = require("../db"); // 連線模組

const TABLE_NAME = "funds"; // 只要改這裡，就能套用到不同資料表

router.get("/total2", async (req, res) => {
  async function fetchTWSEPrices(stockNos) {
    // TWSE 支援一次查多支，格式：tse_2330.tw|tse_2317.tw
    const query = stockNos.map((no) => `tse_${no}.tw`).join("|");
    const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${query}&json=1&delay=0&_=${Date.now()}`;

    const res = await fetch(url);
    const data = await res.json();

    // 轉成 { '2330': 980, '2317': 105 } 的格式
    // return Object.fromEntries(
    //   (data.msgArray ?? []).map((s) => [
    //     s.c, // 股票代號
    //     parseFloat(s.z ?? s.y ?? "0"), // 成交價，盤後用昨收(y)
    //   ]),
    // );
    return Object.fromEntries(
      (data.msgArray ?? []).map((s) => {
        const rawPrice = s.z !== "-" ? s.z : s.y; // ← 關鍵修正
        return [
          s.c,
          {
            price: parseFloat(rawPrice ?? "0"),
            time: s.t, // 最後成交時間，e.g. "13:25:00"
            isRealtime: s.z !== "-", // 是否為即時價
          },
        ];
        // return [s.c, parseFloat(rawPrice ?? "0")];
      }),
    );
  }

  async function getPortfolioWithPrice() {
    // Step 1: 查詢持倉
    const { rows: holdings } = await db.query(`
  SELECT 
    f.fund_id, 
    s.stock_no,
    s.stock_name,
    SUM(CASE WHEN f.side = 'B' THEN f.qty ELSE -f.qty END) AS total_qty
  FROM funds f
  INNER JOIN stock_master s ON f.fund_id = s.id
  GROUP BY f.fund_id, s.stock_no, s.stock_name
  HAVING SUM(CASE WHEN f.side = 'B' THEN f.qty ELSE -f.qty END) > 0
  ORDER BY f.fund_id
`);

    // Step 2: 批次取得即時股價
    const symbols = [...new Set(holdings.map((h) => h.stock_no))];
    const priceMap = await fetchTWSEPrices(symbols);

    // Step 3: Merge 回持倉
    return holdings.map((row) => {
      const price = priceMap[row.stock_no] ?? null;
      return {
        ...row,
        price,
        market_value: price ? price * row.total_qty : null,
      };
    });
  }

  const portfolio = await getPortfolioWithPrice();
  console.table(portfolio);
  res.json(portfolio);
  const stock = portfolio?.find((s) => s.c === "2891");
  console.log("中信金原始資料:", JSON.stringify(stock));
});

// 取得加總資料
// 取得資料
router.get("/total", async (req, res) => {
  try {
    // const sql = `
    //   SELECT
    //   fund_id,
    //   SUM(CASE WHEN side = 'B' THEN qty ELSE -qty END) AS total_qty
    //   FROM funds
    //   GROUP BY fund_id
    //   HAVING SUM(CASE WHEN side = 'B' THEN qty ELSE -qty END) > 0
    //   ORDER BY fund_id;
    // `;
    const sql = `
    SELECT 
    f.fund_id, 
    s.stock_no,      -- 從 stocks 表取得代號
    s.stock_name,    -- 從 stocks 表取得名稱
    SUM(CASE WHEN f.side = 'B' THEN f.qty ELSE -f.qty END) AS total_qty
FROM funds f
INNER JOIN stock_master s ON f.fund_id = s.id  -- 連結條件：基金ID等於股票表的主鍵ID
GROUP BY f.fund_id, s.stock_no, s.stock_name
HAVING SUM(CASE WHEN f.side = 'B' THEN f.qty ELSE -f.qty END) > 0
ORDER BY f.fund_id;
    `;
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

// 取得資料
router.get("/", async (req, res) => {
  try {
    const data = await helper.getAll(TABLE_NAME);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "讀取失敗" });
  }
});

// 新增資料
router.post("/", async (req, res) => {
  try {
    // 直接把 req.body 丟進去，它會自動抓欄位名稱
    const newItem = await helper.create(TABLE_NAME, req.body);
    res.status(201).json({ success: true, data: newItem, id: newItem.id });
  } catch (err) {
    res.status(500).json({ success: false, msg: "新增失敗" });
  }
});

// 更新與刪除以此類推...

// 更新資料 (通常需要 ID)
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 假設 helper.update 接收 (資料表名, ID, 更新內容)
    const updatedItem = await helper.update(TABLE_NAME, id, req.body);

    if (!updatedItem) {
      return res.status(404).json({ success: false, msg: "找不到該筆資料" });
    }

    res.json({ success: true, data: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "更新失敗" });
  }
});

// 刪除資料
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // 假設 helper.delete 接收 (資料表名, ID)
    const result = await helper.delete(TABLE_NAME, id);

    if (!result) {
      return res.status(404).json({ success: false, msg: "找不到該筆資料" });
    }

    res.json({ success: true, msg: "刪除成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "刪除失敗" });
  }
});

module.exports = router;
