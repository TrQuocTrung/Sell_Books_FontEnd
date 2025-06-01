import { getAllCategories, updateBookApi } from '@/service/api';
import { PlusOutlined } from '@ant-design/icons';
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
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

interface IProps {
    isOpenUpdate: boolean;
    setIsOpenUpdate: (v: boolean) => void;
    isSelectedBook: IBook | null;
    setIsSelectedBook: (book: IBook | null) => void;
}

const UpdateBook = (props: IProps) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const { isOpenUpdate, setIsOpenUpdate, isSelectedBook, setIsSelectedBook } = props;
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const urlImage = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

    const handleCancel = () => {
        setIsOpenUpdate(false);
        setIsSelectedBook(null);
        form.resetFields();
        setFileList([]);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                const categories = res.data?.results.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                }));
                setCategoryOptions(categories || []);
            } catch (err) {
                message.error('Lỗi khi tải danh mục!');
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isSelectedBook) {
            form.setFieldsValue({
                ...isSelectedBook,
                categories: isSelectedBook.categories.map(c => c._id),
            });

            if (isSelectedBook.image) {
                setFileList([
                    {
                        uid: '-1',
                        name: isSelectedBook.image,
                        status: 'done',
                        url: `${urlImage}/images/books/${isSelectedBook.image}`,

                    },
                ]);
            }
        }
    }, [isSelectedBook]);

    const handleSubmit = async (values: any) => {
        if (!isSelectedBook) return;
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('author', values.author);
        formData.append('description', values.description || '');
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('soldQuantity', values.soldQuantity || 0);
        values.categories.forEach((catId: string) => {
            formData.append('categories', catId);
        });

        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('image', fileList[0].originFileObj);
        }

        setUploading(true);
        try {
            const res = await updateBookApi(isSelectedBook._id, formData);
            if (res.statusCode === 200) {
                message.success(res.message || 'Cập nhật sách thành công');
                handleCancel();
            } else {
                message.error(res.message || 'Cập nhật sách thất bại');
            }
        } catch (error) {
            message.error('Lỗi hệ thống khi cập nhật sách!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Modal
            title="Cập nhật sách"
            open={isOpenUpdate}
            onCancel={handleCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

                <Form.Item name="soldQuantity" label="Đã bán">
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="categories" label="Danh mục" rules={[{ required: true }]}>
                    <Select
                        mode="multiple"
                        options={categoryOptions}
                        placeholder="Chọn danh mục"
                    />
                </Form.Item>

                <Form.Item label="Ảnh sách">
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={1}
                        listType="picture"
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                    >
                        <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={uploading}>
                            Cập nhật sách
                        </Button>
                        <Button onClick={handleCancel}>Hủy</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateBook;
