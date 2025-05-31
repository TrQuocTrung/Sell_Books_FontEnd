import { getAlluserPagesinate } from '@/service/api';
import { DeleteTwoTone, EditTwoTone, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

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


const columns: ProColumns<IUserTable>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '_id',
        dataIndex: '_id',
        hideInSearch: true
    },
    {
        title: 'User Name',
        dataIndex: 'username',
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

    },
    {
        title: 'Phone',
        dataIndex: ['profile', 'phone'],
    },
    {
        title: 'Age',
        dataIndex: ['profile', 'age'],
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        valueType: 'dateTime',
    },
    {
        title: 'Action',
        hideInSearch: true,
        render(dom, entity, index, action, schema) {
            return (
                <>
                    <EditTwoTone
                        twoToneColor="#f57800"
                        style={{ cursor: 'pointer', marginRight: 15 }}
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

const ManagerUsers = () => {
    const actionRef = useRef<ActionType | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    return (
        <ProTable<IUserTable>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                const res = await getAlluserPagesinate(params?.current ?? 1, params?.pageSize ?? 5)
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
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
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
    );
};
export default ManagerUsers;