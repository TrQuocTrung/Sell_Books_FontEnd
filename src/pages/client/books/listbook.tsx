import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllBooks } from '@/service/api';
import { Spin, Card, message } from 'antd';
import './listbook.scss';

const { Meta } = Card;

const ListBook = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category');

    const urlImage = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const res = await getAllBooks({ category: categoryQuery });
                if (res.statusCode === 200) {
                    setBooks(res.data?.result || []);
                } else {
                    message.error('Không lấy được danh sách sách');
                }
            } catch (err: any) {
                message.error('Lỗi khi tải sách');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [categoryQuery]);

    return (
        <div className="listbook-container">
            <h2 className="listbook-title">
                {categoryQuery ? `Danh mục: ${categoryQuery}` : 'Tất cả sách'}
            </h2>
            {loading ? (
                <Spin />
            ) : (
                <div className="listbook-grid">
                    {books.map((book) => (
                        <Card
                            key={book._id}
                            hoverable
                            cover={
                                <Link to={`/books/${book._id}`}>
                                    <img
                                        src={`${urlImage}/images/books/${book.image}`}
                                        alt={book.name}
                                        onError={(e) =>
                                            (e.currentTarget.src = 'https://via.placeholder.com/150')
                                        }
                                        className="listbook-image"
                                    />
                                </Link>
                            }
                        >
                            <Meta title={book.name} description={`Giá: ${book.price.toLocaleString()}₫`} />
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListBook;
