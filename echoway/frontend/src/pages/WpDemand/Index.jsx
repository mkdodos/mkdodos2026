import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Progress,
  Button,
  Space,
  Card,
  Typography,
  message,
  Form,
} from "antd";
import { PlayCircleOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useData } from "./useData";
import EditForm from "./EditForm";
import FitStock from "./FitStock";

const Index = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const { data, saveData, deleteData, runBFD, dataFit } = useData();

  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFitOpen, setIsModalFitOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [demand, setDemand] = useState({ id: "", od: "", len: "" });

  // const [editingId, setEditingId] = useState(null);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    // console.log(record);
    // 1. 打開彈窗
    setIsModalOpen(true);
    setEditingId(record.id);

    // 2. 設定表單數值 (這會自動對應到 EditForm 裡 Form.Item 的 name)
    // 建議加上 setTimeout 確保 Modal 渲染完成後再填值，避免 initialValues 衝突
    setTimeout(() => {
      form.setFieldsValue(record);
    }, 0);
  };

  // values 表單中輸入項的值
  const handleSave = async (values) => {
    await saveData(values, editingId);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteData(editingId);
    setIsModalOpen(false);
  };

  // 定義表格欄位
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "訂單編號",
      dataIndex: "order_no",
      key: "order_no",
      render: (text) => <code style={{ fontWeight: "bold" }}>{text}</code>,
    },
    {
      title: "規格",
      key: "spec",
      render: (_, record) => (
        <span>
          Φ {record.od} × {record.len}
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
            // onClick={() => handleRunBFD(record.id)}
            onClick={() => handleRunBFD(record)}
          >
            預覽
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="text"
          />
        </Space>
      ),
    },
  ];

  const handleRunBFD = (record) => {
    runBFD(record);
    setIsModalFitOpen(true);
    setDemand(record);
    // console.log(id);
    // console.log("對需求 ID 執行 BFD 演算法:", id);
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
        <FitStock
          data={dataFit}
          open={isModalFitOpen}
          setOpen={setIsModalFitOpen}
          demand={demand}
        />
        <Title level={3}>切割需求管理</Title>
        <Button type="primary" onClick={showModal}>
          + 新增需求
        </Button>
      </div>
      <EditForm
        isModalOpen={isModalOpen}
        handleSave={handleSave}
        // handleSave={saveData}
        setIsModalOpen={setIsModalOpen}
        // handleOk={handleOk}
        handleCancel={handleCancel}
        // setData={setData}
        form={form}
        handleDelete={handleDelete}
      />
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

export default Index;
