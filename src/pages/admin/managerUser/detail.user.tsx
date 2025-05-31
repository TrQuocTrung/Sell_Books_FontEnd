import { Button, Drawer } from "antd";
import './detail.user.scss'
import dayjs from "dayjs";
import { FORMATE_DATE_VN } from "@/service/helper";
interface IProps {
    openDrawer: boolean,
    setOpenDrawer: (v: boolean) => void,
    selectedUser: IUserTable | null,
    setSelectedUser: (v: IUserTable | null) => void
}
const DetailUser = (props: IProps) => {
    const { openDrawer, setOpenDrawer, selectedUser, setSelectedUser } = props

    const onClose = () => {
        setOpenDrawer(false);
        setSelectedUser(null)
    };
    return (
        <>
            <Drawer
                title="Thông Tin Chi Tiết User"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={openDrawer}
                width={"30vw"}
                className="detail-user-drawer"
            >
                <div className="user-info">
                    <p><span>Username:</span> {selectedUser?.username || 'Chưa Cập Nhật'}</p>
                    <p><span>Email:</span> {selectedUser?.email || 'Chưa Cập Nhật'}</p>
                    <p><span>Full Name:</span> {selectedUser?.profile?.fullname || 'Chưa Cập Nhật'}</p>
                    <p><span>Address:</span> {selectedUser?.profile?.address || 'Chưa Cập Nhật'}</p>
                    <p><span>Gender:</span> {selectedUser?.profile?.gender || 'Chưa Cập Nhật'}</p>
                    <p><span>Phone:</span> {selectedUser?.profile?.phone || 'Chưa Cập Nhật'}</p>
                    <p><span>Age:</span> {selectedUser?.profile?.age || 'Chưa Cập Nhật'}</p>
                    <p><span>CreatedAt :</span> {dayjs(selectedUser?.createdAt).format(FORMATE_DATE_VN)}</p>
                </div>
            </Drawer>

        </>
    );

}
export default DetailUser;