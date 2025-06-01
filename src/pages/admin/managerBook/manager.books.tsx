
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Dropdown, Popconfirm } from 'antd';
import { DeleteTwoTone, EditTwoTone, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { deleteBookApi, getAllBooks } from '@/service/api';
import DetailBook from './detail.book';
import CreateBook from './create.book';
import UpdateBook from './update.book';


const ManagerBooks = () => {
    const { message } = App.useApp();
    const actionRef = useRef<ActionType | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isSelectedBook, setIsSelectedBook] = useState<IBook | null>(null)
    const [isOpenCreate, setIsOpenCeate] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });
    const handleDeletBook = async (id: string) => {
        try {
            await deleteBookApi(id);;
            message.success('Xóa Sách thành công');
            // Reload lại bảng sau khi xóa thành công
            actionRef.current?.reload();
        } catch (error) {
            message.error('Xóa Sách thất bại');
        }


    }
    const columns: ProColumns<IBook>[] = [

        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '_id',
            dataIndex: '_id',
            hideInSearch: true,
            render: (text, record) => (
                <a
                    onClick={() => {
                        setIsSelectedBook(record)
                        setIsOpen(true)
                    }}
                >
                    {text}
                </a>
            )
        },
        {
            title: 'Tên sách',
            dataIndex: 'name',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            valueType: 'money',
        },
        {
            title: 'Số lượng còn',
            dataIndex: 'stock',
            hideInSearch: true,
        },
        {
            title: 'Đã bán',
            dataIndex: 'soldQuantity',
            hideInSearch: true,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            hideInSearch: true,
        },
        {
            title: 'Action',
            hideInSearch: true,
            render(_, record) {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800"
                            style={{ cursor: 'pointer', marginRight: 15 }}
                            onClick={() => {
                                setIsOpenUpdate(true);
                                setIsSelectedBook(record)
                            }}
                        />
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa người dùng này?"

                            okText="Xóa"
                            cancelText="Hủy"
                            placement="topRight"
                            onConfirm={() => handleDeletBook(record._id)}
                        >
                            <DeleteTwoTone
                                twoToneColor="#ff4d4f"
                                style={{ cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </>
                )
            },
        }

    ];

    return (
        <>
            <ProTable<IBook>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort) => {
                    let query = `current=${params.current}&pageSize=${params.pageSize}`;
                    if (params.name) {
                        query += `&name=/${params.name}/i`;
                    }
                    if (params.author) {
                        query += `&author=/${params.author}/i`;
                    }

                    if (sort && sort.createdAt) {
                        const sortOrder = sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt';
                        query += `&sort=${sortOrder}`;
                    }

                    try {
                        const res = await getAllBooks(query);
                        if (res.data) {
                            setMeta(res.data.meta)
                        }
                        return {
                            data: res.data?.results,
                            page: 1,
                            success: true,
                            total: res.data?.meta.total,

                        }
                    } catch (err) {
                        message.error('Lỗi khi tải danh sách sách');
                        return {
                            data: [],
                            success: false,
                            total: 0,
                        };
                    }
                }}
                rowKey="_id"
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                pagination={{
                    pageSize: meta.pageSize,
                    current: meta.current,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => {
                        return <div>{range[0]}-{range[1]} trên {total}</div>;
                    },
                }}
                dateFormatter="string"
                headerTitle="Danh sách sách"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setIsOpenCeate(true)}
                    >
                        Thêm sách
                    </Button>,
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
            <DetailBook
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isSelectedBook={isSelectedBook}
                setIsSelectedBook={setIsSelectedBook}
            />
            <CreateBook
                isOpenCreate={isOpenCreate}
                setIsOpenCeate={setIsOpenCeate}
            />
            <UpdateBook
                isOpenUpdate={isOpenUpdate}
                setIsOpenUpdate={setIsOpenUpdate}
                isSelectedBook={isSelectedBook}
                setIsSelectedBook={setIsSelectedBook}
            />
        </>
    );

};

export default () => (
    <App>
        <ManagerBooks />
    </App>
);
