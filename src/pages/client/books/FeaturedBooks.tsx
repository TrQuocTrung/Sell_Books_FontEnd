import { getAllBooks } from "@/service/api";
import { useEffect, useState } from "react";
import './FeaturedBooks.scss';

interface IBook {
    _id: string;
    name: string;
    author: string;
    image: string;
    description: string;
    price?: number; // Price là tùy chọn vì dữ liệu API không có
}

const FeaturedBooks = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const urlImage = import.meta.env.VITE_BASE_URL || "http://localhost:8080"; // Fallback nếu không có VITE_BASE_URL

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const res = await getAllBooks();
                const result = res.data.result;
                console.log("Kết quả từ API:", result);
                if (res.statusCode === 200 && Array.isArray(result)) {
                    setBooks(result);
                } else {
                    setError("Không thể tải danh sách sách: " + (res.message || "Dữ liệu không hợp lệ"));
                }
            } catch (error) {
                setError("Lỗi khi tải sách: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="featured-books">
            <div className="section-title">Sách Nổi Bật</div>
            <div className="book-grid">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book._id} className="book-item">
                            <div className="book-image">
                                <img
                                    src={`${urlImage}/images/books/${book.image}`}
                                    alt={book.name}
                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                />
                            </div>
                            <div className="book-title">{book.name}</div>
                            <div className="book-price">
                                {book.price ? `${book.price.toLocaleString()}đ` : "Chưa có giá"}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Không có sách để hiển thị.</div>
                )}
            </div>
        </div>
    );
};

export default FeaturedBooks;