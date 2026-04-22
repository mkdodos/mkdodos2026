import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  DatabaseOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Index() {
  // 定義選單項目
  const items = [
    {
      label: <Link to="/items">控制台</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to="/inventory">庫存管理</Link>,
      key: "inventory",
      icon: <DatabaseOutlined />,
    },
    {
      label: <Link to="/settings">系統設定</Link>,
      key: "settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <div>
      <Menu
        mode="horizontal"
        // theme="dark"
        // selectedKeys={[current]} // 這裡傳入陣列，控制選中項目
        items={items}
        style={{ height: "100%", borderRight: 0 }}
      />
    </div>
  );
}
