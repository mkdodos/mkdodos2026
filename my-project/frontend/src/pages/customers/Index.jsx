import React, { useState, useMemo } from "react";
import { Button, Input, Table } from "antd";
import { useCustomers } from "./useCustomers";

function Index() {
  const { data, saveItem, deleteItem } = useCustomers();
  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "ID", dataIndex: "cust_id", width: 80 },
    { title: "客戶名稱", dataIndex: "cust_name", width: 100 },
    { title: "電話", dataIndex: "tel" },
  ];
  const [searchText, setSearchText] = useState(""); // 記錄輸入框的內容
  const [queryText, setQueryText] = useState(""); // 記錄按下按鈕後的關鍵字
  // const filteredData = useMemo(() => {
  //   const trimSearch = searchText.trim().toLowerCase(); // 去除前後空格並轉小寫
  //   if (!trimSearch) return data; // 如果沒輸入，直接回傳原資料
  //   return data.filter((obj) =>
  //     obj.cust_name?.toLowerCase().includes(trimSearch),
  //   );
  // }, [data, searchText]);

  // 只有當 queryText 或原始 data 改變時，才會重新過濾
  const filteredData = useMemo(() => {
    if (!queryText) return data;
    return data.filter((obj) =>
      obj.cust_name?.toLowerCase().includes(queryText.toLowerCase()),
    );
  }, [data, queryText]);

  // 按鈕點擊事件
  const handleSearch = () => {
    setQueryText(searchText); // 把目前的輸入內容同步到過濾條件中
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <Input
          style={{ width: 300 }}
          onChange={(e) => setSearchText(e.target.value)} // 更新關鍵字
          // 支援按下 Enter 鍵也能查詢
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch}>
          查詢
        </Button>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={false} // 這裡設為 false 即可關閉
        // 設定每頁筆數
        // pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default Index;
