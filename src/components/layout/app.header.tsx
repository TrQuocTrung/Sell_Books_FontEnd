import './app.header.scss'
import { Input, Button, App } from "antd";
import { SearchOutlined, PhoneOutlined, MessageOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { FaLocationArrow } from 'react-icons/fa';
import { useCurrentApp } from '../context/app.context';
import { Link } from "react-router";
import { logoutApi } from '@/service/api';
const Appheader = () => {
    // Sử dụng VITE_BASE_URL từ .env
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useCurrentApp();
    const { message } = App.useApp();
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
    }
    return (
        <>

            <div className="app-header">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">
                        <img
                            src={`${baseUrl}/images/Logo/Logo.jpg`}
                            alt="Vinabook Logo"
                            className="logo-image"
                        />
                    </Link>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="search-bar">
                    <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        suffix={
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                className="search-button"
                            >
                                Tìm kiếm
                            </Button>
                        }
                        className="search-input"
                    />
                </div>
                <div className='user-menu'>
                    {isAuthenticated === false ?
                        <div>
                            <span className='text-content'><Link to={'/login'}>Đăng Nhập</Link></span>
                            <span><Link to={'/register'}>Đăng Ký</Link></span>

                        </div>
                        :
                        <div>
                            <span>Xin chào, {user?.username || 'Người dùng'}!</span>
                            <span><Link to="/profile">Trang cá nhân</Link></span>
                            <button onClick={() => handleLogout()}>Đăng xuất</button>
                        </div>}
                </div>
                <div className="cart-icon">
                    <button>
                        <ShoppingCartOutlined />
                        <span className="cart-count">0</span> {/* Số lượng sản phẩm, có thể thay bằng state */}
                    </button>
                </div>
                {/* Thông tin liên hệ */}
                <div className="contact-info">
                    <PhoneOutlined className="contact-icon" />
                    <div className="contact-text">
                        <div className="contact-label">Tư vấn bán hàng</div>
                        <div className="contact-number">19006401</div>
                    </div>
                </div>
            </div>
            <div className='header-title'>
                <span className='header-title-content'>
                    <PhoneOutlined className='icon-size' />
                    <span className='text-title'>19006401</span>

                </span>
                <span className='header-title-content'>
                    <MessageOutlined className='icon-size' />
                    <span className='text-title'>bookstore@book.com</span>
                </span>
                <span className='header-title-content'>
                    <FaLocationArrow className='icon-size' />
                    <span className='text-title'>123 Main Street-PO Box 456-Anytown, CA 91234</span>

                </span>

            </div>

        </>
    );
}
export default Appheader;