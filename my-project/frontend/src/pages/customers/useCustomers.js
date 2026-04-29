import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const API_BASE = "http://192.168.0.10:3000/api/customers";

export const useCustomers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  //  取得資料
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setData(response.data.data);
      //   setData(["d"]);
      console.log(response.data);
    } catch (error) {
      message.error("無法取得資料");
    } finally {
      setLoading(false);
    }
  };

  // 3. 儲存資料 (新增或編輯)
  // 利用 confirmLoading 讓 Modal 的確定按鈕進入轉圈狀態
  const saveItem = async (values, editingId) => {
    // console.log(values);
    if (editingId) {
      await axios.put(`${API_BASE}/${editingId}`, values);
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...values } : item,
        ),
      );
      message.success("更新成功");
    } else {
      const response = await axios.post(API_BASE, values);
      const newData = { id: response.data.id, ...values };
      setData((prev) => [newData, ...prev]);
      message.success("新增成功");
    }

    return true;
  };

  // 2. 刪除資料
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
      message.success("刪除成功");
      return true; // 回傳成功狀態，方便 UI 決定是否關閉 Modal
    } catch (error) {
      message.error("刪除失敗");
      return false;
    }
  };

  useEffect(() => {
    getData();
    // console.log("ddd");
  }, []);

  return {
    data,
    saveItem,
    deleteItem,
    // getData,
  };
};
