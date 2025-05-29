import { Link } from 'react-router-dom';
import './footer.scss';

const FooterLayout = () => {
    return (
        <div className="footer">
            <div className="footer-section">
                <h3>VỀ CÔNG TY</h3>
                <ul>
                    <li><Link to={'./about'}>Giới thiệu công ty</Link></li>
                    <li>Tuyển dụng</li>
                    <li>Chương trình đại lý</li>
                    <li>Chính sách bảo mật</li>
                    <li>Chính sách đổi trả</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>TRỢ GIÚP</h3>
                <ul>
                    <li>Quy định sử dụng</li>
                    <li>Hướng dẫn mua hàng</li>
                    <li>Phương thức thanh toán</li>
                    <li>Phương thức vận chuyển</li>
                    <li>Ứng dụng đọc ebook</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>TIN TỨC SÁCH</h3>
                <ul>
                    <li>Tin tức</li>
                    <li>Chân dung</li>
                    <li>Điểm sách</li>
                    <li>Phê bình</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>CHẤP NHẬN THANH TOÁN</h3>
                <div className="payment-logos ">
                    <div className='payment-img-1'>
                        <img src="footer_logo_payment_1.webp" alt="Visa" />
                        <img src="footer_logo_payment_2.webp" alt="MasterCard" />
                        <img src="footer_logo_payment_3.webp" alt="JCB" />
                    </div>
                    <div className='payment-img-2'>
                        <img src="footer_logo_payment_4.webp" alt="ATM" />
                        <img src="footer_logo_payment_5.webp" alt="Tiền Mặt" />
                        <img src="footer_logo_payment_6.webp" alt="Payoo" />
                    </div>

                </div>
                <div className="secure-payment">
                    <h4>THANH TOÁN AN TOÀN</h4>
                    <div className="secure-logos">
                        <img src="footer_logo_payment_7.webp" alt="Verified by Visa" />
                        <img src="footer_logo_payment_8.webp" alt="MasterCard SecureCode" />
                        <img src="footer_logo_payment_9.webp" alt="OnePay" />
                    </div>
                </div>
            </div>
            <div className="footer-section">
                <h3>ĐỐI TÁC VẬN CHUYỂN</h3>
                <div className="shipping-logos">
                    <img src="footer_logo_shipment_1.webp" alt="Vinabook" />
                    <img src="footer_logo_shipment_2.webp" alt="GHN" />
                    <img src="footer_logo_shipment_3.webp" alt="Vietnam Post" />
                </div>
                <h3>ĐỐI TÁC BÁN HÀNG</h3>
                <div className="selling-logos">
                    <img src="footer_logo_seller_1.webp" alt="Lazada" />
                    <img src="footer_logo_seller_2.webp" alt="Shopee" />
                    <img src="footer_logo_seller_3.webp" alt="TikTok" />
                </div>
            </div>
        </div>
    );
};

export default FooterLayout;