import React from "react";
import EditableTable from "../../components/EditableTable";

function Index() {
  const columns = [
    {
      title: "編號",
      dataIndex: "id",
      width: "25%",
    },
    {
      title: "箱名",
      dataIndex: "name",
      width: "25%",
      editable: true,
      required: true,
    },
    {
      title: "地點",
      dataIndex: "location",
      width: "15%",
      editable: true,
      required: false,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>收納管理系統</h2>
      <EditableTable
        apiEndpoint="http://192.168.0.10:3000/api/boxes"
        // apiEndpoint="https://api.example.com/users"
        columnsConfig={columns}
      />
    </div>
  );
  return <div>auto</div>;
}

export default Index;
