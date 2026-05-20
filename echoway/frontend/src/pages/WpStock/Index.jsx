import React, { useEffect } from "react";
import { message, Table, Button, Tabs } from "antd";
import { PlayCircleOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import DemandList from "../WpDemand/DemandList";
import EditForm from "./EditForm";

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
      // console.log(response.data.data);
    } catch (error) {
      message.error("無法取得資料");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="text"
        />
      ),
    },
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
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "demand_id",
      dataIndex: "demand_id",
    },
    {
      title: "old_id",
      dataIndex: "old_id",
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "需求",
      children: <DemandList />,
    },
    {
      key: "2",
      label: "庫存",
      children: <Table columns={columns} dataSource={data} rowKey="id" />,
    },
  ];

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1" items={tabItems} />
      <EditForm />
    </div>
  );
}

export default Index;
