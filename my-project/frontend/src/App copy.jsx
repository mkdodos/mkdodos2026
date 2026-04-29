import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Items from "./pages/Items/Index";
import Boxes from "./pages/boxes/Index";
import Cates from "./pages/cates/Index";

import { Layout, Menu } from "antd";
import {
  ContainerOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // 控制 Sider 是否折疊
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false); // 紀錄是否為小螢幕
  // 定義選單項目
  const menuItems = [
    { key: "/cates", icon: <ContainerOutlined />, label: "類別管理" },
    { key: "/items", icon: <ContainerOutlined />, label: "項目管理" },
    { key: "/boxes", icon: <AppstoreOutlined />, label: "盒子管理" },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);

    // ⭐ 關鍵：如果是手機版尺寸（Sider 寬度為 0 時），點擊後自動縮回
    // 這裡我們判斷，只要點擊了選單，就設定為折疊狀態
    // ⭐ 核心判斷：只有在手機版（小螢幕）時，點擊選單才縮回
    if (isMobile) {
      setCollapsed(true);
    }
    // setCollapsed(true);
  };

  return (
    <div>
      {/* 路由出口：根據網址顯示不同組件 */}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // collapsible
          collapsed={collapsed} // 受控狀態
          onCollapse={(value) => setCollapsed(value)} // 讓手動點擊切換鈕也能運作
          onBreakpoint={(broken) => {
            setIsMobile(broken);
            // 如果回到大螢幕，確保選單是打開的
            if (!broken) setCollapsed(false);
            // 當螢幕寬度變化時，如果是大螢幕就展開，小螢幕就縮回
            // setCollapsed(broken);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            // selectedKeys={[location.pathname]} // 根據網址自動高亮對應選單
            items={menuItems}
            onClick={handleMenuClick} // 綁定點擊事件
            // onClick={({ key }) => navigate(key)} // 點擊時切換網址
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: "0 16px",
              display: "flex", // 啟用 Flex
              alignItems: "center", // 垂直置中
            }}
          >
            {/* ⭐ 關鍵：只有在 isMobile 為 true 時才顯示切換按鈕 */}
            {/* {isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: "18px", width: 64, height: 64 }}
              />
            )} */}

            <h2 style={{ margin: 0 }}>收納管理系統</h2>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <Routes>
              <Route path="/items" element={<Items />} />
              <Route path="/boxes" element={<Boxes />} />
              <Route path="/cates" element={<Cates />} />
              {/* 預設導向項目管理 */}
              {/* <Route path="/" element={<ItemList />} /> */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

// 必須被 BrowserRouter 包裹才能使用 useNavigate
const App = () => (
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);

export default App;
