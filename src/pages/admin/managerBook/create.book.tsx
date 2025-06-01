import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Upload,
    Space,
    Modal,
    App,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAllCategories } from '@/service/api';
import { createBookApi } from '@/service/api';

interface IProp {
    isOpenCreate: boolean;
    setIsOpenCeate: (v: boolean) => void;
}

const CreateBook = (props: IProp) => {
    const { isOpenCreate, setIsOpenCeate } = props;
    const [form] = Form.useForm();
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const { message } = App.useApp()
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                const categories = res.data?.results.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                }));
                setCategoryOptions(categories!);
            } catch (err) {
                message.error('Lỗi khi tải danh mục!');
            }
        };
        fetchCategories();
    }, []);

    const onFinish = async (values: IBookForm) => {
        if (fileList.length === 0) {
            return message.warning('Vui lòng upload ảnh sách!');
        }
        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('author', values.author);
            formData.append('description', values.description || '');
            formData.append('price', values.price.toString());
            formData.append('stock', values.stock.toString());
            formData.append('soldQuantity', values.soldQuantity.toString());
            values.categories.forEach((catId: string) => {
                formData.append('categories', catId);
            });
            formData.append('fileUpload', fileList[0].originFileObj);
            const res = await createBookApi(formData);
            console.log("Check res", res)
            if (res.statusCode === 201) {
                message.success(res.message);
                form.resetFields();
                setFileList([]);
                setIsOpenCeate(false);
            } else {
                message.error(res.data.message)
            }

        } catch (err) {
            console.error(err);
            message.error('Tạo sách thất bại!');
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setIsOpenCeate(false);
    };

    return (
        <Modal
            title="Tạo sách mới"
            open={isOpenCreate}
            onCancel={handleCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Tên sách" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="author" label="Tác giả" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="stock" label="Số lượng còn" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="soldQuantity" label="Đã bán" initialValue={0}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="categories" label="Danh mục" rules={[{ required: true }]}>
                    <Select
                        mode="multiple"
                        options={categoryOptions}
                        placeholder="Chọn danh mục"
                    />
                </Form.Item>

                <Form.Item label="Ảnh sách" required>
                    <Upload
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={({ fileList }) => setFileList(fileList.slice(-1))}
                        accept="image/*"
                        maxCount={1}
                        listType="picture"
                    >
                        <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={uploading}>
                            Tạo sách
                        </Button>
                        <Button onClick={handleCancel}>Hủy</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateBook;
