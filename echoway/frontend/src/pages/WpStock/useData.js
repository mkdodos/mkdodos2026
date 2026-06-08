// useData.js
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const useData = () => {
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  // 修改路徑
  const API_BASE = "/api/wp-stock";

  const getData = async () => {
    const response = await axios.get(API_BASE);

    const formatted = response.data.data.map((item) => ({
      ...item,
      od: parseFloat(item.od), // 將 len 欄位去除 .00
    }));

    setData(formatted);
    setOriginalData(formatted);
  };

  useEffect(() => {
    getData();
  }, []);

  const viewDetail = async (editingId) => {
    const response = await axios.get(`${API_BASE}/family-tree`);
    setDataDetail(response.data.data);
    console.log(response.data.data);
  };

  const saveData = async (values, editingId) => {
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
      const newData = { id: response.data.data.id, ...values };
      setData((prev) => [newData, ...prev]);
      message.success("新增成功");
    }
  };

  const deleteData = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success("刪除成功");
    return true; // 回傳成功狀態，方便 UI 決定是否關閉 Modal
  };

  return {
    data,
    saveData,
    deleteData,
    originalData,
    setData,
    viewDetail,
    dataDetail,
  };
};
