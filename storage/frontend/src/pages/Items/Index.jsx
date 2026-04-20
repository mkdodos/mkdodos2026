import { useState, useMemo } from "react"; // 引入 useMemo 效能優化
import { Table, Button, Layout, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useItems } from "./useItems"; // 抽離的 Hook
import ItemModal from "./ItemModal"; // 抽離的 Modal

const { Content } = Layout;

function Index() {
  const {
    data,
    getItems,
    loading,
    confirmLoading,
    deleteItem,
    saveItem,
    boxes,
  } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState(""); // 搜尋文字狀態

  // 核心：過濾資料邏輯
  // 使用 useMemo 確保只有在 data 或 searchText 改變時才重新過濾
  // const filteredData = useMemo(() => {
  //   return data.filter(
  //     (item) =>
  //       item.item_name.toLowerCase().includes(searchText.toLowerCase()) ||
  //       (item.category &&
  //         item.category.toLowerCase().includes(searchText.toLowerCase())),
  //   );
  // }, [data, searchText]);

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
    // { title: "類別", dataIndex: "category" },
    // { title: "盒編號", dataIndex: "box_id" },
    { title: "盒名", dataIndex: "box_name" },
    {
      title: "操作",
      render: (_, record) => (
        <Button
          type="text"
          icon={
            <EditOutlined
              style={{
                fontSize: "22px", // 調整大小
                color: "#1890ff",
              }}
            />
          }
          onClick={() => openModal(record)}
        />
      ),
    },
  ];

  const handleSearch = () => {
    getItems(searchText); // 呼叫 Hook 裡的函式並傳入關鍵字
  };

  return (
    <>
      {/* <Layout style={{ minHeight: "100vh", padding: "24px" }}> */}
      {/* <Content style={{ background: "#fff", padding: 24, borderRadius: 8 }}> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <Input
          placeholder="搜尋項目名稱或類別..."
          prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          style={{ width: 300 }}
          allowClear
          onPressEnter={handleSearch} // 按下 Enter 直接搜
          onChange={(e) => setSearchText(e.target.value)} // 更新關鍵字
        />

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
        // dataSource={filteredData}
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
        boxes={boxes}
      />
      {/* </Content> */}
      {/* </Layout> */}
    </>
  );
}

export default Index;
