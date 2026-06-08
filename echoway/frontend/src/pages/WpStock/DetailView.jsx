import React from "react";
import { Modal, Table } from "antd";

export default function DetailView({ id, data, isModalOpen, setIsModalOpen }) {
  const columns = [
    {
      title: "tree_structure",
      dataIndex: "tree_structure",
    },
    {
      title: "len",
      dataIndex: "len",
    },
    {
      title: "level",
      dataIndex: "level",
    },
  ];
  return (
    <div>
      <Modal
        title="Family tree"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        // 不顯示ok cancel 鈕
        footer={null}
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Modal>
    </div>
  );
}
