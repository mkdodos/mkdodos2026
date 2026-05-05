# 表格排序

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