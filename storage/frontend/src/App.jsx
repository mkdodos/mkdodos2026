import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Items from "./pages/Items/Index";
import Boxes from "./pages/boxes/Index";

import { Layout, Menu } from "antd";
import { ContainerOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  // 定義選單項目
  const menuItems = [
    { key: "/items", icon: <ContainerOutlined />, label: "項目管理" },
    { key: "/boxes", icon: <AppstoreOutlined />, label: "盒子管理" },
  ];
  return (
    <div>
      {/* 路由出口：根據網址顯示不同組件 */}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            // selectedKeys={[location.pathname]} // 根據網址自動高亮對應選單
            items={menuItems}
            onClick={({ key }) => navigate(key)} // 點擊時切換網址
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
