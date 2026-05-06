import React from "react";
import dayjs from "dayjs";
import EditableTable from "../../components/EditableTable";
import { Tag } from "antd";
import Portfolio from "./Portfolio";

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
      width: "15%",
      required: false,
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
    },
    {
      title: "基金名稱",
      dataIndex: "fund_name",
      width: "15%",
      editable: true,
      required: true,
    },
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
    },
    {
      title: "小計",
      dataIndex: "subtotal",
      width: "10%",
      required: false,
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      <h2>基金管理系統</h2>
      <Portfolio />
      <EditableTable
        apiEndpoint="http://192.168.0.10:3000/api/funds"
        columnsConfig={columns}
      />
    </div>
  );
}

export default Index;
