import type { FormProps } from 'antd';
import { App, Button, Checkbox, Divider, Form, Input, InputNumber, notification, Select } from 'antd';
import { useState } from 'react';
import './register.scss'
import { registerApi } from '@/service/api';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { Option } = Select;
    const [isSubmit, setIsSubmit] = useState(false);
    const { notification } = App.useApp()
    const navigate = useNavigate();
    type FieldType = {
        username: string;
        email: string;
        password: string;
        fullname: string;
        address: string;
        gender: string;
        age: number;
        phone: string;
        remember: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const userResgister = {
            username: values.username,
            email: values.email,
            password: values.password,
            profile: {
                fullname: values.fullname,
                address: values.address,
                gender: values.gender,
                age: values.age,
                phone: Number(values.phone)
            }
        }

        const res = await registerApi(userResgister);
        if (res.data && res.statusCode === 200) {
            notification.success({
                message: res.message,
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigate('/login', {});
        }
        else {
            notification.error({
                message: res.message,
            });
        }
        setIsSubmit(false);

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <div className='register-page'>
            <div className='main'>
                <section className='wapper'>
                    <div className='headding'>
                        <h2 className='text text-large'>Đăng Ký Tài Khoản</h2>
                    </div>
                    <Divider />
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >  <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui Lòng Nhập Email Của Bạn' }]}
                    >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Vui Lòng Nhập Tên Đăng Nhập Của Bạn' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Vui Lòng Nhập Passwword' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Full Name"
                            name="fullname"
                            rules={[{ required: true, message: 'Vui Lòng Nhập Họ Tên Của Bạn' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Vui Lòng Nhập địa chỉ Của Bạn' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                            <Select
                                placeholder="Choose Gender"
                                allowClear
                            >
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        </Form.Item>


                        <Form.Item<FieldType>
                            label="Age"
                            name="age"
                            rules={[
                                { required: true, message: 'Vui Lòng Nhập Tuổi Của Bạn' },
                                { type: 'number', message: 'Tuổi phải là số' },
                                { type: 'number', min: 1, max: 100, message: 'Tuổi phải từ 1 đến 100' },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Vui Lòng Nhập Số Điện Thoại Của Bạn' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <span>Đã có tài khoản? </span>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                </section>
            </div>

        </div>

    )
}
export default () => <App>
    <RegisterPage />
</App>
