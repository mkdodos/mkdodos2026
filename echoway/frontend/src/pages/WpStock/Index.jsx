import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import EditForm from "./EditForm";
import { Button, Tag, Form, Input, Space } from "antd";
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, saveData, deleteData, setData, originalData } = useData();
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
      title: "parent_id",
      dataIndex: "parent_id",
    },
    {
      title: "sn",
      dataIndex: "sn",
    },
    {
      title: "od",
      dataIndex: "od",
      render: (value) => Number(value),
      // render: (value) => (value != null ? parseFloat(value) : ""),
      // render: (value) => (value != null ? Number(value) : ""),
    },
    {
      title: "len",
      dataIndex: "len",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "demand_id",
      dataIndex: "demand_id",
    },
    {
      title: "old_id",
      dataIndex: "old_id",
    },
  ];

  const [params, setParams] = useState({ od: "", sn: "" });

  const handleSearch = () => {
    console.log(params);
    const filtered = originalData.filter((item) => {
      const matchOd = params.od === "" || Number(item.od) === Number(params.od);
      const matchSn = params.sn === "" || item.sn.includes(params.sn.trim());
      return matchOd && matchSn;
    });
    setData(filtered);
  };

  return (
    <div>
      <Space>
        {/* <Input onChange={(e) => setQuery(e.target.value)} /> */}
        <Input
          placeholder="od"
          onChange={(e) => {
            setParams({ ...params, od: e.target.value });
          }}
        />

        <Input
          placeholder="sn"
          onChange={(e) => setParams({ ...params, sn: e.target.value })}
        />

        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={() => handleSearch()}
        >
          查詢
        </Button>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          // style={{
          //   backgroundColor: "#52c41a",
          //   color: "#fff",
          //   borderColor: "#52c41a",
          // }}
          onClick={handleAdd}
          ghost
        >
          新增
        </Button>
      </Space>
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
