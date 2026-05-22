import React from "react";
import { Table } from "antd";
function TableViewDetail({ data, columns, handleEdit }) {
  return (
    <div>
      <Table
        handleEdit={handleEdit}
        dataSource={data}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}

export default TableViewDetail;
