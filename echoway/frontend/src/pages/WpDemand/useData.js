import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
const API_BASE = "/api/wp-demand";

// const API_BASE = "http://192.168.0.10:3001/api/wp-demand";

export const useData = () => {
  const [data, setData] = useState([]);
  const [dataFit, setDataFit] = useState([]);

  const getData = async () => {
    const response = await axios.get(API_BASE);
    setData(response.data.data);
    console.log(API_BASE);
    // console.log(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const runBFD = async (record) => {
    // console.log(record);
    // const url = `${API_BASE}/stock-fit?len=680&od=60.7`;
    const url = `${API_BASE}/stock-fit`;
    const { od, len } = record;
    const response = await axios.get(url, { params: { od, len } });
    // console.log(url);
    console.log(response.data.data);
    setDataFit(response.data.data);
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

  return { data, saveData, deleteData, runBFD, dataFit };
};
