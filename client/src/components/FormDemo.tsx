import React, { useState } from "react";
import { Button, Form, Input, Card, Flex, message } from "antd";
import { PlusSquareFilled } from "@ant-design/icons";
import axios from "axios"; // 記得先 npm install axios

interface StockFormValues {
  stockId: string;
  stockName: string;
}

const App: React.FC = () => {
  const [form] = Form.useForm<StockFormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: StockFormValues) => {
    setLoading(true); // 開始載入動畫
    try {
      // 呼叫後端 API 接口
      console.log(values);
      const response = await axios.post("/api/stocks", values);

      if (response.status === 200 || response.status === 201) {
        message.success("資料已成功存入資料庫！");
        form.resetFields(); // 儲存成功後清空表單
      }
    } catch (error) {
      console.error("儲存失敗:", error);
      message.error("連線失敗，請檢查後端服務是否開啟");
    } finally {
      setLoading(false); // 結束載入動畫
    }
  };

  return (
    <Card title="新增股務資料" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="股票代碼"
          name="stock_id"
          rules={[{ required: true }]}
        >
          <Input placeholder="輸入代碼" />
        </Form.Item>
        <Form.Item
          label="股票名稱"
          name="stock_name"
          rules={[{ required: true }]}
        >
          <Input placeholder="輸入名稱" />
        </Form.Item>
        <Form.Item
          label="價格"
          name="current_price"
          rules={[{ required: true }]}
        >
          <Input placeholder="輸入價格" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            color="cyan"
            variant="solid"
            htmlType="submit"
            loading={loading} // 當按鈕點擊後會轉圈圈，防止重複提交
            block
          >
            <Flex align="center" gap={8} justify="center">
              <PlusSquareFilled style={{ fontSize: "18px" }} />
              <span style={{ fontWeight: "bold" }}>新增至資料庫</span>
            </Flex>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default App;
