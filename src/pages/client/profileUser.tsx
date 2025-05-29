import { useEffect, useState } from 'react';
import { getMyOrders, updateUserApi } from '@/service/api';
import { Card, List, Typography, Spin, message, Button, Modal, Input, Form } from 'antd';
import { useCurrentApp } from '@/components/context/app.context';
import './profileUser.scss';
const { Text } = Typography;

const ProfileUser = () => {
    const { user, setUser } = useCurrentApp();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    // State modal và form
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getMyOrders();
                if (res.statusCode === 200 || res.statusCode === 201) {
                    setOrders(res.data || []);
                } else {
                    message.error(res.message || 'Không lấy được đơn hàng');
                }
            } catch (err: any) {
                message.error(err.response?.data?.message || 'Lỗi khi tải đơn hàng');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (!user) {
        return (
            <div className="profile-user profile-user--no-login">
                Vui lòng đăng nhập để xem thông tin
            </div>
        );
    }

    const showModal = () => {
        // set initial form values từ user hiện tại
        form.setFieldsValue({
            fullname: user.profile?.fullname,
            address: user.profile?.address,
            gender: user.profile?.gender,
            phone: user.profile?.phone,
            age: user.profile?.age,
        });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values: any) => {
        try {
            // Gọi API update user
            const updateUserDto = {
                profile: {
                    fullname: values.fullname,
                    address: values.address,
                    gender: values.gender,
                    phone: values.phone,
                    age: values.age,
                },
            };
            const res = await updateUserApi(user._id, updateUserDto);
            if (res.statusCode === 200) {
                message.success('Cập nhật thông tin thành công');
                setIsModalVisible(false);
                // Nếu có setUser để update lại context user info
                setUser && setUser({ ...user, profile: { ...user.profile, ...values } });
            } else {
                message.error(res.message || 'Cập nhật thất bại');
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Lỗi khi cập nhật');
        }
    };

    return (
        <div className="profile-user" style={{ padding: 24 }}>
            <Card
                title="Thông tin cá nhân"
                className="profile-user__card profile-user__card--info"
                style={{ marginBottom: 24 }}
                extra={<Button onClick={showModal}>Cập nhật thông tin</Button>}
            >
                <div className="profile-user__info-item">
                    <strong>Username:</strong> <span>{user.username}</span>
                </div>
                <div className="profile-user__info-item">
                    <strong>Email:</strong> <span>{user.email}</span>
                </div>
                <div className="profile-user__info-item">
                    <strong>Họ và tên:</strong> <span>{user.profile?.fullname || 'Chưa cập nhật'}</span>
                </div>
                <div className="profile-user__info-item">
                    <strong>Địa chỉ:</strong> <span>{user.profile?.address || 'Chưa cập nhật'}</span>
                </div>
                <div className="profile-user__info-item">
                    <strong>Giới tính:</strong> <span>{user.profile?.gender || 'Chưa cập nhật'}</span>
                </div>
                <div className="profile-user__info-item">
                    <strong>Số điện thoại:</strong> <span>{user.profile?.phone || 'Chưa cập nhật'}</span>
                </div>
                <div className="profile-user__info-item">
                    <strong>Tuổi:</strong> <span>{user.profile?.age || 'Chưa cập nhật'}</span>
                </div>

            </Card>

            <Card title="Đơn hàng của bạn" className="profile-user__card profile-user__card--orders">
                {loading ? (
                    <div className="profile-user__loading">
                        <Spin />
                    </div>
                ) : (
                    <List
                        className="profile-user__orders-list"
                        dataSource={orders}
                        renderItem={(order) => (
                            <List.Item className="profile-user__order-item" key={order._id}>
                                <List.Item.Meta
                                    title={
                                        <Text strong className="profile-user__order-title">
                                            Mã đơn: {order._id} | Trạng thái: {order.status}
                                        </Text>
                                    }
                                    description={
                                        <div className="profile-user__order-description">
                                            <p className="profile-user__order-date">
                                                Ngày đặt: {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                            <p className="profile-user__order-total">Tổng tiền: {order.totalAmount.toLocaleString()}₫</p>
                                            <ul className="profile-user__order-items-list">
                                                {order.items.map((item) => (
                                                    <li className="profile-user__order-item-detail" key={item._id}>
                                                        Sách: {item.book ? item.book.name : 'Sách đã bị xóa'} | SL: {item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </Card>

            {/* Modal cập nhật thông tin cá nhân */}
            <Modal
                title="Cập nhật thông tin cá nhân"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Họ và tên" name="fullname">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Giới tính" name="gender">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Tuổi" name="age">
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProfileUser;
