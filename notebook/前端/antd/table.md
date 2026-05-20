# 表格排序

設定 render 讓欄位顯示不同內容
讓 B , S 字串顯示成 買入 , 賣出
```javascript
      render: (side) => (       
          {side === "B" ? "買入" : "賣出"}        
      ),
```      



設定 sorter
將日期(字串)轉換為 Unix 時間戳記（數字）
方便做排序
```javascript
 const columns = [    
    {
      title: "交易日期", 
      dataIndex: "trade_date",
      sorter: (a, b) => dayjs(a.trade_date).unix() - dayjs(b.trade_date).unix(),
    },
 ]   
```