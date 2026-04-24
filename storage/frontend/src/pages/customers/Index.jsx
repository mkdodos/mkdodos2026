import React from "react";
import { Table } from "antd";
import { useCustomers } from "./useCustomers";

function Index() {
  const { data, saveItem, deleteItem } = useCustomers();
  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "ID", dataIndex: "cust_id", width: 80 },
    { title: "箱名", dataIndex: "cust_name" },
  ];
  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

export default Index;
