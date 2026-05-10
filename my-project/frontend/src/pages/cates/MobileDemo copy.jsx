import { List, Tag, Badge } from "antd-mobile";

const MobileDemo = ({ data }) => {
  return (
    <List header="最近交易紀錄">
      {data.map((item) => (
        <List.Item
          key={item.id}
          prefix={
            // 透過邊條顏色區分買賣
            <div
              style={{
                width: "4px",
                height: "40px",
                backgroundColor: item.side === "B" ? "#ff4d4f" : "#52c41a",
              }}
            />
          }
          extra={
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold" }}>${item.price}</div>
              <div style={{ fontSize: "12px", color: "#999" }}>
                {item.qty} 股
              </div>
            </div>
          }
          description={`${item.stock_no} · ${item.trade_time}`}
        >
          {item.stock_name}
          {item.side === "B" ? (
            <Tag color="danger" style={{ marginLeft: "8px" }}>
              買入
            </Tag>
          ) : (
            <Tag color="success" style={{ marginLeft: "8px" }}>
              賣出
            </Tag>
          )}
        </List.Item>
      ))}
    </List>
  );
};

export default MobileDemo;
