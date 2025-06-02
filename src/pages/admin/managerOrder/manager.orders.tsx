import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Dropdown, Popconfirm, Tag } from 'antd';
import { DeleteTwoTone, EditTwoTone, EllipsisOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { deleteOrderApi, getallOrderApi } from '@/service/api';
import DetailOrder from './detail.order';
import UpdateOrder from './update.order';

const ManagerOrders = () => {
    const { message } = App.useApp();
    const actionRef = useRef<ActionType | null>(null);
    const [isselectedOrder, setisselectedOrder] = useState<IOrder | null>(null)
    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });

    const handleDeleteOrder = async (id: string) => {
        try {
            const res = await deleteOrderApi(id);
            if (res.statusCode === 200) {
                message.success('Xóa đơn hàng thành công');
                actionRef.current?.reload();
            }
        } catch (error) {
            message.error('Xóa đơn hàng thất bại');
        }
    };

    const columns: ProColumns<IOrder>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Mã đơn',
            dataIndex: '_id',
            render: (text, record) => (
                <a
                    onClick={() => {
                        setisselectedOrder(record)
                        setIsOpenDetail(true)
                    }}
                >
                    {text}
                </a>
            )
        },
        {
            title: 'Khách hàng',
            dataIndex: 'user',
            render: (_, record) => record.user?.email || 'Ẩn danh',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            valueType: 'money',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
                const statusColors: Record<string, string> = {
                    pending: 'orange',
                    confirmed: 'green',
                    shipped: 'blue',
                    delivered: 'cyan',
                    cancelled: 'red',
                    complete: 'purple',
                };
                const color = statusColors[record.status] || 'default';
                return <Tag color={color}>{record.status}</Tag>;
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
        },
        {
            title: 'Hành động',
            hideInSearch: true,
            render: (_, record) => (
                <>
                    <EditTwoTone
                        twoToneColor="#f57800"
                        style={{ cursor: 'pointer', marginRight: 15 }}
                        onClick={() => {
                            setisselectedOrder(record);
                            setIsOpenUpdate(true);
                        }}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa đơn hàng này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        placement="topRight"
                        onConfirm={() => handleDeleteOrder(record._id)}
                    >
                        <DeleteTwoTone twoToneColor="#ff4d4f" style={{ cursor: 'pointer' }} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>

            <ProTable<IOrder>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params) => {
                    const query = `current=${params.current}&pageSize=${params.pageSize}`;
                    try {
                        const res = await getallOrderApi(query);
                        console.log("Check res", res)
                        if (res.data) {
                            setMeta(res.data.meta);
                        }
                        return {
                            data: res.data?.results || [],
                            success: true,
                            total: res.data?.meta?.total || 0,
                        };
                    } catch (error) {
                        message.error('Lỗi khi tải danh sách đơn hàng');
                        return {
                            data: [],
                            success: false,
                            total: 0,
                        };
                    }
                }}
                rowKey="_id"
                pagination={{
                    pageSize: meta.pageSize,
                    current: meta.current,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total}`,
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                headerTitle="Danh sách đơn hàng"
                toolBarRender={() => [
                    <Dropdown
                        key="menu"
                        menu={{
                            items: [
                                { label: 'Tùy chọn 1', key: '1' },
                                { label: 'Tùy chọn 2', key: '2' },
                            ],
                        }}
                    >
                        <Button icon={<EllipsisOutlined />} />
                    </Dropdown>,
                ]}
            />

            <DetailOrder
                isselectedOrder={isselectedOrder}
                setisselectedOrder={setisselectedOrder}
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
            />
            <UpdateOrder
                isselectedOrder={isselectedOrder}
                setisselectedOrder={setisselectedOrder}
                isOpenUpdate={isOpenUpdate}
                setIsOpenUpdate={setIsOpenUpdate}
                actionRef={actionRef}
            />
        </>
    );
};

export default () => (
    <App>
        <ManagerOrders />
    </App>
);
