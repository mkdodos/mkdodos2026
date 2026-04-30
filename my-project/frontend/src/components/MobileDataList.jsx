import React from "react";
import { Card, Descriptions, Tag, Typography, Space, Flex } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";

const MobileDataCards = ({ dataSource }) => {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        // minHeight: "100vh",
      }}
    >
      {/* 使用 Flex 代替 List，設定垂直排列 (vertical) 與間距 (gap) */}
      <Flex vertical gap="middle">
        {dataSource.map((item) => (
          <Card
            key={item.id}
            bordered={false}
            title={
              <Space>
                <UserOutlined style={{ color: "#1677ff" }} />
                <Typography.Text strong>{item.item_name}</Typography.Text>
              </Space>
            }
            extra={<Tag color="blue">{item.status || "正常"}</Tag>}
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Descriptions column={1} size="small" colon={false}>
              <Descriptions.Item
                label={<PhoneOutlined style={{ color: "#8c8c8c" }} />}
              >
                {item.category || "無電話資訊"}
              </Descriptions.Item>
              <Descriptions.Item
                label={<HomeOutlined style={{ color: "#8c8c8c" }} />}
              >
                {item.box_name || "無地址資訊"}
              </Descriptions.Item>
            </Descriptions>

            <div
              style={{
                marginTop: 12,
                textAlign: "right",
                borderTop: "1px solid #f0f0f0",
                paddingTop: 8,
                fontSize: "12px",
                color: "#bfbfbf",
              }}
            >
              最後更新：{item.updatedAt || "2026-04-30"}
            </div>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default MobileDataCards;
