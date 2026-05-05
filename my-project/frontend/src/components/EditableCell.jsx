import React from "react";
import dayjs from "dayjs";
import { Form, Input, InputNumber, DatePicker } from "antd";

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
  // 根據 dataIndex 或自定義屬性判斷要用哪種輸入元件
  let inputNode = <Input />;

  // 加上 ?. 確保 dataIndex 存在才執行 toLowerCase()
  const isDateField = dataIndex?.toLowerCase()?.includes("date");
  const isAgeField = dataIndex === "age";

  if (isAgeField) {
    inputNode = <InputNumber />;
  } else if (isDateField) {
    inputNode = <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />;
  }
  // const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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
          // --- 關鍵修復：格式轉換 ---
          {...(isDateField
            ? {
                // 當資料從 Form 傳給 DatePicker 時：將字串轉為 dayjs 物件
                getValueProps: (value) => ({
                  value: value ? dayjs(value) : undefined,
                }),
                // 當使用者選完日期存回 Form 時：將 dayjs 物件轉回字串
                normalize: (value) => (value ? value.format("YYYY-MM-DD") : ""),
              }
            : {})}
          // -----------------------
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
