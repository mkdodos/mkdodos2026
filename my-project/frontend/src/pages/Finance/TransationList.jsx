import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Typography, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios"; // 引入 axios
import dayjs from "dayjs";

const { Title } = Typography;

const TransactionList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 使用 axios 請求，不需要寫完整的 http://localhost:3001 (需配合 proxy)
        const response = await axios.get(
          "http://192.168.0.10:3000/api/stocks/transactions",
        );

        // axios 會把結果放在 .data 屬性中
        setData(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error("Axios 抓取失敗:", err);
        // 這裡可以幫你抓出為何回傳 HTML (如果是 404 代表路徑錯了)
        message.error(`載入失敗: ${err.response?.status || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "交易日期",
      dataIndex: "trade_date",
      key: "trade_date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.trade_date).unix() - dayjs(b.trade_date).unix(),
    },
    {
      title: "股票代碼",
      dataIndex: "stock_id",
      key: "stock_id",
    },
    {
      title: "類別",
      dataIndex: "side",
      render: (side) => (
        <Tag color={side === "B" ? "volcano" : "cyan"}>
          {side === "B" ? "買入" : "賣出"}
        </Tag>
      ),
    },
    {
      title: "股數",
      dataIndex: "quantity",
      align: "right",
      render: (val) => val.toLocaleString(),
    },
    {
      title: "單價",
      dataIndex: "price",
      align: "right",
      render: (val) => `$${val}`,
    },
    {
      title: "小計",
      align: "right",
      render: (_, record) => {
        const isBuy = record.side === "B";
        const total = Math.round(record.quantity * record.price);
        return (
          <span
            style={{ color: isBuy ? "#cf1322" : "#3f9142", fontWeight: "bold" }}
          >
            {isBuy ? "-" : "+"}
            {total.toLocaleString()}
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Title level={3}>交易流水帳</Title>
          <Link to="/transactions/new">
            <Button type="primary" icon={<PlusOutlined />}>
              新增交易
            </Button>
          </Link>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default TransactionList;
