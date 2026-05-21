import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import EditForm from "./EditForm";
import { Button, Tag, Form } from "antd";
import { EditOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, saveData, deleteData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form] = Form.useForm();

  // values : 表單中輸入項的值
  const handleSave = async (values) => {
    console.log(values);
    // console.log(editingId);
    await saveData(values, editingId);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteData(editingId);
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
    // 呼叫 form.resetFields() 後，所有的欄位會回到 initialValues 設定的狀態
    form.resetFields();
    // form.setFieldsValue({
    //   is_enabled: true, // 手動指定 Switch 的值
    // });
    setEditingId(null);
  };

  const handleEdit = (record) => {
    setIsModalOpen(true);
    form.setFieldsValue(record);
    setEditingId(record.id);
  };

  const columns = [
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="text"
        />
      ),
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "task_id",
      dataIndex: "task_id",
    },
    {
      title: "buy_day",
      dataIndex: "buy_day",
    },
    {
      title: "amt",
      dataIndex: "amt",
    },
    // React 不會直接渲染 true 或 false 到 DOM 中
    // 需在 render 處理
    // {
    //   title: "is_enabled",
    //   dataIndex: "is_enabled",
    //   render: (enabled) => (
    //     <Tag color={enabled ? "green" : "red"}>{enabled ? "啟用" : "停用"}</Tag>
    //   ),
    // },
  ];

  return (
    <div>
      <Button onClick={handleAdd}>新增</Button>
      <EditForm
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <TableView handleEdit={handleEdit} data={data} columns={columns} />
    </div>
  );
}

export default Index;
