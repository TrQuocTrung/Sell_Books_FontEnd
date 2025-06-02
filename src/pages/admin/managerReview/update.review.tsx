import { updateReviewApi } from "@/service/api"
import type { ActionType } from "@ant-design/pro-components"
import { Drawer, Form, Input, Rate, Button, App } from "antd"
import { useEffect } from "react"

interface IProps {
    isOpenUpdateReview: boolean
    setisOpenUpdateReview: (v: boolean) => void
    isSelectReview: IReview | null
    setIsSelectReview: (v: IReview | null) => void
    actionRef: React.MutableRefObject<ActionType | null>;
}

const UpdateReview = (props: IProps) => {
    const {
        isOpenUpdateReview,
        setisOpenUpdateReview,
        isSelectReview,
        setIsSelectReview
    } = props

    const [form] = Form.useForm()
    const { message } = App.useApp()
    useEffect(() => {
        if (isOpenUpdateReview && isSelectReview) {
            form.setFieldsValue({
                rating: isSelectReview.rating,
                comment: isSelectReview.comment,
            })
        }
    }, [isOpenUpdateReview, isSelectReview, form])

    const handleClose = () => {
        setisOpenUpdateReview(false)
        setIsSelectReview(null)
        form.resetFields()
    }

    const handleFinish = async (values: any) => {
        if (!isSelectReview) return

        try {
            const res = await updateReviewApi(isSelectReview._id, values)
            if (res.statusCode === 200) {
                message.success("Cập nhật đánh giá thành công")
                props.actionRef.current?.reload();
                handleClose()
                // Gợi ý: có thể gọi lại danh sách review ở đây nếu cần
            } else {
                message.error(res.message || "Cập nhật thất bại")
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật review:", error)
            message.error("Đã xảy ra lỗi khi cập nhật")
        }
    }


    return (
        <Drawer
            title="Cập nhật đánh giá"
            width={500}
            onClose={handleClose}
            open={isOpenUpdateReview}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label="Số sao"
                    name="rating"
                    rules={[{ required: true, message: "Vui lòng chọn số sao" }]}
                >
                    <Rate />
                </Form.Item>

                <Form.Item
                    label="Bình luận"
                    name="comment"
                    rules={[{ required: true, message: "Vui lòng nhập bình luận" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default UpdateReview
