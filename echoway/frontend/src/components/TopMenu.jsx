import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  DatabaseOutlined,
  SettingOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  SplitCellsOutlined,
  ContactsOutlined,
  FormOutlined,
  ScissorOutlined,
  TeamOutlined,
  InboxOutlined,
} from "@ant-design/icons";

function TopMenu() {
  const navigate = useNavigate();
  // http://192.168.0.10:5174/wp-demand
  // const current = location.pathname.replace("/", "");
  const current = location.pathname;
  console.log(location.pathname);
  // /wp-demand => wp-demand

  const menuItems = [
    { key: "/wp-stock", icon: <AppstoreOutlined />, label: "料件庫存" },
    { key: "/wp-demand", icon: <ScissorOutlined />, label: "切割需求" },
    { key: "/wp-cut-logs", icon: <ScissorOutlined />, label: "切割記錄" },
    {
      key: "customers",
      icon: <TeamOutlined />,
      label: "客戶管理",
      children: [
        // ← 加這個
        { key: "/customers", label: "客戶列表" },
        { key: "/customers/add", label: "新增客戶" },
      ],
    },
  ];
  return (
    <Menu
      mode="horizontal"
      // 點擊才出現子層
      triggerSubMenuAction="click" // ← 加這個，預設是 "hover"
      onClick={({ key }) => navigate(key)}
      // theme="dark"
      theme="light"
      // selectedKeys={["/wp-stock", "/wp-demand"]}
      selectedKeys={[current]} // 這裡傳入陣列，控制選中項目
      items={menuItems}
      style={{ flex: 1, minWidth: 0, height: "100%" }}
    />
  );
}

export default TopMenu;
