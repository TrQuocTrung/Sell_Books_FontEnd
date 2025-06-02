import { FORMATE_DATE_VN } from "@/service/helper"
import { Drawer, Descriptions, Rate, Typography } from "antd"
import dayjs from "dayjs"

interface IProps {
    isSelectReview: IReview | null
    setIsSelectReview: (v: IReview | null) => void
    isOpenDetail: boolean
    setIsOpenDetail: (v: boolean) => void
}

const DetailReview = (props: IProps) => {
    const { isSelectReview, setIsSelectReview, isOpenDetail, setIsOpenDetail } = props

    const onClose = () => {
        setIsOpenDetail(false)
        setIsSelectReview(null)
    }

    return (
        <Drawer
            title="Chi tiết đánh giá"
            placement="right"
            width={500}
            onClose={onClose}
            open={isOpenDetail}
        >
            {isSelectReview ? (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Tên sách">
                        {typeof isSelectReview.book === 'string'
                            ? isSelectReview.book
                            : isSelectReview.book?.name || 'Không rõ'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Số sao">
                        <Rate disabled defaultValue={isSelectReview.rating} />
                    </Descriptions.Item>

                    <Descriptions.Item label="Bình luận">
                        <Typography.Paragraph>
                            {isSelectReview.comment}
                        </Typography.Paragraph>
                    </Descriptions.Item>

                    <Descriptions.Item label="Người tạo">
                        {typeof isSelectReview.createdBy === 'object'
                            ? isSelectReview.createdBy.email
                            : isSelectReview.createdBy}
                    </Descriptions.Item>

                    <Descriptions.Item label="Ngày tạo">
                        {dayjs(isSelectReview.createdAt).format(FORMATE_DATE_VN)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Ngày cập nhật">
                        {dayjs(isSelectReview.updatedAt).format(FORMATE_DATE_VN)}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <Typography.Text>Không có dữ liệu</Typography.Text>
            )}
        </Drawer>
    )
}

export default DetailReview
