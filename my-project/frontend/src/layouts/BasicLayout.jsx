import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import TopMenu from "../components/TopMenu";
const { Header, Content, Footer } = Layout;
const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
const BasicLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();
  return (
    <Layout>
      <Header
        style={{
          //   display: "flex",
          //   alignItems: "center",
          // 1. 設定背景為白色
          backgroundColor: "#ffffff",
          // 2. 增加一條細細的底線區隔內容區
          //   borderBottom: "1px solid #f0f0f0",
          padding: "0px 30px",
          height: "56px",
          //   lineHeight: "64px",
        }}
      >
        {/* <div className="demo-logo" /> */}
        <TopMenu />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
      </Header>
      <Content style={{ padding: "0 0px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 28,
            padding: 24,
            marginTop: 26,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{currentYear} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default BasicLayout;
