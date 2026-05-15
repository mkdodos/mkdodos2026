import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const useData = () => {
  const [data, setData] = useState([]);
  const API_BASE = "/api/wp-demand";
  const getData = async () => {
    const response = await axios.get(API_BASE);
    setData(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const saveData = async (values, editingId) => {
    if (editingId) {
      await axios.put(`${API_BASE}/${editingId}`, values);
      //   console.log(editingId);
    } else {
      const response = await axios.post(API_BASE, values);
      console.log(response.data.data.id);
    }
  };

  const deleteData = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success("刪除成功");
    return true; // 回傳成功狀態，方便 UI 決定是否關閉 Modal
    //   console.log(editingId);
  };

  return { data, saveData, deleteData };
};
