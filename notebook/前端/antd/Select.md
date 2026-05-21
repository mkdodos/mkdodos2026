

原始資料
{stock_no: '0050', stock_name: '元大台灣50'}

轉成 select組件 需要的格式

```javascript
const stockData = [/* 你的 JSON 資料 */];

const options = stockData.map(item => ({
  label: `${item.stock_no} ${item.stock_name}`, // 顯示 0050 元大台灣50
  value: item.stock_no,                        // 選中後的值
  key: item.id                                  // React 需要的唯一 key
}));


<Select
        showSearch // 開啟搜尋功能
        allowClear // 允許清除選取
        style={{ width: 300 }}
        placeholder="請選擇或搜尋股票"
        optionFilterProp="label" // 搜尋時根據 label 內容篩選
        // onChange={handleChange}
        options={options}
        // 如果資料量很大，可以加上過濾邏輯
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />

```