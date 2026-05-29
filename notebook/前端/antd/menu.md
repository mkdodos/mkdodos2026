### 選中項目高亮顯示

`selectedKeys` : 選中項目的 keys
`location.pathname` : 回傳當前 URL 的**路徑部分**

1. 點擊 Menu 項目時，**導航到該 key 對應的路徑**。
2. `navigate("/wp-demand")` → URL 變成 `http://192.168.0.10:5174/wp-demand`
3. 點擊後, `location.pathname` 取得 `/wp-demand`  設定給 `selectedKeys`

```javascript
 
 import { useNavigate } from "react-router-dom";
 import { Menu } from "antd";
 import {  
  DatabaseOutlined, 
  AppstoreOutlined,
  SettingOutlined, 
} from "@ant-design/icons";
 
 const navigate = useNavigate();
 // http://192.168.0.10:5174/wp-demand                         
 // location.pathname = "/wp-demand"
 const current = location.pathname;
 // 定義選單項目
  const menuItems = [
    { key: "/wp-stock", icon: <DatabaseOutlined />, label: "料件庫存" },
    { key: "/wp-demand", icon: <AppstoreOutlined />, label: "切割需求" },
    { key: "/customers", icon: <SettingOutlined />, label: "客戶管理" },
  ];

  return (
    <Menu
      mode="horizontal"   
      onClick={({ key }) => navigate(key)}  
      theme="light"
      selectedKeys={[current]} // 這裡傳入陣列，控制選中項目
      items={menuItems}
      style={{ flex: 1, minWidth: 0, height: "100%" }}
    />
  );
```

### 下拉選單
`children` : 下拉項目放置於此,選了子項目,父層會自動高亮

>父層的 key 只用來識別,不 navigate

```javascript
 {
	  key: "customers",
	  icon: <TeamOutlined />,
      label: "客戶管理",
      children: [      
        { key: "/customers", label: "客戶列表" },
        { key: "/customers/add", label: "新增客戶" },
      ],
 },
```

### 點擊父層才出現子層
  `triggerSubMenuAction="click" // 預設是 "hover"`