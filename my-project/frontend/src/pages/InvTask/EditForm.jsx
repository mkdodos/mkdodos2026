import React from "react";
import { Modal, Form, Input, Switch, Button } from "antd";

export default function EditForm({ isModalOpen, setIsModalOpen, form }) {
  const onFinish = (values) => {
    console.log("表單資料:", values);
    // values.is_enabled 會是 true 或 false
  };
  return (
    <div>
      <Modal
        open={isModalOpen}
        title="編輯表單"
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form onFinish={onFinish} form={form}>
          <Form.Item name="stock_no" label="股票代碼">
            <Input />
          </Form.Item>
          <Form.Item
            label="啟用狀態"
            name="is_enabled"
            // valuePropName="checked" // 關鍵：告訴 Form 這裡要對應的是 checked 屬性而非 value
          >
            <Switch
              checkedChildren="開啟"
              unCheckedChildren="關閉"
              defaultChecked
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
