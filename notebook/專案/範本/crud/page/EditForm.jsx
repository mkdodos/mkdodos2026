import React from "react";
import { Modal, Form, Input, Switch, Button, Space, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function EditForm({
  isModalOpen,
  setIsModalOpen,
  form,
  handleSave,
  handleDelete,
}) {
  //   const onFinish = (values) => {
  //     console.log("表單資料:", values);
  //     // values.is_enabled 會是 true 或 false
  //   };
  return (
    <div>
      <Modal
        open={isModalOpen}
        title="編輯表單"
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        // 增加 body 頂部的間距，標題與表單就不會貼在一起
        styles={{ body: { paddingTop: "24px" } }}
      >
        <Form
          onFinish={handleSave}
          form={form}
          initialValues={{ is_enabled: true }} // 在這裡統一設定預設值
        >
          <Form.Item name="stock_no" label="股票代碼">
            <Input />
          </Form.Item>
          <Form.Item
            label="啟用狀態"
            name="is_enabled"
            valuePropName="checked" // 關鍵：告訴 Form 這裡要對應的是 checked 屬性而非 value
          >
            <Switch
              checkedChildren="啟用"
              unCheckedChildren="停用"
              defaultChecked
            />
          </Form.Item>
          {/* 在這裡加入一條線，調整上下 margin 讓它美觀 */}
          <Divider
            style={{
              margin: "24px 0",
              borderColor: "#7cb305",
              // 改為自定義顏色 (例如綠色)
              // 增加粗細 (預設是 1px)
              borderWidth: "2px",
            }}
          />
          <Form.Item style={{ marginBottom: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                刪除
              </Button>
              <Button type="primary" htmlType="submit">
                儲存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
