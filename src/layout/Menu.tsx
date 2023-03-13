import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: '菜单1',
    icon: <DesktopOutlined />,
    key: '/home'
  },
  {
    label: '菜单2',
    icon: <FileOutlined />,
    key: '/about'
  },
  {
    label: '菜单3',
    icon: <UserOutlined />,
    key: 'page3',
    children: [
      {
        label: '菜单3-1',
        icon: <DesktopOutlined />,
        key: '/page3/page3-1'
      },
      {
        label: '菜单3-2',
        icon: <FileOutlined />,
        key: '/page3/2'
      }
    ]
  }
]

const MenuView: React.FC = () => {  
  // 获取当前路由
  const currentRoute = useLocation()
  
  // 点击菜单
  const navigateTo = useNavigate();
  const menuClick: MenuProps["onClick"] = ({ key }) => {
    navigateTo(key);
  };

  // 寻找当前路由对应的openKeys  @todo 类型修正
  const findOpenKeys = (menuItems: any[], parentMenuItem?: any) : string[] => {
    for(let menuItem of menuItems) {
      if (parentMenuItem && menuItem.key === currentRoute.pathname) {
        return [parentMenuItem.key]
      } else if (menuItem.children) {
        return findOpenKeys(menuItem.children, menuItem)
      }
    }
    return []
  }
  const firstOpenKeys = findOpenKeys(items)

  // 手风琴效果
  const [openKeys, setOpenKeys] = useState<string[]>(firstOpenKeys);
  const menuOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys[keys.length - 1];
    setOpenKeys([latestOpenKey]);
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      openKeys={openKeys}
      mode="inline"
      items={items}
      onClick={menuClick}
      onOpenChange={menuOpenChange}
    />
  );
}

export default MenuView;
