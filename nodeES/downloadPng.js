import puppeteer from "puppeteer";

(async () => {
  // 啟動瀏覽器
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 前往目標網頁
  //   const url = "https://news.ycombinator.com";
  const url = "http://192.168.0.10:5173/";
  await page.goto(url);

  // 拍照存檔
  await page.screenshot({ path: "example.png" });

  // 關閉瀏覽器
  await browser.close();
  console.log("截圖完成！");
})();
