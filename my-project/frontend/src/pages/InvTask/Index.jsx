import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import TableViewDetail from "./TableViewDetail";
import EditForm from "./EditForm";
import { Button, Tag, Form, Select, Space } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, saveData, deleteData, stocks, dataDetail, getDetail } =
    useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form] = Form.useForm();

  // console.log(stocks);
  // const stockData = [
  //   /* 你的 JSON 資料 */
  // ];

  const stockOptions = stocks.map((item) => ({
    label: `${item.stock_no} ${item.stock_name}`, // 顯示 0050 元大台灣50
    value: item.stock_no, // 選中後的值
    key: item.id, // React 需要的唯一 key
  }));

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

  const handleShowDetail = (record) => {
    getDetail(record.id);
    // setIsModalOpen(true);
    // form.setFieldsValue(record);
    // setEditingId(record.id);
  };

  const detailColumns = [
    { title: "購買日", dataIndex: "buy_day" },
    { title: "金額", dataIndex: "amt" },
  ];
  const columns = [
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="text"
          />
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleShowDetail(record)}
            type="text"
          />
        </Space>
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
      title: "stock_name",
      dataIndex: "stock_name",
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
      <Button onClick={handleAdd}>新增</Button>
      <EditForm
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
        handleDelete={handleDelete}
        stockOptions={stockOptions}
      />
      <TableView handleEdit={handleEdit} data={data} columns={columns} />
      <TableViewDetail data={dataDetail} columns={detailColumns} />
    </div>
  );
}

export default Index;
