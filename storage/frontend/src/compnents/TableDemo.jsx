import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons";
import { ConfigProvider } from "antd";
import axios from "axios";
function TableDemo({ dataSource, columns }) {
  // dataIndex 對應資料欄位名
  // {"id":10,"box_id":101,"item_name":"泡麵","category":"食物"}

  const deleteItem = async (id) => {
    const url = `http://192.168.0.10:3000/api/items/${id}`;

    try {
      const response = await axios.delete(url);
      console.log("刪除成功:", response.data);
      // getItems();
    } catch (error) {
      console.error("刪除失敗:", error.response?.data || error.message);
    }
  };

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
        <Table
          rowKey="id"
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
      </ConfigProvider>
      {/* <Table dataSource={dataSource} columns={columns} />; */}
    </div>
  );
}

export default TableDemo;
