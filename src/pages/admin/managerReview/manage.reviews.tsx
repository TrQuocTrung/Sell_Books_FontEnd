import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Dropdown, Popconfirm } from 'antd';
import { DeleteTwoTone, EditTwoTone, EllipsisOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getAllReview } from '@/service/api';
import DetailReview from './detail.review';

const ManagerReview = () => {
    const { message } = App.useApp();
    const actionRef = useRef<ActionType | null>(null);
    const [isSelectReview, setIsSelectReview] = useState<IReview | null>(null)
    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [isOpenUpdateReview, setisOpenUpdateReview] = useState(false)
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });

    const columns: ProColumns<IReview>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Mã Bình Luận',
            dataIndex: '_id',
            render: (text, record) => (
                <a
                    onClick={() => {
                        setIsSelectReview(record)
                        setIsOpenDetail(true)
                    }}
                >
                    {text}
                </a>
            )
        },
        {
            title: 'Người dùng',
            dataIndex: 'user',
            render: (_, record) => {

                return record.createdBy.email || 'Ẩn danh';
            },
        },
        {
            title: 'Sách',
            dataIndex: ['book', 'name'],

        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            valueType: 'digit',
        },
        {
            title: 'Bình luận',
            dataIndex: 'comment',
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


                        }}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa đơn hàng này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        placement="topRight"

                    >
                        <DeleteTwoTone twoToneColor="#ff4d4f" style={{ cursor: 'pointer' }} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            <ProTable<IReview>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params) => {
                    const query = `current=${params.current}&pageSize=${params.pageSize}`;
                    try {
                        const res = await getAllReview(query);
                        if (res.data) {
                            setMeta(res.data.meta);
                        }
                        return {
                            data: res.data?.results || [],
                            success: true,
                            total: res.data?.meta?.total || 0,
                        };
                    } catch (error) {
                        message.error('Lỗi khi tải danh sách đánh giá');
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
                headerTitle="Danh sách đánh giá"
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
            <DetailReview
                isSelectReview={isSelectReview} setIsSelectReview={setIsSelectReview}
                isOpenDetail={isOpenDetail} setIsOpenDetail={setIsOpenDetail}
            />
        </>
    );
};

export default () => (
    <App>
        <ManagerReview />
    </App>
);
