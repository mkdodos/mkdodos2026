import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios";

function Portfolio() {
  const apiEndpoint = "http://192.168.0.10:3000/api/funds/total";
  const [data, setData] = useState([]);
  // 1. 初始化讀取資料
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(apiEndpoint);
      setData(res.data.data);
      console.log(res.data);
    } catch (err) {
      message.error("獲取資料失敗");
    }
  };

  const columns = [
    {
      title: "編號",
      dataIndex: "fund_id",
      width: "5%",
    },
    {
      title: "編號",
      dataIndex: "stock_no",
      width: "5%",
    },
    {
      title: "編號",
      dataIndex: "stock_name",
      width: "5%",
    },
    {
      title: "股數",
      dataIndex: "total_qty",
      width: "5%",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default Portfolio;
