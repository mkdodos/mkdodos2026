
在報價頁面 quotation 的列印事件,將資料存放在 localStorage
在列印頁面 quotation-pdf 的 useEffect 取得存放在 localStorage 的資料放在 state 
接下來列印格式內都套用 state 資料

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


```jsx
// 路由對應
<Route path="/quotation-pdf" element={<QuotationPdf />} />

// 元件所在
const QuotationPdf = lazy(() => import("./pages/Quotation/components/PdfView"));
```


```jsx
// PdfView
// 用 state 存放 localStorage 資料
const [quoteData, setQuoteData] = useState(null);

 useEffect(() => {
    // 取得放在 localStorage 報價資料
    const cachedData = localStorage.getItem("print_quote_cache");
    if (cachedData) {
      // 將資料放在 state
      setQuoteData(JSON.parse(cachedData));
      // 移除 localStorage 資料
      localStorage.removeItem("print_quote_cache");
    }
  }, []);
```
 




用一個頁面設計報價單版面

- 表頭
- 內容
* 表尾
	**左: 有效條件 .memo-box
	右: 客戶簽名



