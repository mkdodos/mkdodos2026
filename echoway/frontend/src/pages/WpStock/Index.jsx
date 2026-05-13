import React, { useEffect } from "react";
import { message, Table } from "antd";
import axios from "axios";
import { useState } from "react";

function Index() {
  // const API_BASE = "http://192.168.0.10:3001/api/wp-stock/family-tree";
  const API_BASE = "http://192.168.0.10:3001/api/wp-stock";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. 取得資料
  const getItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      message.error("無法取得資料");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "parent_id",
      dataIndex: "parent_id",
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
    },
  ];

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default Index;
