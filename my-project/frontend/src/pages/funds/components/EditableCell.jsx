import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Form, Input, InputNumber, DatePicker, Select } from "antd";

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
  stocks = [],
  ...restProps
}) => {
  // console.log("型別是:", typeof record[dataIndex]);
  // const stocks = [{ stock_no: "123", stock_name: "測試" }];
  // 根據欄位名稱呈現不同輸入項
  const inputMap = {
    fund_id: (
      <Select
        showSearch
        placeholder="輸入代號或名稱搜尋"
        optionFilterProp="children"
        // 設定搜尋邏輯：同時比對代號與名稱
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        // 將資料轉換為 Select 要求的 label / value 格式
        options={stocks.map((s) => ({
          value: String(s.id), // 資料庫 PK
          label: `${s.stock_no} ${s.stock_name}`, // 顯示給使用者看
        }))}
      />
    ),
    side: (
      <Select style={{ width: "100%" }}>
        <Option value="B">買入</Option>
        <Option value="S">賣出</Option>
      </Select>
    ),
    trade_date: <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />,
  };

  const inputNode = inputMap[dataIndex] || <Input />;

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
          {...(dataIndex === "trade_date"
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
