import React from "react";
import { Table } from "antd";

function FitStock({ data }) {
  const columns = [
    {
      title: "od",
      dataIndex: "od",
    },
    {
      title: "len",
      dataIndex: "len",
    },
    {
      title: "waste",
      dataIndex: "waste",
    },
  ];
  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default FitStock;
