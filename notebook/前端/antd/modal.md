編輯表單
```javascript
<Modal
	title="需求編輯表單"
	closable={{ "aria-label": "Custom Close Button" }}
	open={isModalOpen}
	onOk={handleOk}
	onCancel={handleCancel}
	// 不顯示ok cancel 鈕
	footer={null}
>     
    ...內容...      
</Modal>
```


```jsx
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
```

官方範例
```javascript
import React, { useState } from "react";
import { Button, Modal } from "antd";
const EditForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default EditForm;

```