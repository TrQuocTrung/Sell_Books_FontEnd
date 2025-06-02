import React, { useEffect, useState } from "react";
import { Modal, Table, InputNumber, Select, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import { updateOrderApi, updateOrderStatusApi } from "@/service/api";
import type { ActionType } from '@ant-design/pro-components';
const { Option } = Select;

interface IProps {
    isselectedOrder: IOrder | null;
    setisselectedOrder: (v: IOrder) => void;
    isOpenUpdate: boolean;
    setIsOpenUpdate: (v: boolean) => void;
    actionRef: React.MutableRefObject<ActionType | null>;
}

const allowedStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
    "complete",
] as const;

const UpdateOrder = (props: IProps) => {
    const { isselectedOrder, setisselectedOrder, isOpenUpdate, setIsOpenUpdate } =
        props;

    const [items, setItems] = useState<IOrder["items"]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<UpdateOrderStatusDto["status"]>('pending');
    const { message } = App.useApp()
    useEffect(() => {
        if (isselectedOrder) {
            setItems(isselectedOrder.items);
            setStatus(isselectedOrder.status as UpdateOrderStatusDto["status"]);
        }
    }, [isselectedOrder]);

    // Thay đổi số lượng item
    const handleQuantityChange = (value: number | null, itemId: string) => {
        if (value === null || value < 1) return;
        setItems((prev) =>
            prev.map((item) => (item._id === itemId ? { ...item, quantity: value } : item))
        );
    };

    // Thay đổi trạng thái
    const handleStatusChange = (value: IOrder["status"]) => {
        setStatus(value as UpdateOrderStatusDto["status"]);
    };

    // Tính tổng tiền theo items
    const totalAmount = items.reduce(
        (sum, item) => sum + item.book!.price * item.quantity,
        0
    );

    // Xử lý lưu update (items và status)
    const handleSubmit = async () => {
        if (!isselectedOrder) return;
        setLoading(true);
        try {
            // 1. Update items
            const dataItems = {
                items: items.map((item) => ({
                    book: item.book!._id,
                    quantity: item.quantity,
                })),
            };
            await updateOrderApi(isselectedOrder._id, dataItems);

            // 2. Update status (nếu khác status cũ)
            if (status !== isselectedOrder.status) {
                await updateOrderStatusApi(isselectedOrder._id, { status });
            }

            // Cập nhật lại state order
            setisselectedOrder({
                ...isselectedOrder,
                items,
                totalAmount,
                status,
            });

            message.success("Cập nhật đơn hàng thành công");
            props.actionRef.current?.reload();
            setIsOpenUpdate(false);
        } catch (error) {
            console.error("Update order error", error);
            message.error("Cập nhật đơn hàng thất bại");
        } finally {
            setLoading(false);
        }
    };

    // Cấu hình columns bảng
    const columns: ColumnsType<IOrder["items"][0]> = [
        {
            title: "Tên sách",
            dataIndex: ["book", "name"],
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: ["book", "price"],
            key: "price",
            render: (price: number) =>
                price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number, record) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => handleQuantityChange(value, record._id)}
                />
            ),
        },
        {
            title: "Thành tiền",
            key: "total",
            render: (_, record) =>
                (record.book?.price! * record.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }),
        },
    ];

    return (
        <Modal
            title="Cập nhật đơn hàng"
            open={isOpenUpdate}
            onCancel={() => setIsOpenUpdate(false)}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Lưu"
            cancelText="Hủy"
            width={700}
        >
            {/* Select status */}
            <div style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: "bold", marginRight: 12 }}>Trạng thái:</span>
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    style={{ width: 200 }}
                    disabled={loading}
                >
                    {allowedStatuses.map((st) => (
                        <Option key={st} value={st}>
                            {st.charAt(0).toUpperCase() + st.slice(1)}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Bảng items */}
            <Table
                columns={columns}
                dataSource={items}
                pagination={false}
                rowKey={(record) => record._id}
                footer={() => (
                    <div style={{ textAlign: "right", fontWeight: "bold", fontSize: 16 }}>
                        Tổng tiền:{" "}
                        {totalAmount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </div>
                )}
            />
        </Modal>
    );
};

export default UpdateOrder;
