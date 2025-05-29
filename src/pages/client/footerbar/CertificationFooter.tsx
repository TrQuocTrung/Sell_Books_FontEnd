import './certificationfooter.scss';

const CertificationFooter = () => {
    return (
        <div className="certification-footer">
            <div className="certification-left">
                <a href="http://online.gov.vn" target="_blank" rel="noopener noreferrer">
                    <img
                        src="footer_logobct.webp"
                        alt="Đã thông báo với Bộ Công Thương"
                        className="certification-badge"
                    />
                </a>
            </div>
            <div className="certification-right">
                <h4>CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ MÊ KÔNG COM</h4>
                <p>
                    Địa chỉ: 332 Lũy Bán Bích, Phường Hòa Thạnh, Quận Tân Phú, Hồ Chí Minh, Việt Nam<br />
                    MST: 0303615027 do Sở Kế hoạch và Đầu tư Tp.HCM cấp ngày 10/03/2011<br />
                    Tel: 028.73008182 - Fax: 028.39733234 - Email: <a href="mailto:info@vinabook.com">info@vinabook.com</a>
                </p>
            </div>
        </div>
    );
};

export default CertificationFooter;