import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById, getReviewById } from "@/service/api";
import "./DetailBook.scss";
import { useCart } from "@/components/context/CartContext";
import { message } from "antd";
import { Avatar, Rate, Typography, Space } from "antd";
const { Text } = Typography;
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
const ReviewItem = ({ review }: { review: IReview }) => {
    return (
        <div style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
            <Space direction="vertical" size={4} style={{ width: "100%" }}>
                <Space>
                    <Avatar>{review.createdBy?.email?.[0].toUpperCase() || "U"}</Avatar>
                    <Text strong>{review.createdBy?.email || "Người dùng"}</Text>
                </Space>
                <Rate disabled value={review.rating} />
                <Text>{review.comment}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    {new Date(review.createdAt).toLocaleString("vi-VN")}
                </Text>
            </Space>
        </div>
    );
};
const DetailBook = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<IBook | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const urlImage = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    const [reviews, setReviews] = useState<IReview[]>([]);

    const { addToCart } = useCart();
    useEffect(() => {
        const fetchBookAndReviews = async () => {
            setLoading(true);
            try {
                if (!id) {
                    setError("Không tìm thấy ID sách.");
                    return;
                }

                const [bookRes, reviewRes] = await Promise.all([
                    getBookById(id),
                    getReviewById(id)
                ]);

                if (bookRes.statusCode === 200 && bookRes.data) {
                    setBook(bookRes.data);
                } else {
                    setError("Không thể tải chi tiết sách");
                }

                if (reviewRes.statusCode === 200 && reviewRes.data) {
                    setReviews(reviewRes.data);
                }

            } catch (error) {
                setError("Lỗi khi tải dữ liệu sách: " + (error instanceof Error ? error.message : "Không rõ"));
            } finally {
                setLoading(false);
            }
        };

        fetchBookAndReviews();
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
        <>
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
            <div className="book-reviews">
                <h2>Đánh giá ({reviews.length})</h2>

                {reviews.length === 0 ? (
                    <p>Chưa có đánh giá nào cho sách này.</p>
                ) : (
                    reviews.map((review) => <ReviewItem key={review._id} review={review} />)
                )}
            </div>

        </>
    );
};

export default DetailBook;