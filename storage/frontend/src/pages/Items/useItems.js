import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const API_BASE = "http://192.168.0.10:3000/api/items";

export const useItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [boxes, setBoxes] = useState([]); // 新增：存放 boxes 清單

  // 取得所有盒子
  const getBoxes = async () => {
    try {
      // 假設你的 API 路徑是這個
      const response = await axios.get("http://192.168.0.10:3000/api/boxes");
      setBoxes(response.data.data); // 格式可能是 [{ id: 1, name: 'Box A' }, ...]
    } catch (error) {
      console.error("無法取得盒子清單", error);
    }
  };

  // 1. 取得資料
  const getItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setData(response.data.data);
    } catch (error) {
      message.error("無法取得資料");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
    getBoxes(); // 初始化時一起抓取
  }, []);

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

  // 3. 儲存資料 (新增或編輯)
  // 利用 confirmLoading 讓 Modal 的確定按鈕進入轉圈狀態
  const saveItem = async (values, editingId) => {
    // 找出對應的盒子物件，以便獲取它的名稱
    const selectedBox = boxes.find((b) => b.id === values.box_id);
    const boxName = selectedBox ? selectedBox.name : "";
    console.log(boxName);

    setConfirmLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, values);
        setData((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? { ...item, ...values, box_name: boxName }
              : item,
          ),
        );
        message.success("更新成功");
      } else {
        const response = await axios.post(API_BASE, values);
        const newData = { id: response.data.id, ...values, box_name: boxName };
        setData((prev) => [newData, ...prev]);
        message.success("新增成功");
      }
      return true;
    } catch (error) {
      message.error("儲存失敗");
      return false;
    } finally {
      setConfirmLoading(false);
    }
  };

  return { data, boxes, loading, confirmLoading, deleteItem, saveItem };
};
