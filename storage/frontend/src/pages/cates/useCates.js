import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const API_BASE = "http://192.168.0.10:3000/api/cates";

export const useCates = () => {
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
  const saveItem = async (values) => {
    const response = await axios.post(API_BASE, values);
    const newData = { id: response.data.id, ...values };
    setData((prev) => [newData, ...prev]);
    message.success("新增成功");

    return true;
  };

  useEffect(() => {
    getData();
    // console.log("ddd");
  }, []);

  return {
    data,
    saveItem,
    // getData,
  };
};
