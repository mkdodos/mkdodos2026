import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

import { useCates } from "./useCates";
import {
  DashboardOutlined,
  DatabaseOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Index() {
  const { data, saveItem } = useCates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "箱名", dataIndex: "cate_name" },
    {
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>操作</span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              /* 處理新增邏輯 */
              setIsModalOpen(true);
              // 清除表單輸入值
              form.resetFields();
            }}
          >
            新增類別
          </Button>
        </div>
      ),
    },
  ];

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    // setIsModalOpen(false);
    // console.log(values);
    if (await saveItem(values)) setIsModalOpen(false);
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
