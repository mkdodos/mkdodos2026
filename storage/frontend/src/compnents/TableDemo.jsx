import { Table, Button, Space } from "antd";
import { EditOutlined, EditFilled } from "@ant-design/icons";
import { ConfigProvider } from "antd";
function TableDemo({ dataSource }) {
  // dataIndex 對應資料欄位名
  // {"id":10,"box_id":101,"item_name":"泡麵","category":"食物"}
  const columns = [
    {
      title: "項目",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "類別",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "盒編號",
      dataIndex: "box_id",
      key: "box_id",
    },
    // 編輯鈕
    {
      title: "編輯",
      key: "edit",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={
              <EditOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* 設定樣式 */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              // headerBg: "#f0f5ff",
              // headerColor: "#003a8c",
              borderColor: "#8c8c8c",
            },
          },
        }}
      >
        <Table rowKey="id" dataSource={dataSource} columns={columns} />;
      </ConfigProvider>
      {/* <Table dataSource={dataSource} columns={columns} />; */}
    </div>
  );
}

export default TableDemo;
