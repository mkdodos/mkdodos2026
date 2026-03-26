import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import type { TableProps } from "antd";
import { ConfigProvider } from "antd";
import dayjs from "dayjs"; // 建議安裝 dayjs 處理時間格式

// 1. 根據您的 JSON 格式定義 Interface
interface StockRecord {
  id: string;
  stock_symbol: string;
  stock_name: string;
  current_price: string;
  created_at: string;
  updated_at: string;
}

const StockTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<StockRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 2. 設定表格欄位
  const columns: TableProps<StockRecord>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "代號",
      dataIndex: "stock_symbol",
      key: "stock_symbol",
      sorter: (a, b) => a.stock_symbol.localeCompare(b.stock_symbol),
    },
    {
      title: "股票名稱",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "當前價格",
      dataIndex: "current_price",
      key: "current_price",
      align: "right", // 數值建議靠右對齊
      render: (price) => `$${parseFloat(price).toLocaleString()}`, // 格式化千分位
    },
    {
      title: "更新時間",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => console.log("查看詳情", record.id)}>
          詳情
        </Button>
      ),
    },
  ];

  // 3. 取得資料邏輯
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stocks"); // 替換為您的 API 路徑
      const result = await response.json();

      if (result.success) {
        // 重要：因為資料在 result.data 裡面
        setDataSource(result.data);
      } else {
        message.error("資料讀取失敗");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("無法連線至伺服器");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  async function deleteTodo(id: number) {
    const response = await fetch(`/api/stocks/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    console.log("刪除結果:", result.message);
  }

  return (
    // <Card title="股票資產追蹤">
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#f0f5ff",
              headerColor: "#003a8c",
              borderColor: "#8c8c8c",
            },
          },
        }}
      >
        <Button type="link" onClick={() => deleteTodo(1)}>
          詳情
        </Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id" // 使用 JSON 中的 id 作為唯一 Key
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </ConfigProvider>
    </>
    // </Card>
  );
};

export default StockTable;
