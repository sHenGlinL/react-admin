import React, { useState } from 'react';
import { Layout, theme, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuView from './Menu';
import Breadcrumb from './Breadcrumb';
import styles from './layout.module.scss'
import { removeToken } from '@/utils/auth';

const { Header, Content, Footer, Sider } = Layout;

const LayoutView: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    removeToken()
    location.reload()
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <MenuView />
      </Sider>

      <Layout className="site-layout">
        <Header className={styles['layout-header']} style={{ background: colorBgContainer }} >
          <Breadcrumb />
          <Button type="link" onClick={logout}>登出</Button>
        </Header>
        <Content style={{ margin: '16px 16px 0', padding: '24px', background: colorBgContainer }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>react18 + antd + three.js 后台管理系统模版</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutView;