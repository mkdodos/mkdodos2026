import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
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
  ];
  return (
    <div>
      <div>
        <Menu
          mode="horizontal"
          onClick={({ key }) => navigate(key)}
          // theme="dark"
          // selectedKeys={[current]} // 這裡傳入陣列，控制選中項目
          items={menuItems}
          style={{ height: "100%", borderRight: 0 }}
        />
      </div>
    </div>
  );
}

export default TopMenu;
