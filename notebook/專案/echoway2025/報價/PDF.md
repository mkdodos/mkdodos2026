列印並存檔

SearchBar.js
在此頁面,按下列印鈕,進行列印同時存檔

```javascript
const handlePrint = () => {
    // 取得報價資料
    const currentQuoteData = state.data;
    // 先把整包物件轉成字串，存進 localStorage
    localStorage.setItem("print_quote_cache", JSON.stringify(currentQuoteData));
    // 開啟新分頁
    window.open(`/quotation-pdf`, "_blank");
  };
```

用一個頁面設計報價單版面

- 表頭
- 內容
* 表尾
	**左: 有效條件 .memo-box
	右: 客戶簽名



