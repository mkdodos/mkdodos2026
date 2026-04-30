import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Button,
  Space,
  Divider,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useCates } from "../cates/useCates";

const ItemModal = ({
  open,
  editingId,
  onCancel,
  onOk,
  onDelete,
  confirmLoading,
  form,
  boxes, // 從 props 接收 boxes 清單
}) => {
  const boxOptions = boxes.map((box) => ({
    // 這裡決定選單內看到的文字樣式
    label: `${box.name || ""}`,
    value: box.id,
  }));

  // 取得所有類別
  const { data: cates } = useCates();

  const cateOptions = cates.map((obj) => ({
    label: `${obj.cate_name || ""}`,
    value: obj.cate_name,
  }));

  // console.log(cates);

  return (
    <Modal
      title={editingId ? "編輯項目" : "新增項目"}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      forceRender // 確保 Form 實例能連線
      styles={{ body: { paddingBottom: "1px" } }}
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
                onConfirm={() => onDelete(editingId)}
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<DeleteOutlined />}>
                  刪除
                </Button>
              </Popconfirm>
            )}
          </div>
          <Space>
            {/* <Button onClick={onCancel}>取消</Button> */}
            <Button type="primary" onClick={onOk} loading={confirmLoading}>
              儲存
            </Button>
          </Space>
        </div>
      }
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="box_id"
          label="選擇盒子"
          rules={[{ required: true, message: "請選擇一個盒子" }]}
        >
          <Select
            placeholder="請選擇盒編號"
            // 將搜尋設定寫在 showSearch 物件中
            showSearch={{
              optionFilterProp: "label", // 指定搜尋 options 裡的 label 欄位
            }}
            options={boxOptions}
          ></Select>
        </Form.Item>

        <Form.Item
          name="item_name"
          label="項目名稱"
          rules={[{ required: true, message: "請輸入名稱" }]}
        >
          <Input placeholder="例如：心情" />
        </Form.Item>
        {/* <Form.Item name="category" label="類別">
          <Input placeholder="例如：情緒" />
        </Form.Item> */}
        <Form.Item name="category" label="類別下拉">
          <Select options={cateOptions}></Select>
        </Form.Item>
      </Form>
      <Divider style={{ margin: "24px 0 0 0", borderColor: "#d9d9d9" }} />
    </Modal>
  );
};

export default ItemModal;
