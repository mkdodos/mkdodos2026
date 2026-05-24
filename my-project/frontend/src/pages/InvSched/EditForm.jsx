import React from "react";
import {
  Modal,
  Form,
  Input,
  Switch,
  Button,
  Space,
  Divider,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function EditForm({
  isModalOpen,
  setIsModalOpen,
  form,
  handleSave,
  handleDelete,
  dataTask,
}) {
  const options = dataTask.map((item) => ({
    label: `${item.stock_no} ${item.stock_name}`, // 顯示 0050 元大台灣50
    value: item.id, // 選中後的值
    key: item.id, // React 需要的唯一 key
  }));

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
          <Form.Item name="task_id" label="主表id">
            <Select
              showSearch // 開啟搜尋功能
              allowClear // 允許清除選取
              style={{ width: 300 }}
              placeholder="請選擇或搜尋股票"
              optionFilterProp="label" // 搜尋時根據 label 內容篩選
              // onChange={handleChange}
              options={options}
              // 如果資料量很大，可以加上過濾邏輯
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
            {/* <Input /> */}
          </Form.Item>
          <Form.Item name="buy_day" label="購買日">
            <Input />
          </Form.Item>
          <Form.Item name="amt" label="金額">
            <Input />
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
