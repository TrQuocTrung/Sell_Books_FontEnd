import { Drawer, Descriptions, Button } from 'antd';
import type { FC } from 'react';

interface IProp {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    isSelectedBook: IBook | null;
    setIsSelectedBook: (v: IBook | null) => void;
}

const DetailBook: FC<IProp> = ({ isOpen, setIsOpen, isSelectedBook, setIsSelectedBook }) => {
    const onClose = () => {
        setIsOpen(false);
        setIsSelectedBook(null);
    };

    return (
        <Drawer
            title="Chi tiết sách"
            placement="right"
            onClose={onClose}
            open={isOpen}
            width={500}
            extra={
                <Button onClick={onClose} type="default">
                    Đóng
                </Button>
            }
        >
            {isSelectedBook ? (
                <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="Tên sách">{isSelectedBook.name}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{isSelectedBook.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá">{isSelectedBook.price.toLocaleString()}₫</Descriptions.Item>

                    <Descriptions.Item label="Image Book">
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/images/books/${isSelectedBook.image}`}
                            alt={isSelectedBook.name}
                            style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Còn lại">{isSelectedBook.stock}</Descriptions.Item>
                    <Descriptions.Item label="Đã bán">{isSelectedBook.soldQuantity}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {new Date(isSelectedBook.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {new Date(isSelectedBook.updatedAt).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <p>Không có thông tin sách.</p>
            )}
        </Drawer>
    );
};

export default DetailBook;
