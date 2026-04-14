import { useEffect, useState } from "react";
import axios from "axios";
import TableDemo from "./compnents/TableDemo";
import {
  Table,
  Button,
  Space,
  Form,
  Modal,
  Input,
  InputNumber,
  Popconfirm,
  Divider,
} from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [data, setData] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    getItems();
  }, []);
  async function getItems() {
    try {
      const url = "http://192.168.0.10:3000/api/items";
      const response = await axios.get(url);
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // 按下「新增」按鈕
  const showAddModal = () => {
    setEditingId(null);
    // form.resetFields(); // 重要：清空上次輸入內容
    setIsModalOpen(true);
    // 等下一個 tick，確信 Form 已經連線了再 reset
    setTimeout(() => {
      form.resetFields();
    }, 0);
  };

  // 按下 Modal 的「確定」
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingId) {
        console.log("edit");
        // 【編輯邏輯】
        const url = `http://192.168.0.10:3000/api/items/${editingId}`;

        const response = await axios.put(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("更新成功:", response.data);
        setData((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, ...values } : item,
          ),
        );

        // 2. .map() (尋找並替換)
        // .map() 會遍歷整個陣列並回傳一個全新的陣列。
        // 它會逐一檢查陣列裡的每一筆 item。
        // 條件判斷：item.id === editingId
        // 如果是：代表這筆資料就是你剛才在 Modal 裡修改的那一行。
        // 如果不是：代表這筆資料沒變，原封不動回傳。
        // message.success('修改成功');
      } else {
        console.log("new");
        // 【新增邏輯】
        const url = "http://192.168.0.10:3000/api/items";
        const response = await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.id);
        // getItems();
        const newData = {
          id: response.data.id, // 實務上由後端產生 id
          ...values,
        };
        setData((prev) => [newData, ...prev]);
        // message.success('新增成功');
      }

      setIsModalOpen(false);
    } catch (info) {
      console.log("驗證失敗:", info);
    }
  };

  // 1. 點擊編輯按鈕
  const handleEdit = (record) => {
    console.log(record.id);
    setEditingId(record.id); // 記錄正在編輯哪一筆
    form.setFieldsValue(record); // 把資料塞進表單
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "項目",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "項目",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "類別",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "盒編號",
      dataIndex: "box_id",
      key: "box_id",
    },
    // 編輯鈕
    {
      title: "編輯",
      key: "edit",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={
              <EditOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            }
            onClick={() => {
              // console.log(record.id);
              handleEdit(record);
            }}
          />

          {/* <Button
            onClick={() => {
              console.log(record.id);
              deleteItem(record.id);
            }}
            type="text"
            danger
            icon={<DeleteOutlined />}
          /> */}
        </Space>
      ),
    },
  ];

  const deleteItem = async (id) => {
    const url = `http://192.168.0.10:3000/api/items/${id}`;

    try {
      const response = await axios.delete(url);
      console.log("刪除成功:", response.data);
      // ✅ 關鍵步驟：更新前端狀態
      // 使用 filter 過濾掉 ID 匹配的那一項
      setData((prev) => prev.filter((item) => item.id !== id));
      // 如果是在 Modal 裡刪除的，記得關閉 Modal
      setIsModalOpen(false);
      // getItems();
    } catch (error) {
      console.error("刪除失敗:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* 使用 flex 容器將按鈕推向右側 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          新增
        </Button>
      </div>

      <TableDemo dataSource={data} columns={columns} />
      {/* 編輯用彈窗 */}
      <Modal
        title="編輯資料"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden // 關閉時銷毀，確保下次開啟是乾淨的
        // 透過 styles 屬性增加內容區底部的間距
        styles={{ body: { paddingBottom: "5px" } }}
        // 自定義 footer
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* 左側區域：僅在編輯模式下顯示刪除鈕 */}
            <div>
              {editingId && (
                <Popconfirm
                  title="確定要刪除嗎？"
                  onConfirm={() => deleteItem(editingId)}
                  okText="確定"
                  cancelText="取消"
                  okButtonProps={{ danger: true }}
                >
                  <Button danger icon={<DeleteOutlined />}>
                    刪除
                  </Button>
                </Popconfirm>
              )}
            </div>

            {/* 右側區域：取消與儲存 */}
            <Space>
              {/* <Button onClick={() => setIsModalOpen(false)}>取消</Button> */}
              <Button type="primary" onClick={handleOk}>
                儲存
              </Button>
            </Space>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="item_name" label="項目" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="類別">
            <Input />
          </Form.Item>
          <Form.Item name="box_id" label="box">
            <InputNumber min={1} />
          </Form.Item>
          {/* 這裡加入分隔線，margin 設定為 24px 增加上下留白 */}
        </Form>
        <Divider
          style={{
            margin: "24px 0 16px 0",
            borderColor: "#d9d9d9", // 加深顏色 (預設約為 #f0f0f0)
            borderWidth: "2px",
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
