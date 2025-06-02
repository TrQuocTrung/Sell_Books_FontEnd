import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Spin } from "antd";
import { Pie, Column } from "@ant-design/plots";
import { getAllBooks, getallOrderApi, getAllReview, getAlluserPagesinate } from "@/service/api";


const DashboardPage = () => {
    const [loading, setLoading] = useState(true);

    // Tổng quan
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [ordersByStatus, setOrdersByStatus] = useState<Record<string, number>>({});
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Dữ liệu biểu đồ
    const [topSellingBooks, setTopSellingBooks] = useState<
        { name: string; soldQuantity: number }[]
    >([]);
    const [avgRatingByBook, setAvgRatingByBook] = useState<
        { bookName: string; avgRating: number }[]
    >([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // 1. Lấy sách (lấy trang đầu, giả sử đủ lớn để có toàn bộ)
                const booksRes = await getAllBooks('');
                const books = booksRes.data?.results || [];
                setTotalBooks(booksRes.data?.meta.total || books.length);

                // 2. Lấy đơn hàng
                const ordersRes = await getallOrderApi("");
                const orders = ordersRes.data?.results || [];
                setTotalOrders(ordersRes.data?.meta.total || orders.length);

                // Tính doanh thu và đếm trạng thái đơn
                const statusCount: Record<string, number> = {};
                let revenueSum = 0;
                orders.forEach((order) => {
                    const status = order.status || "unknown";
                    statusCount[status] = (statusCount[status] || 0) + 1;
                    if (status === "confirmed") {
                        revenueSum += order.totalAmount || 0;
                    }
                });
                setOrdersByStatus(statusCount);
                setTotalRevenue(revenueSum);

                // 3. Lấy người dùng
                const usersRes = await getAlluserPagesinate("");
                setTotalUsers(usersRes.data?.meta.total || 0);

                // 4. Lấy đánh giá
                const reviewsRes = await getAllReview("");
                const reviews = reviewsRes.data?.results || [];
                setTotalReviews(reviewsRes.data?.meta.total || reviews.length);

                // 5. Top sách bán chạy (dựa vào soldQuantity)
                const sortedBooks = [...books]
                    .sort((a, b) => b.soldQuantity - a.soldQuantity)
                    .slice(0, 5)
                    .map((book) => ({ name: book.name, soldQuantity: book.soldQuantity }));
                setTopSellingBooks(sortedBooks);

                // 6. Tính rating trung bình theo sách
                // Map: bookId -> { sum, count }
                const ratingMap: Record<string, { sum: number; count: number; name: string }> = {};
                reviews.forEach((r) => {
                    const bookId = r.book._id;
                    if (!ratingMap[bookId]) {
                        ratingMap[bookId] = { sum: 0, count: 0, name: r.book.name };
                    }
                    ratingMap[bookId].sum += r.rating;
                    ratingMap[bookId].count += 1;
                });
                const avgRatingArr = Object.values(ratingMap).map(({ sum, count, name }) => ({
                    bookName: name,
                    avgRating: +(sum / count).toFixed(2),
                }));
                setAvgRatingByBook(avgRatingArr.slice(0, 5)); // lấy top 5 sách có đánh giá

            } catch (error) {
                console.error("Fetch dashboard data error", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Config Pie chart cho trạng thái đơn
    const orderStatusData = Object.entries(ordersByStatus).map(([status, value]) => ({
        type: status,
        value,
    }));

    const pieConfig = {
        appendPadding: 10,
        data: orderStatusData,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        label: {
            type: "spider",
            labelHeight: 28,
            content: "{name}\n{percentage}",
        },
        interactions: [{ type: "element-active" }],
    };

    // Config Column chart cho sách bán chạy
    const columnConfig = {
        data: topSellingBooks,
        xField: "name",
        yField: "soldQuantity",
        label: {
            position: "middle",
            style: { fill: "#FFFFFF", opacity: 0.6 },
        },
        xAxis: { label: { autoRotate: false } },
        meta: { soldQuantity: { alias: "Số lượng bán" }, name: { alias: "Tên sách" } },
    };

    // Config Column chart cho rating trung bình
    const ratingConfig = {
        data: avgRatingByBook,
        xField: "bookName",
        yField: "avgRating",
        label: {
            position: "top",
            style: { fill: "#000", opacity: 0.8 },
        },
        xAxis: { label: { autoRotate: false } },
        yAxis: { min: 0, max: 5 },
        meta: { avgRating: { alias: "Điểm đánh giá trung bình" }, bookName: { alias: "Tên sách" } },
    };

    if (loading) return <Spin size="large" style={{ marginTop: 100, display: "block" }} />;

    return (
        <div style={{ padding: 24 }}>
            <Row gutter={[16, 16]}>
                <Col span={4}>
                    <Card>
                        <Statistic title="Tổng số sách" value={totalBooks} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic title="Tổng số đơn hàng" value={totalOrders} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic title="Tổng số người dùng" value={totalUsers} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu (đơn vị VND)"
                            value={totalRevenue}
                            precision={0}
                            formatter={(value) => value.toLocaleString()}
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic title="Tổng số đánh giá" value={totalReviews} />
                    </Card>
                </Col>
            </Row>



            <Row style={{ marginTop: 40 }}>
                <Col span={24}>
                    <Card title="Điểm đánh giá trung bình theo từng sách">
                        <Column {...ratingConfig} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPage;
