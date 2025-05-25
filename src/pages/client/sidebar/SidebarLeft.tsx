import { getAllCategories } from "@/service/api"
import { useEffect, useState } from "react"
import './SidebarLeft.scss'
import { RightOutlined } from "@ant-design/icons"
const SiderBarLeft = () => {
    const [isCategory, setIsCategory] = useState<ICategory[]>([])
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getAllCategories()
            setIsCategory(res.data?.result ?? [])
        }
        fetchCategory()
    }, [])
    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-title">DANH MỤC</h3>
                <ul className="category-list">
                    {isCategory.map((category) => (
                        <li key={category._id} className="category-item">
                            {category.name}
                            <RightOutlined className="arrow-icon" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default SiderBarLeft