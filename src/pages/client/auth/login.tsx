import { Button, Checkbox, Divider, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { Link } from 'react-router-dom';
import './login.scss'; // Assuming you have a CSS file for styling
import { useState } from 'react';
const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='form-login'>
            <div className='main'>
                <section className='wrapper'>
                    <div className='header-title'>Đăng Nhập</div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                        <div className='footer-form'>
                            <Divider>Or</Divider>
                            <Form.Item className='footer-title'>Chưa có Tài Khoản ? <Link to={"/register"}>Đăng Ký</Link></Form.Item>
                        </div>

                    </Form>
                </section>
            </div>
        </div>

    )
}
export default LoginPage;