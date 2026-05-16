import React, { useState } from "react";
import { Button, Modal, Checkbox, Form, Input, message, Space } from "antd";
import axios from "axios";
const EditForm = ({
  isModalOpen,
  setIsModalOpen,
  handleSave,
  setData,
  handleCancel,
  form,
  handleDelete,
}) => {
  // 儲存資料 (新增)

  //   const saveItem = async (values) => {
  //     const response = await axios.post(API_BASE, values);
  //     const newData = { id: response.data.id, ...values };
  //     setData((prev) => [newData, ...prev]);
  //     message.success("新增成功");
  //   };

  //   const API_BASE = "/api/wp-demand";

  //   const onFinish = (values) => {
  //     // 表單中輸入項的值
  //     console.log(values);
  //     setIsModalOpen(false);
  //   };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="需求編輯表單"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        // 不顯示ok cancel 鈕
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: "100%", marginTop: "24px" }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSave}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="訂單編號"
            name="order_no"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="外徑"
            name="od"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="長度"
            name="len"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="數量" name="qty">
            <Input />
          </Form.Item>

          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" danger onClick={handleDelete}>
              刪除
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
export default EditForm;
