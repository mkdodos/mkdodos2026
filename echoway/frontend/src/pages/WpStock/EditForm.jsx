import React, { useState } from "react";
import { Modal, Form, Input, Space, Button } from "antd";

function EditForm({ handleSave, handleDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title="需求編輯表單"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        // 不顯示ok cancel 鈕
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: "100%", marginTop: "24px" }}
          initialValues={{ remember: true }}
          onFinish={handleSave}
          autoComplete="off"
        >
          <Form.Item
            label="訂單編號"
            name="order_no"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" danger onClick={handleDelete}>
              刪除
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}

export default EditForm;
