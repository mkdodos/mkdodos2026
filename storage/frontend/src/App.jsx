import { useEffect, useState } from "react";
import axios from "axios";
import TableDemo from "./compnents/TableDemo";
import { Table, Button, Space, Form, Modal, Input, InputNumber } from "antd";
import { EditOutlined, EditFilled, DeleteOutlined } from "@ant-design/icons";

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

  const createUserData = async () => {
    const url = "http://192.168.0.10:3000/api/items";

    const updatedInfo = {
      box_id: 102,
      item_name: "心情",
      category: "情緒",
    };

    try {
      const response = await axios.post(url, updatedInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getItems();
    } catch (error) {
      console.error("新增失敗:", error.response?.data || error.message);
    }
  };
  // 1. 點擊編輯按鈕
  const handleEdit = (record) => {
    console.log(record.id);
    setEditingId(record.id); // 記錄正在編輯哪一筆
    form.setFieldsValue(record); // 把資料塞進表單
    setIsModalOpen(true);
  };
  // 2. 儲存表單
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // 在這裡串接 API 更新資料

      const url = `http://192.168.0.10:3000/api/items/${editingId}`;

      const response = await axios.put(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("更新成功:", response.data);

      // const newData = dataSource.map((item) =>
      //   item.id === editingId ? { ...item, ...values } : item
      // );
      // setDataSource(newData);
      setIsModalOpen(false);
      // message.success("更新成功！");
    } catch (error) {
      console.log("驗證失敗:", error);
    }
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

          <Button
            onClick={() => {
              console.log(record.id);
              deleteItem(record.id);
            }}
            type="text"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const deleteItem = async (id) => {
    const url = `http://192.168.0.10:3000/api/items/${id}`;

    try {
      const response = await axios.delete(url);
      console.log("刪除成功:", response.data);
      // getItems();
    } catch (error) {
      console.error("刪除失敗:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {editingId}
      <Button onClick={createUserData}>新增</Button>

      {/* <Button
        onClick={updateUserData}
        type="text"
        icon={<EditOutlined style={{ fontSize: "24px", color: "#1890ff" }} />}
      /> */}
      {/* {JSON.stringify(data)} */}
      <TableDemo dataSource={data} columns={columns} />
      {/* 編輯用彈窗 */}
      <Modal
        title="編輯資料"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden // 關閉時銷毀，確保下次開啟是乾淨的
      >
        <Form form={form} layout="vertical">
          <Form.Item name="item_name" label="姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="類別">
            <Input />
          </Form.Item>
          <Form.Item name="box_id" label="年齡">
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
