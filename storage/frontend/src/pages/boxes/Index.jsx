import { useState } from "react";
import { Table, Button, Layout, Form, ConfigProvider } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useBoxes } from "./useBoxes"; // 抽離的 Hook
import BoxModal from "./BoxModal";

export default function Index() {
  const { data, loading, confirmLoading, deleteItem, saveItem } = useBoxes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "箱名", dataIndex: "name" },
    { title: "地點", dataIndex: "location" },
    {
      title: "操作",
      render: (_, record) => (
        <Button
          type="text"
          icon={
            <EditOutlined
              style={{
                fontSize: "22px", // 調整大小
                color: "#2C3947",
              }}
            />
          }
          onClick={() => openModal(record)}
        />
      ),
    },
  ];

  // 開啟彈窗邏輯
  const openModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log("ok");

    const values = await form.validateFields();
    // setIsModalOpen(false);
    // console.log(values);
    if (await saveItem(values, editingId)) setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (await deleteItem(id)) setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          新增盒子
        </Button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              // 設定標題列背景色
              headerBg: "#8CC7C4",
              // 如果需要，也可以設定標題文字顏色
              headerColor: "rgba(0, 0, 0, 0.85)",
              // 設定標題列圓角（可選）
              headerBorderRadius: 4,
              borderColor: "#8CC7C4",
            },
          },
        }}
      >
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </ConfigProvider>

      <BoxModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
        form={form}
        editingId={editingId}
        onDelete={handleDelete}
      />
    </>
  );
}
