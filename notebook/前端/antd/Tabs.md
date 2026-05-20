在同一個頁面切換不同組件

```javascript
import { Tabs } from 'antd';
const tabItems = [
    {
      key: "1",
      label: "Tab 1",
      children: <Portfolio />,
    },    
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
  ];

<Tabs defaultActiveKey="1" items={tabItems} />
```