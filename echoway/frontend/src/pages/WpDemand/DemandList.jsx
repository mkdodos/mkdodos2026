import React, { useState, useEffect } from "react";
import { Table, Tag, Progress, Button, Space, Card, Typography } from "antd";
import { PlayCircleOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
const { Title } = Typography;

const DemandList = () => {
  const API_BASE = "/api/wp-demand";
  // const API_BASE = "http://192.168.0.10:3001/api/wp-demand";

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    getItems();
  }, []);

  // 定義表格欄位
  const columns = [
    {
      title: "訂單編號",
      dataIndex: "order_no",
      key: "order_no",
      render: (text) => <code style={{ fontWeight: "bold" }}>{text}</code>,
    },
    {
      title: "規格 (外徑 x 長度)",
      key: "spec",
      render: (_, record) => (
        <span>
          Φ {record.od} × {record.len} mm
        </span>
      ),
    },
    {
      title: "切割進度",
      key: "progress",
      width: 250,
      render: (_, record) => {
        const percent = Math.round((record.completed / record.qty) * 100);
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 8, whiteSpace: "nowrap" }}>
              {record.completed} / {record.qty}
            </span>
            <Progress
              percent={percent}
              size="small"
              status={record.status === "completed" ? "success" : "active"}
            />
          </div>
        );
      },
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let label = "待處理";
        if (status === "completed") {
          color = "green";
          label = "已完成";
        }
        if (status === "processing") {
          color = "blue";
          label = "切割中";
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "優先級",
      dataIndex: "priority",
      key: "priority",
      sorter: (a, b) => a.priority - b.priority,
      render: (p) => (p >= 5 ? <Tag color="red">緊急</Tag> : <Tag>普通</Tag>),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<PlayCircleOutlined />}
            disabled={record.status === "completed"}
            onClick={() => handleRunBFD(record.id)}
          >
            執行排產
          </Button>
          <Button icon={<EditOutlined />} type="text" />
        </Space>
      ),
    },
  ];

  const handleRunBFD = (id) => {
    console.log("對需求 ID 執行 BFD 演算法:", id);
    // 這裡串接後端 API
  };

  return (
    <Card style={{ margin: 24 }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3}>切割需求管理</Title>
        <Button type="primary">+ 新增需求</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default DemandList;
