import { useCart } from '@/components/context/CartContext';
import { createOrder } from '@/service/api';
import { Modal, List, Button, message } from 'antd';
type Props = {
    open: boolean;
    onClose: () => void;
};

const CartModal = ({ open, onClose }: Props) => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const handleOrder = async () => {
        if (cartItems.length === 0) {
            message.warning('Giỏ hàng của bạn đang trống');
            return;
        }

        try {
            const orderItems = cartItems.map((item) => ({
                book: item.book,       // Đây phải là _id của sách
                quantity: item.quantity,
            }));

            const res = await createOrder({ items: orderItems });

            if (res.statusCode === 201 && res.data) {
                message.success('Đặt hàng thành công!');
                clearCart();
                onClose();
            } else {
                message.error(res.message || 'Đặt hàng thất bại');
            }
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.message || 'Lỗi khi đặt hàng');
        }
    };
    return (
        <Modal title="Giỏ hàng" open={open} onCancel={onClose} footer={null}>
            <List
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="link" onClick={() => removeFromCart(item.book)}>Xóa</Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<img src={item.image} width={50} />}
                            title={item.title}
                            description={`Số lượng: ${item.quantity} | Giá: ${item.price}₫`}
                        />
                    </List.Item>
                )}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Button onClick={clearCart} danger style={{ marginRight: 8 }}>Xóa tất cả</Button>
                <Button type="primary" onClick={handleOrder}>Đặt hàng</Button>
            </div>
        </Modal>
    );
};

export default CartModal;
