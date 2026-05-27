import React from "react";
import { Table, Modal } from "antd";

function FitStock({ data, open, setOpen, demand }) {
  // console.log(demand);
  const columns = [
    {
      title: "od",
      dataIndex: "od",
    },
    {
      title: "len",
      dataIndex: "len",
      render: (text) => Number(text),
    },
    {
      title: "remain_len",
      dataIndex: "remain_len",
      render: (text) => Number(text),
    },
  ];
  return (
    <Modal
      title={`id${demand.id} 外徑${demand.od} 長度${Number(demand.len)}`}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <Table rowKey="id" dataSource={data} columns={columns} />
    </Modal>
  );
}

export default FitStock;
