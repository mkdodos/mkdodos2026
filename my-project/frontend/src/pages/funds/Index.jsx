import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditableTable from "./components/EditableTable";
import { Tag, Tabs } from "antd";
import Portfolio from "./Portfolio";
import axios from "axios";

function Index() {
  const columns = [
    {
      title: "編號",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "交易日期",
      dataIndex: "trade_date",
      width: "15%",
      editable: true,
      required: true,
      valueType: "date", // 新增這行來識別
      // 排序提示詞
      showSorterTooltip: false,
      //   showSorterTooltip: { title: "按日期排序" },

      render: (text) => {
        if (!text) return "-";
        // 這樣會根據瀏覽器時區自動將 16:00Z 轉回 00:00(+8)
        return dayjs(text).format("YYYY-MM-DD");
      },
      sorter: (a, b) => dayjs(a.trade_date).unix() - dayjs(b.trade_date).unix(),
    },
    {
      title: "交易別",
      dataIndex: "side",
      editable: true,
      width: "10%",
      required: false,
      // 讓 B S 字串顯示成買入賣出
      render: (side) => (
        <Tag
          color={side === "B" ? "volcano" : "cyan"}
          style={{
            fontSize: "14px", // 加大字體 (預設通常是 12px 或 14px)
            padding: "2px 10px", // 增加左右內距讓標籤變寬
            fontWeight: "bold", // 加粗讓字更清楚
            lineHeight: "24px", // 調整行高讓標籤垂直撐開
          }}
        >
          {side === "B" ? "買入" : "賣出"}
        </Tag>
      ),
    },
    {
      title: "基金編號",
      dataIndex: "fund_id",
      width: "10%",
      editable: true,
      required: true,
      render: (fund_id) => {
        console.log(typeof fund_id);
        return stockMap[fund_id] || fund_id;
      },
      // render: (fund_id) => (fund_id === "0050" ? "元大" : fund_id),
    },
    // {
    //   title: "基金名稱",
    //   dataIndex: "fund_name",
    //   width: "15%",
    //   editable: true,
    //   required: true,
    // },
    {
      title: "股數",
      dataIndex: "qty",
      width: "7%",
      editable: true,
      required: false,
    },
    {
      title: "單價",
      dataIndex: "price",
      width: "10%",
      editable: true,
      required: false,
      render: (value) => Number(value),
    },
    {
      title: "小計",
      dataIndex: "subtotal",
      width: "10%",
      required: false,
    },
  ];
  // 取得 stocks
  const [stocks, setStocks] = useState([]); // 存儲資料庫回來的股票清單
  const [stockMap, setStockMap] = useState({});
  const tabItems = [
    {
      key: "1",
      label: "統計",
      children: <Portfolio />,
    },
    {
      key: "2",
      label: "交易記錄",
      children: (
        <EditableTable
          stocks={stocks}
          apiEndpoint="http://192.168.0.10:3000/api/funds"
          columnsConfig={columns}
        />
      ),
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];

  const fetchStocks = async () => {
    try {
      const res = await axios.get("/api/stock_master");
      const data = res.data.data;

      const map = {};
      data.forEach((s) => {
        map[s.id] = `${s.stock_no} ${s.stock_name}`;
      });
      setStocks(data);
      setStockMap(map);
    } catch (error) {
      console.error("抓取失敗:", error);
    }
  };

  // 1. 初始化讀取資料
  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>基金管理系統</h2>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}

export default Index;
