import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import EditForm from "./EditForm";
import { Button, Tag, Form } from "antd";
import { EditOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, originalData, saveData, deleteData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [query, setQuery] = useState("");

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

  const handleQuery = (query) => {
    console.log(query);
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
    {
      title: "股票名稱",
      dataIndex: "stock_name",
    },
  ];

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => handleQuery(query)}>查詢</button>
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
