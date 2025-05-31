import { useEffect, useState } from "react";
import { Form, Input, Select, InputNumber, Button, Drawer, App } from "antd";
import { createUser, getallRole } from "@/service/api";

interface IProps {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

const CreateUser = (props: IProps) => {
    const { isOpen, setIsOpen } = props;
    const [roles, setRoles] = useState<IRole[]>([]);
    const [form] = Form.useForm();
    const { notification } = App.useApp()
    useEffect(() => {
        getallRole().then((res) => {
            setRoles(res.data.results);
        });
    }, []);

    const onClose = () => {
        setIsOpen(false);
        form.resetFields();
    };
    const onFinish = async (values: IUserForm) => {

        const res = await createUser(values);
        console.log("Check respone", res);

        if (res.data && res.statusCode === 201) {
            notification.success({
                message: "Tạo User Thành Công",
            });
            form.resetFields()
            setIsOpen(false);
        } else {
            notification.error({
                message: res.message
            });
        }
    };
    return (
        <Drawer
            title="Tạo Người Dùng Mới"
            placement="right"
            width={500}
            onClose={onClose}
            open={isOpen}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ profile: { gender: "male" } }}
            >
                <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                    <Input.Password />
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

                <Form.Item name={["profile", "fullname"]} label="Họ và tên">
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

                <Form.Item name={["profile", "phone"]} label="Số điện thoại" rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    { pattern: /^(\+?\d{1,4}|\d{1,4})?\d{6,10}$/, message: "Số điện thoại không hợp lệ" }
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item name={["profile", "age"]} label="Tuổi">
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Tạo User
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>

    );
};


export default CreateUser
