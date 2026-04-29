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
    { key: "/fees", icon: <AppstoreOutlined />, label: "費用表" },
    { key: "/customers", icon: <AppstoreOutlined />, label: "客戶管理" },
  ];
  return (
   
    <Menu
      mode="horizontal"
      onClick={({ key }) => navigate(key)}
      // theme="dark"
      theme="light"
      // selectedKeys={[current]} // 這裡傳入陣列，控制選中項目
      items={menuItems}
      style={{ flex: 1, minWidth: 0, height: "100%" }}
    />
   
  );
}

export default TopMenu;
