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
                height: "30px",
                backgroundColor: item.side === "B" ? "#ff4d4f" : "#52c41a",
              }}
            />
          }
          extra={item.id}
          // description={item.id}
        >
          {item.cate_name}
        </List.Item>
      ))}
    </List>
  );
};

export default MobileDemo;
