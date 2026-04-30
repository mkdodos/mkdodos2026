import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Typography,
  Popconfirm,
  message,
  Button,
  Space,
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { EditableCell } from "./EditableCell"; // 從你存放的地方引入

const EditableTable = ({ apiEndpoint, columnsConfig }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  // 1. 初始化讀取資料
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(apiEndpoint);
      setData(res.data.data);
    } catch (err) {
      message.error("獲取資料失敗");
    }
  };

  // 判斷是否正在編輯
  const isEditing = (record) => record.id === editingKey;

  const handleAdd = () => {
    // 如果已經在編輯中，不允許新增 (可選)
    if (editingKey !== "") {
      message.warning("請先儲存當前編輯中的資料");
      return;
    }

    const newData = {
      id: "new_temp_id", // 臨時 ID
      name: "", // 根據你的欄位初始化空值
      age: "",
      address: "",
    };

    // 將新資料放到陣列最前面
    setData([newData, ...data]);

    // 開啟編輯模式
    form.setFieldsValue({ ...newData });
    setEditingKey(newData.id);
  };

  const edit = (record) => {
    // console.log(record.key);
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  // 修改取消邏輯：如果是取消新增，要把那筆空白資料移除
  const cancel = () => {
    if (editingKey === "new_temp_id") {
      setData(data.filter((item) => item.id !== "new_temp_id"));
    }
    setEditingKey("");
  };

  // 2. 儲存更新至後端
  // 修改儲存邏輯以支援「新增」與「更新」
  const save = async (id) => {
    console.log(id);
    // return;
    try {
      const row = await form.validateFields();
      const hide = message.loading("正在處理中...", 0);

      let finalItem;

      if (id === "new_temp_id") {
        // --- 情況 A：新增資料 ---
        const res = await axios.post(apiEndpoint, row);
        const serverData = res.data.data || res.data;
        // const realId = serverData.id || serverData.ID || serverData._id;
        const realId = res.data.id;

        finalItem = { ...row, ...serverData, id: realId };
        message.success("新增成功");
        console.log(realId);
      } else {
        // --- 情況 B：更新現有資料 ---
        // 通常更新 API 會是 PUT /api/endpoint/:id
        const res = await axios.put(`${apiEndpoint}/${id}`, row);
        const serverData = res.data.data || res.data;

        // 更新時，我們保留原始 id，並合併表單新值與後端回傳值
        finalItem = { id, ...row, ...serverData };
        message.success("更新成功");
      }

      // 統一更新狀態
      setData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => item.id === id);
        if (index > -1) {
          newData.splice(index, 1, finalItem);
        }
        return newData;
      });

      setEditingKey("");
      hide();
    } catch (err) {
      message.destroy();
      console.error("儲存失敗:", err);
      message.error("儲存失敗，請檢查欄位或網路");
    }
  };
  const handleDelete = async (id) => {
    // 防呆：如果 id 還是臨時 ID，代表 save 可能還沒跑完或失敗了
    if (id === "new_temp_id") {
      message.error("資料尚未同步完成，請稍後再試");
      return;
    }

    try {
      console.log("正在刪除 ID:", id); // 確認這個 ID 是不是後端給的真實 ID
      await axios.delete(`${apiEndpoint}/${id}`);

      // 使用「函式型更新」確保拿到的 prevData 是最新的狀態
      setData((prevData) => {
        const filtered = prevData.filter((item) => item.id !== id);
        return filtered;
      });

      message.success("刪除成功");
    } catch (err) {
      console.error("刪除失敗:", err);
      message.error("刪除失敗");
    }
  };

  // 合併自定義欄位與編輯邏輯
  const mergedColumns = columnsConfig.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // 加入「操作」欄位
  const columnsWithActions = [
    ...mergedColumns,
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              儲存
            </Typography.Link>
            {/* 修改處：移除 Popconfirm，直接綁定 onClick */}
            <a
              onClick={cancel}
              style={{ color: "#8c8c8c" }} // Ant Design 預設中性灰色
            >
              取消
            </a>
            {/* <Popconfirm title="確定取消？" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm> */}
          </Space>
        ) : (
          <Space size="middle">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              編輯
            </Typography.Link>
            {/* 加入刪除按鈕 */}
            <Popconfirm
              title="確定要刪除這筆資料嗎？"
              onConfirm={() => handleDelete(record.id)} // 呼叫刪除函式
              okText="確定"
              cancelText="取消"
            >
              <Typography.Link type="danger" disabled={editingKey !== ""}>
                刪除
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        disabled={editingKey !== ""} // 編輯時禁用新增
      >
        新增一列
      </Button>
      <Form form={form} component={false}>
        <Table
          rowKey="id"
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={data}
          columns={columnsWithActions}
          rowClassName="editable-row"
          pagination={{ onChange: cancel }}
        />
      </Form>
    </div>
  );
};

export default EditableTable;
