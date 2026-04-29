import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

import { useCates } from "./useCates";
import {
  DashboardOutlined,
  DatabaseOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function Index() {
  const { data, saveItem, deleteItem } = useCates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "箱名", dataIndex: "cate_name" },
    {
      // 標題列
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <span>操作</span> */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              /* 處理新增邏輯 */
              setIsModalOpen(true);
              // 清除表單輸入值
              form.resetFields();
              setEditingId(null);
            }}
          >
            新增類別
          </Button>
        </div>
      ),
      // 內容列
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
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  const handleEdit = async (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);

    setIsModalOpen(true);

    // console.log(record);
    // saveItem(record);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    // console.log(values);
    // setIsModalOpen(false);
    // console.log(values);
    if (await saveItem(values, editingId)) setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (await deleteItem(id)) setIsModalOpen(false);
  };

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <Modal
        title="編輯表單"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {editingId && (
                <Popconfirm
                  title="確定要刪除嗎？"
                  onConfirm={() => handleDelete(editingId)}
                  okButtonProps={{ danger: true }}
                >
                  <Button danger icon={<DeleteOutlined />}>
                    刪除
                  </Button>
                </Popconfirm>
              )}
            </div>

            <Button key="submit" type="primary" onClick={handleOk}>
              Ok
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="cate_name"
            label="類別"
            rules={[{ required: true, message: "請輸入類別" }]}
          >
            <Input placeholder="例如：五金" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
