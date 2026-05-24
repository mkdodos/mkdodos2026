import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import EditForm from "./EditForm";
import { Button, Tag, Form, Calendar, Badge, Space } from "antd";
import { EditOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, saveData, deleteData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form] = Form.useForm();

  // const cellRender = (current) => {
  //   const date = current.date();
  //   const rows = data.filter((obj) => obj.buy_day === date);

  //   return (
  //     <Space direction="vertical" size={2} style={{ width: "100%" }}>
  //       {rows.map((row, index) => (
  //         <Badge status="processing" text={Number(row.amt)} />
  //       ))}
  //     </Space>
  //   );
  // };

  const dateFullCellRender = (current) => {
    const date = current.date();
    // const dayTasks = dataMap.get(date) || [];

    const dayTasks = data.filter((obj) => obj.buy_day === date);

    return (
      <div
        style={{
          height: "120px",
          border: "1px solid #f0f0f0", // 自己畫格線
          padding: "4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 自己畫日期，想放哪就放哪 */}
        <div style={{ fontWeight: "bold", textAlign: "left" }}>{date}</div>

        {/* 投資項目 */}
        <div style={{ overflowY: "auto", flex: 1, textAlign: "left" }}>
          <Space direction="vertical" size={2} style={{ width: "100%" }}>
            {dayTasks.map((task) => (
              <Badge
                key={task.id}
                status="success"
                text={`${task.stock_name}  $${Number(task.amt)}`}
                size="small"
              />
            ))}
          </Space>
        </div>
      </div>
    );
  };

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
      <Calendar
        // cellRender={cellRender}
        dateFullCellRender={dateFullCellRender}
      />
      <TableView handleEdit={handleEdit} data={data} columns={columns} />
    </div>
  );
}

export default Index;
