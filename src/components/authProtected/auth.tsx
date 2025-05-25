import { useCurrentApp } from "components/context/app.context";
import { Button, Result, Spin } from 'antd';
import { Link, useLocation } from "react-router-dom";
interface Iprop {
    children: React.ReactNode;
}
const ProtectedRoute = (prop: Iprop) => {
    const { isAuthenticated, user } = useCurrentApp();
    const location = useLocation();
    if (isAuthenticated === false) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Bạn chưa đăng nhập vào hệ thống, vui lòng đăng nhập để tiếp tục."
                extra={<Button type="primary"><Link to={'/login'}>Đăng Nhập</Link></Button>}
            />
        )

    }
    const isAdminRoute = location.pathname.includes('/admin');
    if (isAuthenticated === true && isAdminRoute === true) {
        const role = user?.role.name;
        if (role === 'NORMAL_USER') {
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle="Bạn không có quyền truy cập vào trang này."
                    extra={<Button type="primary"><Link to={'/'}>Back Home</Link></Button>}
                />
            )

        }
    }
    return (
        <>
            {prop.children}
        </>
    )


}
export default ProtectedRoute;