import React from "react";
import dayjs from "dayjs";
import EditableTable from "../../components/EditableTable";

function Index() {
  const columns = [
    {
      title: "編號",
      dataIndex: "id",
      width: "15%",
    },
    {
      title: "買入日期",
      dataIndex: "in_date",
      width: "15%",
      editable: true,
      required: true,
      valueType: "date", // 新增這行來識別
      render: (text) => {
        if (!text) return "-";
        // 這樣會根據瀏覽器時區自動將 16:00Z 轉回 00:00(+8)，日期就對了
        return dayjs(text).format("YYYY-MM-DD");
      },
      //   render: (text) => (text ? text.split("T")[0] : "-"),
    },
    {
      title: "基金名稱",
      dataIndex: "fund_name",
      width: "25%",
      editable: true,
      required: true,
    },
    {
      title: "股數",
      dataIndex: "qty",
      width: "15%",
      editable: true,
      required: false,
    },
    {
      title: "單價",
      dataIndex: "price",
      width: "15%",
      editable: true,
      required: false,
    },
    {
      title: "小計",
      dataIndex: "subtotal",
      width: "15%",
      required: false,
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      <h2>基金管理系統</h2>
      <EditableTable
        apiEndpoint="http://192.168.0.10:3000/api/funds"
        columnsConfig={columns}
      />
    </div>
  );
}

export default Index;
