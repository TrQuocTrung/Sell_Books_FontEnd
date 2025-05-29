import './emailfooter.scss'
const EmailFooter = () => {
    return (
        <>
            <div className="content-footer">
                <div className="main">
                    <div className="content-left">
                        <h3>Đăng Ký Nhận Email</h3>
                        <p>Đăng ký nhận thông tin sách mới,sách bán</p>
                    </div>
                    <div className="content-center">
                        <input placeholder="Nhập email"></input>
                    </div>
                    <div className="content-right">
                        <button>Đăng Ký Ngay</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default EmailFooter