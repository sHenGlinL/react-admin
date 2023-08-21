import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store";

type MenuItem = Required<MenuProps>["items"][number];

// 根据路由数据生成菜单树
const GenerateMenu = (menu:any[]):MenuItem[] => {
  return menu.map(item => {
    const menuItem = {
      label: item.name,
      key: item.path,
      icon: <DesktopOutlined />,
    }
    return item.children?.length > 0 ? { ...menuItem, children: GenerateMenu(item.children) } : menuItem
  })
}

const MenuView: React.FC = () => {
  // 获取menu菜单  
  const { menu } = useAppSelector(state => state.UserReducer)
  const items = GenerateMenu(menu)
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
        const curOpenKeys =  findOpenKeys(menuItem.children, menuItem)
        if (curOpenKeys.length > 0) return curOpenKeys
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
