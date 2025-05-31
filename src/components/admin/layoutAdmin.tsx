import { useState } from 'react';
import {
    BookOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Space, Typography, message } from 'antd';
import { logoutApi } from '@/service/api';
import { useCurrentApp } from '../context/app.context';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate(); // ✅ Hook được gọi đúng chỗ
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { user, setUser, setIsAuthenticated } = useCurrentApp();

    const handleLogout = async () => {
        const res = await logoutApi();
        if (res.data) {
            setUser(null);
            if (res.statusCode === 201) {
                message.success("Đăng Xuất Thành Công");
            }
            setIsAuthenticated(false);
            localStorage.removeItem('access_token');
        }
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light" width={250} collapsedWidth={100}>
                <div className="demo-logo-vertical" />
                <h1 style={{ textAlign: 'center', padding: '10px' }}>Admin</h1>
                <Menu
                    onClick={({ key }) => {
                        switch (key) {
                            case '1':
                                navigate('/admin/dashboard');
                                break;
                            case '2':
                                navigate('/admin/users');
                                break;
                            case '3':
                                navigate('/admin/books');
                                break;
                            case '4':
                                navigate('/admin/orders');
                                break;
                            case '5':
                                navigate('/admin/reviews');
                                break;
                            default:
                                break;
                        }
                    }}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        { key: '1', icon: <HomeOutlined />, label: 'Dashboard' },
                        { key: '2', icon: <UserOutlined />, label: 'Quản lý Người dùng' },
                        { key: '3', icon: <BookOutlined />, label: 'Quản lý Sách' },
                        { key: '4', icon: <ShoppingCartOutlined />, label: 'Quản lý Đơn hàng' },
                        { key: '5', icon: <ShoppingCartOutlined />, label: 'Quản lý Review' },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            background: '#ffffff !important',
                        }}
                    />
                    <Space>
                        <Text style={{ marginRight: 16 }}>
                            {user ? user.username || `I'm user` : `I'm user`}
                        </Text>
                        <Button type="link" onClick={handleLogout}>Đăng xuất</Button>
                    </Space>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
