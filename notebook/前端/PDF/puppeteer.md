
Q:
page.goto 這些頁面中表格只顯示標題,沒內容

A:
**表格內的數據（Data）此時還在透過 API（如 `fetch` 或 `axios`）非同步載入中。** 即使設定了 `waitUntil: "networkidle2"`，有時因為 React 狀態更新與 DOM 重新渲染（Re-render）之間有微小的時間差，Puppeteer 還是會太早「對空網頁拍照或產出 PDF」。

等待特定的「資料列 CSS 選擇器」出現（最推薦、最穩固）
不要只依賴網路狀態，直接強迫 Puppeteer 看到「表格內至少有一筆資料 row」出現後，才執行 PDF 轉換。

await page.waitForSelector("table tbody tr", { timeout: 5000 });

```javascript


// CommonJS 寫法（傳統）

const puppeteer = require('puppeteer');

app.get('/screenshot', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {
      waitUntil: 'networkidle2',
    });
    await page.pdf({ path: 'hn.pdf', format: 'letter' });
    await browser.close();

    res.download('hn.pdf');
  } catch (err) {
    res.status(500).send('產生 PDF 失敗：' + err.message);
  }
});
```

```javascript

import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://news.ycombinator.com', {
  waitUntil: 'networkidle2',
});
await page.pdf({
  path: 'hn.pdf',
  format: 'letter',
});

await browser.close();
```