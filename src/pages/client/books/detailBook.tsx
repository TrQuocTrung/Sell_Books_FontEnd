import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "@/service/api";
import "./DetailBook.scss";
import { useCart } from "@/components/context/CartContext";
import { message } from "antd";

interface IBook {
    _id: string;
    name: string;
    author: string;
    image: string;
    description: string;
    price?: number;
    publisher?: string; // Thêm publisher
    ageRange?: string; // Thêm độ tuổi
    format?: string; // Thêm hình thức
}

const DetailBook = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<IBook | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const urlImage = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                if (!id) {
                    setError("Không tìm thấy ID sách.");
                    return;
                }
                const res = await getBookById(id);
                if (res.statusCode === 200 && res.data) {
                    setBook(res.data);
                } else {
                    setError("Không thể tải chi tiết sách: " + (res.message || "Dữ liệu không hợp lệ"));
                }
            } catch (error) {
                setError("Lỗi khi tải chi tiết sách: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);
    const handleAddToCart = () => {
        if (!book) return;

        addToCart({
            book: book._id,
            title: book.name,
            quantity: 1,
            price: book.price || 0,
            image: `${urlImage}/images/books/${book.image}`,
        });

        message.success("Đã thêm vào giỏ hàng!")
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    if (!book) return <div>Không tìm thấy sách.</div>;

    return (
        <div className="detail-book-container" >
            <div className="detail-book">
                {/* Phần hình ảnh sách */}
                <div className="book-image">
                    <img
                        src={`${urlImage}/images/books/${book.image}`}
                        alt={book.name}
                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x400")}
                    />
                </div>

                {/* Phần thông tin sách */}
                <div className="book-info">
                    <h1 className="book-title">{book.name}</h1>
                    <p className="book-author">
                        <strong>Tác giả:</strong> {book.author || "Không rõ"}
                    </p>
                    <p className="book-price">
                        <strong>Giá:</strong>{" "}
                        {book.price ? `${book.price.toLocaleString()}đ` : "Chưa có giá"}
                    </p>
                    <p className="book-short-desc">{book.description.slice(0, 150)}...</p>

                    {/* Thông tin chi tiết */}
                    <div className="book-details">
                        <p><strong>Nhà xuất bản:</strong> {book.publisher || "Không rõ"}</p>
                        <p><strong>Độ tuổi:</strong> {book.ageRange || "Không rõ"}</p>
                        <p><strong>Hình thức:</strong> {book.format || "Không rõ"}</p>
                    </div>

                    {/* Nút hành động */}
                    <div className="book-actions">
                        <button className="buy-now" >Mua ngay</button>
                        <button className="add-to-cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>

            {/* Phần mô tả dài */}
            <div className="book-description">
                <h2>Giới thiệu sách</h2>
                <p>{book.description}</p>
            </div>

        </div>
    );
};

export default DetailBook;