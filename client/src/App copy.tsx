import { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import TableDemo from "./components/TableDemo";
function App() {
  interface Stock {
    // id: number;
    stock_name: string;
    created_at: string;

    // 可以根據你的後端欄位繼續增加，例如：
    // content: string;
  }

  const [data, setData] = useState<Stock[]>([]);

  useEffect(() => {
    // 向後端發送請求
    // fetch("/api/message")
    fetch("/api/stocks")
      // .then((res) => res)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      });
    // .catch((err) => setData("連線失敗：" + err.message));
  }, []); // 空陣列代表只在組件掛載時執行一次

  return (
    <div style={{ padding: "20px" }}>
      <TableDemo />
      <div style={{ padding: 20 }}>
        <Button type="primary">你好，Ant Design！</Button>
        <DatePicker style={{ marginLeft: 16 }} />
      </div>
      <h1>前後端連線測試</h1>
      {/* 加上條件判斷，確保 data[0] 存在才渲染內容 */}
      {data.length > 0 ? (
        <p>
          後端訊息：
          {/* 使用 toLocaleString 轉換成易讀的時間格式 */}
          {new Date(data[2].created_at).toLocaleString("zh-TW")}
          {data[2].stock_name}
        </p>
      ) : (
        <p>資料庫目前沒有任何資料。</p>
      )}
      {/* <p>後端訊息：{JSON.stringify(data[0].created_at)}</p> */}
    </div>
  );
}

export default App;
