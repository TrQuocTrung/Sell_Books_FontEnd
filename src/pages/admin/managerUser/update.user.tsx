import { useEffect, useState } from "react";
import { Form, Input, Select, InputNumber, Button, Drawer, App } from "antd";
import { updateUserApi, getallRole } from "@/service/api";

interface IProps {
    updateUserOpen: boolean;
    setUpdateUserOpen: (v: boolean) => void;
    userToUpdate: IUserTable;
    setUserToUpdate: (v: IUserTable | null) => void;
}

const UpdateUser = (props: IProps) => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const [roles, setRoles] = useState<IRole[]>([]);
    const { updateUserOpen, setUpdateUserOpen, userToUpdate, setUserToUpdate } = props
    useEffect(() => {
        if (updateUserOpen && userToUpdate) {
            form.setFieldsValue({
                username: userToUpdate.username,
                email: userToUpdate.email,
                role: userToUpdate.role,
                profile: {
                    fullname: userToUpdate.profile?.fullname || '',
                    phone: userToUpdate.profile?.phone || '',
                    address: userToUpdate.profile?.address || '',
                    gender: userToUpdate.profile?.gender || '',
                    age: userToUpdate.profile?.age || null,
                },
            });
        }
    }, [updateUserOpen, userToUpdate, form]);

    const onClose = () => {
        setUpdateUserOpen(false);
        form.resetFields();
    };

    const onFinish = async (values: any) => {
        try {
            const res = await updateUserApi(userToUpdate._id, values);
            if (res.statusCode === 200) {
                notification.success({
                    message: "Cập nhật thành công",
                });
                onClose();
            } else {
                notification.error({
                    message: "Lỗi",
                    description: res.message || "Cập nhật thất bại",
                });
            }
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Lỗi không xác định",
            });
        }
    };

    return (
        <Drawer
            title="Cập nhật người dùng"
            placement="right"
            width={500}
            onClose={onClose}
            open={updateUserOpen}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>

                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input disabled />
                </Form.Item>

                <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
                    <Select placeholder="Chọn vai trò">
                        {roles.map((role) => (
                            <Select.Option key={role._id} value={role._id}>
                                {role.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name={["profile", "fullname"]} label="Họ và tên" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name={["profile", "phone"]}
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại" },
                        { pattern: /^(\+?\d{1,4}|\d{1,4})?\d{6,10}$/, message: "Số điện thoại không hợp lệ" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name={["profile", "address"]} label="Địa chỉ">
                    <Input />
                </Form.Item>

                <Form.Item name={["profile", "gender"]} label="Giới tính">
                    <Select>
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                        <Select.Option value="other">Khác</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name={["profile", "age"]} label="Tuổi">
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default UpdateUser;
