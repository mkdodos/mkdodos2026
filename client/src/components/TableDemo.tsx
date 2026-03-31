import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm, Space, Flex } from "antd";
import type { TableProps } from "antd";
import { ConfigProvider } from "antd";
import {
  SearchOutlined,
  SettingOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";

// 1. 定義資料與 API 回傳結構
interface StockRecord {
  id: string;
  stock_symbol: string;
  stock_name: string;
  current_price: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 2. 定義新增時不需要 ID 的型別
// type CreateStockInput = Omit<StockRecord, "id" | "updated_at">;

const StockTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<StockRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [form] = Form.useForm<CreateStockInput>();

  // --- API 邏輯 ---

  // 【READ】
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stocks");
      const result: ApiResponse<StockRecord[]> = await response.json();
      if (result.success) {
        setDataSource(result.data);
      }
    } catch (error) {
      message.error("無法連線至伺服器");
    } finally {
      setLoading(false);
    }
  };

  // 【CREATE】新增語法
  const handleAdd = async (current_price: string, stock_name: string) => {
    // 準備要新增的資料物件 (配合你之前的 Interface)

    try {
      const response = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(values),
        body: JSON.stringify({ stock_id: "111", current_price, stock_name }),
      });

      const result = await response.json();

      if (result.success) {
        message.success("新增成功");
        // setIsModalOpen(false);
        // form.resetFields();
        fetchStocks(); // 呼叫你原本的重新整理函式
      }
    } catch (error) {
      message.error("網路連線失敗");
    }
  };
  // 【DELETE】
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/stocks/${id}`, { method: "DELETE" });
      const result: ApiResponse<null> = await response.json();

      if (result.success) {
        message.success("刪除成功");
        // 本地前端同步更新，免去重新 reload 的閃爍
        setDataSource((prev) => prev.filter((item) => item.id !== id));
      } else {
        message.error(result.message || "刪除失敗");
      }
    } catch (error) {
      message.error("刪除時發生錯誤");
    }
  };

  // 【UPDATE】範例：假設更新價格
  const handleUpdatePrice = async (
    id: string,
    newPrice: string,
    stock_name: string,
  ) => {
    try {
      const response = await fetch(`/api/stocks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_price: newPrice, stock_name }),
      });
      const result: ApiResponse<StockRecord> = await response.json();

      if (result.success) {
        message.success("更新成功");
        fetchStocks(); // 重新整理資料
      }
    } catch (error) {
      message.error("更新失敗");
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // 2. 設定表格欄位
  const columns: TableProps<StockRecord>["columns"] = [
    { title: "ID", dataIndex: "id" },
    { title: "代號", dataIndex: "stock_symbol", key: "stock_symbol" },
    { title: "股票名稱", dataIndex: "stock_name", key: "stock_name" },
    {
      title: "當前價格",
      dataIndex: "current_price",
      align: "right",
      render: (price) => `$${parseFloat(price).toLocaleString()}`,
    },
    {
      title: "更新時間",
      dataIndex: "updated_at",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => handleUpdatePrice(record.id, "30", "仁寶")}
          >
            設為$100
          </Button>
          <Popconfirm
            title="確定要刪除嗎？"
            onConfirm={() => handleDelete(record.id)}
            okText="確定"
            cancelText="取消"
          >
            <Button type="link" danger>
              刪除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
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
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Space size={16}>
            {/* 圓形按鈕 */}
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            {/* 圓角矩形按鈕 */}
            <Button icon={<SettingOutlined />}>設定</Button>
            <Button
              type="default"
              onClick={fetchStocks}
              icon={<SearchOutlined />}
            >
              重整資料
            </Button>
            <Button
              color="cyan"
              variant="solid"
              onClick={() => handleAdd("2550", "我的2550股")}
            >
              <Flex align="center" gap="small">
                <PlusSquareFilled style={{ fontSize: "20px" }} />
                <span>新增資料</span>
              </Flex>
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          // pagination={{ pageSize: 5 }}
        />
      </div>
    </ConfigProvider>
  );
};

export default StockTable;
