import React from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  ToolOutlined,
  CustomerServiceOutlined,
  MailOutlined,
  TagsOutlined,
  UserOutlined,
  ReadOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <StyledLayout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/admin/accounts" icon={<UserOutlined />}>
            <Link to="/admin/accounts">Quản lý tài khoản</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub-settings" icon={<TagsOutlined />} title="Cấu hình chung">
            <Menu.Item key="/admin/settings/main">
              <Link to="/admin/settings/main">Thông tin chính</Link>
            </Menu.Item>
            <Menu.Item key="/admin/about">
              <Link to="/admin/about">Giới thiệu</Link>
            </Menu.Item>
            <Menu.Item key="/admin/skills">
              <Link to="/admin/skills">Kỹ năng</Link>
            </Menu.Item>
            <Menu.Item key="/admin/services">
              <Link to="/admin/services">Dịch vụ</Link>
            </Menu.Item>
            <Menu.Item key="/admin/categories">
              <Link to="/admin/categories">Danh mục</Link>
            </Menu.Item>
            <Menu.Item key="/admin/settings/footer">
              <Link to="/admin/settings/footer">Footer</Link>
            </Menu.Item>
            <Menu.Item key="/admin/settings/contact">
              <Link to="/admin/settings/contact">Cấu hình Liên hệ</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/admin/projects" icon={<ProjectOutlined />}>
            <Link to="/admin/projects">Dự án</Link>
          </Menu.Item>
          <Menu.Item key="/admin/news" icon={<GlobalOutlined />}>
            <Link to="/admin/news">News Aggregator</Link>
          </Menu.Item>
          <Menu.Item key="/admin/contact" icon={<MailOutlined />}>
            <Link to="/admin/contact">Liên hệ</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '2rem' }}>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>Đăng xuất</Button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export default AdminLayout;
