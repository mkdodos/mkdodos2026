import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import SideMenu from "../components/SideMenu"; // 這是您寫好的選單

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 左側邊欄 */}
      <Sider
        theme="light"
        width={250}
        style={{ borderRight: "1px solid #f0f0f0" }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            fontWeight: "bold",
          }}
        >
          MKDODOS 2026
        </div>
        <SideMenu />
      </Sider>

      {/* 右側容器 */}
      <Layout>
        {/* 頂部欄：通常放麵包屑、使用者資訊或登出按鈕 */}
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <TopMenu />
          <div style={{ textAlign: "right" }}>管理員 您好</div>
        </Header>

        {/* 內容區 */}
        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
