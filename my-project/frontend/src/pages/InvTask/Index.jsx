import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import EditForm from "./EditForm";
import { Button, Tag, Form } from "antd";
import { EditOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, saveData, deleteData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  // values : 表單中輸入項的值
  // const handleSave = async (values) => {
  //   await saveData(values, editingId);
  // };

  // const handleDelete = async () => {
  //   await deleteData(editingId);
  // };

  const handleEdit = (record) => {
    setIsModalOpen(true);
    form.setFieldsValue(record);
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
      title: "stock_no",
      dataIndex: "stock_no",
    },
    // React 不會直接渲染 true 或 false 到 DOM 中
    // 需在 render 處理
    {
      title: "is_enabled",
      dataIndex: "is_enabled",
      render: (enabled) => (
        <Tag color={enabled ? "green" : "red"}>{enabled ? "啟用" : "停用"}</Tag>
      ),
    },
  ];

  return (
    <div>
      <EditForm
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <TableView handleEdit={handleEdit} data={data} columns={columns} />
    </div>
  );
}

export default Index;
