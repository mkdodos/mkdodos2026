import React from "react";
import { Badge, Table } from "antd";
import { Calendar } from "antd";
function TableViewDetail({ data, columns, handleEdit }) {
  const cellRender = (current) => {
    const date = current.date();
    const rows = data.filter((obj) => obj.buy_day === date);
    // console.log(current.date());
    // const abc = rows.map((row) => {
    //   let ul = "<ul>";
    //   ul += Number(row.amt);
    //   ul += "</ul>";
    //   return ul;
    // });
    // return abc;
    return (
      <ul className="events">
        {rows.map((row, index) => (
          <li key={index}>
            <Badge status="processing" text={Number(row.amt)} />
          </li>
        ))}
      </ul>
    );
    // if (date === data[0].buy_day) return data[0]?.amt;
  };

  console.log(data);
  return (
    <div>
      <Calendar cellRender={cellRender} />
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
