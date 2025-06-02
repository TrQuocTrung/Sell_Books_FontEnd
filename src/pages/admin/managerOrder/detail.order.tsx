import { Drawer, Descriptions, Divider, Table, Tag } from 'antd';


interface IProps {
    isselectedOrder: IOrder | null;
    setisselectedOrder: (v: IOrder) => void;
    isOpenDetail: boolean;
    setIsOpenDetail: (v: boolean) => void;
}

const DetailOrder = (props: IProps) => {
    const { isselectedOrder, setisselectedOrder, isOpenDetail, setIsOpenDetail } = props;

    const handleClose = () => {
        setIsOpenDetail(false);
    };

    if (!isselectedOrder) return null;

    const statusColors: Record<string, string> = {
        pending: 'orange',
        confirmed: 'green',
        shipped: 'blue',
        delivered: 'cyan',
        cancelled: 'red',
        complete: 'purple',
    };

    return (
        <Drawer
            title={`Chi tiết đơn hàng: ${isselectedOrder._id}`}
            open={isOpenDetail}
            onClose={handleClose}
            width={700}
        >
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Khách hàng">
                    {isselectedOrder.user?.email || 'Ẩn danh'}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">
                    {isselectedOrder.totalAmount.toLocaleString('vi-VN')} đ
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    <Tag color={statusColors[isselectedOrder.status] || 'default'}>
                        {isselectedOrder.status}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">
                    {new Date(isselectedOrder.createdAt).toLocaleString('vi-VN')}
                </Descriptions.Item>
            </Descriptions>

            <Divider>Danh sách sản phẩm</Divider>

            <Table
                dataSource={isselectedOrder.items}
                rowKey={(record) => record._id}
                pagination={false}
                columns={[
                    {
                        title: 'Tên sách',
                        dataIndex: ['book', 'name'],
                    },
                    {
                        title: 'Giá',
                        dataIndex: ['book', 'price'],
                        render: (price: number) => `${price.toLocaleString('vi-VN')} đ`,
                    },
                    {
                        title: 'Số lượng',
                        dataIndex: 'quantity',
                    },
                ]}
            />
        </Drawer>
    );
};

export default DetailOrder;
