import React from "react";
import { Table, Modal } from "antd";
// import { runCut } from "./useData";

function FitStock({ data, open, setOpen, demand, runCut }) {
  // console.log(data);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "sn",
      dataIndex: "sn",
    },
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
  const handleOk = () => {
    const row = {
      demand_id: demand.id,
      cut_len: demand.len,
      stock_id: data[0].id,
      remain_len: data[0].remain_len,
    };
    runCut(row);
    // console.log(row);
  };
  return (
    <Modal
      title={`id${demand.id} 外徑${demand.od} 長度${Number(demand.len)}`}
      open={open}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
    >
      <Table rowKey="id" dataSource={data} columns={columns} />
    </Modal>
  );
}

export default FitStock;
