get
```javascript
 const response = await axios.get(API_BASE);
```

axios 取得資料後,搭配 antd Table 顯示資料
```javascript
import React, { useEffect } from "react";
import { message, Table } from "antd";
import axios from "axios";
import { useState } from "react";

function Index() {
  const API_BASE = "http://192.168.0.10:3001/api/wp-stock/family-tree";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. 取得資料
  const getItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      message.error("無法取得資料");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const columns = [
    {
      title: "sn",
      dataIndex: "tree_structure",
    },
    {
      title: "len",
      dataIndex: "len",
    },
    {
      title: "lv",
      dataIndex: "level",
    },
  ];

  

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Index;

```