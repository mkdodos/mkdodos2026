import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = 3333;

app.get("/api/download-hn", async (req, res) => {
  try {
    const quoteId = req.query.id;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://192.168.0.10:3002/quotation-pdf?id=${quoteId}`, {
      waitUntil: "networkidle2",
    });

    // await page.waitForSelector("table tbody tr", { timeout: 1000 });

    // 關鍵修改：不指定 path，page.pdf() 會直接回傳二進位的 Buffer
    const pdfBuffer = await page.pdf({
      format: "letter",
    });

    await browser.close();

    // 告訴前端這是一個 PDF 檔案
    res.setHeader("Content-Type", "application/pdf");

    // === 選擇你要的模式 ===
    // 模式 A：讓前端直接在瀏覽器新分頁「打開預覽」
    res.setHeader("Content-Disposition", 'inline; filename="hn.pdf"');

    // 模式 B：如果要讓前端直接「下載檔案」，請把上面那行換成下面這行
    // res.setHeader('Content-Disposition', 'attachment; filename="hn.pdf"');

    // 將 PDF 資料傳送給前端
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF 產生失敗:", error);
    res.status(500).send("伺服器錯誤，無法產生 PDF");
  }
});

app.listen(PORT, () => {
  console.log(`伺服器正運行於 http://localhost:${PORT}`);
});
