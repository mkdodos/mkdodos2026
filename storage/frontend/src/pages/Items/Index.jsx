import { useState } from "react";
import { Table, Button, Layout, Form } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useItems } from "./useItems"; // 抽離的 Hook
import ItemModal from "./ItemModal"; // 抽離的 Modal

const { Content } = Layout;

function Index() {
  const { data, loading, confirmLoading, deleteItem, saveItem } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

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
    const values = await form.validateFields();
    if (await saveItem(values, editingId)) setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (await deleteItem(id)) setIsModalOpen(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "項目", dataIndex: "item_name" },
    { title: "類別", dataIndex: "category" },
    { title: "盒編號", dataIndex: "box_id" },
    {
      title: "操作",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined color="#1890ff" />}
          onClick={() => openModal(record)}
        />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      <Content style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            新增項目
          </Button>
        </div>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />

        {/* 抽離出來的 Modal 元件 */}
        <ItemModal
          open={isModalOpen}
          editingId={editingId}
          form={form}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      </Content>
    </Layout>
  );
}

export default Index;
