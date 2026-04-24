import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Menu, ConfigProvider } from "antd";
import {
  DashboardOutlined,
  DatabaseOutlined,
  SettingOutlined,
  AppstoreOutlined,
  ContainerOutlined,
} from "@ant-design/icons";

function TopMenu() {
  const navigate = useNavigate();
  // 定義選單項目
  const menuItems = [
    { key: "/cates", icon: <DatabaseOutlined />, label: "類別管理" },
    { key: "/items", icon: <ContainerOutlined />, label: "項目管理" },
    { key: "/boxes", icon: <AppstoreOutlined />, label: "盒子管理" },
    { key: "/customers", icon: <AppstoreOutlined />, label: "客戶管理" },
  ];
  return (
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Menu: {
    //         darkItemSelectedBg: "transparent", // 讓選中的藍色背景透明
    //         darkItemHoverBg: "transparent", // 讓滑鼠移上去的背景也透明
    //       },
    //     },
    //   }}
    // >
    <Menu
      mode="horizontal"
      onClick={({ key }) => navigate(key)}
      // theme="dark"
      theme="light"
      // selectedKeys={[current]} // 這裡傳入陣列，控制選中項目
      items={menuItems}
      style={{ flex: 1, minWidth: 0, height: "100%" }}
    />
    // </ConfigProvider>
  );
}

export default TopMenu;
