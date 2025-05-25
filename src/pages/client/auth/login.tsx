import { App, Button, Checkbox, Divider, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss'; // Assuming you have a CSS file for styling
import { useState } from 'react';
import { loginApi } from '@/service/api';
import { useCurrentApp } from '@/components/context/app.context';
const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useCurrentApp();
    type FieldType = {
        username: string;
        password: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const userLogin = {
            username: values.username,
            password: values.password,
        }
        setIsSubmit(true);
        const res = await loginApi(userLogin.username, userLogin.password);
        if (res.data && res.statusCode === 200) {
            localStorage.setItem('access_token', res.data.access_token);
            setIsAuthenticated(true);
            setUser(res.data.user);
            message.success(res.message);
            // await new Promise(resolve => setTimeout(resolve, 2000));
            setTimeout(() => {
                navigate('/');
            }, 2000)
            // navigate('/');
            //
        } else {
            message.error(res.message);
        }
        setIsSubmit(false);
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
                            label="Username or Email"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username or email!' }]}
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
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
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
export default () => (
    <App>
        <LoginPage />
    </App>
);