import React from "react";
import { Form, Input, InputNumber } from "antd";

// 這就是你需要「引入」的組件內容
export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  required,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          // 根據傳入的屬性動態決定規則
          rules={
            required ? [{ required: true, message: `請輸入 ${title}!` }] : []
          }
          // rules={[{ required: true, message: `請輸入 ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
