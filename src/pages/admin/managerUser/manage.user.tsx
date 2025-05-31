import { getAlluserPagesinate } from '@/service/api';
import { dateRangeValidate } from '@/service/helper';
import { DeleteTwoTone, EditTwoTone, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Dropdown } from 'antd';
import { useRef, useState } from 'react';
import DetailUser from './detail.user';
import CreateUser from './create.user';
import UpdateUser from './update.user';

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};
type TSearch = {
    fullname: string,
    email: string,
    createdAt: string,
    createdAtRange: string
}



const ManagerUsers = () => {
    const actionRef = useRef<ActionType | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUserTable | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const [updateUserOpen, setUpdateUserOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState<IUserTable | null>(null);
    const columns: ProColumns<IUserTable>[] = [
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
                        setSelectedUser(record);
                        setOpenDrawer(true);
                    }}
                >
                    {text}
                </a>
            )
        }
        ,
        {
            title: 'User Name',
            dataIndex: 'username',
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Full Name',
            dataIndex: ['profile', 'fullname'],
        },
        {
            title: 'Gender',
            dataIndex: ['profile', 'gender'],
            hideInSearch: true

        },
        {
            title: 'Phone',
            dataIndex: ['profile', 'phone'],
            hideInSearch: true
        },
        {
            title: 'Age',
            dataIndex: ['profile', 'age'],
            hideInSearch: true
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            hideInSearch: true,
            sorter: true

        },
        {
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true

        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
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
                                setUserToUpdate(record);
                                setUpdateUserOpen(true);
                            }}
                        />
                        <DeleteTwoTone
                            twoToneColor="#ff4d4f"
                            style={{ cursor: 'pointer' }}

                        />
                    </>
                )
            },
        }

    ];

    return (
        <>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort) => {
                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                        if (params.email) {
                            query += `&email=/${params.email}/i`
                        }
                        if (params.fullname) {
                            query += `&profile.fullname=/${params.fullname}/i`
                        }
                        const createdDateRange = dateRangeValidate(params.createdAtRange)
                        if (createdDateRange) {
                            query += `&createdAt>=${createdDateRange[0]}&createdAt<=${createdDateRange[1]}`
                        }
                        if (sort && sort.createdAt) {
                            const sortOrder = sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt';
                            query += `&sort=${sortOrder}`;
                        }
                    }
                    console.log("check query", query)
                    const res = await getAlluserPagesinate(query)
                    await waitTime(2000);
                    if (res.data) {
                        setMeta(res.data.meta)
                    }
                    return {
                        data: res.data?.results,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total,

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
                    showTotal: (total, range) => { return (<div>{range[0]}-{range[1]} trên {total}</div>) }
                }}
                dateFormatter="string"
                headerTitle="Table User"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => setIsOpen(true)}
                        type="primary"
                    >
                        Thêm User
                    </Button>,
                    <Dropdown
                        key="menu"
                        menu={{
                            items: [
                                {
                                    label: '1st item',
                                    key: '1',
                                },
                                {
                                    label: '2nd item',
                                    key: '2',
                                },
                                {
                                    label: '3rd item',
                                    key: '3',
                                },
                            ],
                        }}
                    >
                        <Button>
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>,
                ]}
            />
            <DetailUser
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
            <CreateUser
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            {updateUserOpen && userToUpdate && (
                <UpdateUser
                    updateUserOpen={updateUserOpen}
                    setUpdateUserOpen={setUpdateUserOpen}
                    userToUpdate={userToUpdate}
                    setUserToUpdate={setUserToUpdate}
                />
            )}
        </>
    );
};
export default () => <App>
    <ManagerUsers />
</App>;