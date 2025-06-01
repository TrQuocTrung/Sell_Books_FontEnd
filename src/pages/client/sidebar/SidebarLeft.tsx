import { getAllCategories } from "@/service/api"
import { useEffect, useState } from "react"
import './SidebarLeft.scss'
import { RightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
const SiderBarLeft = () => {
    const [isCategory, setIsCategory] = useState<ICategory[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getAllCategories()
            setIsCategory(res.data?.results ?? [])
        }
        fetchCategory()
    }, [])

    const handleClick = (name: string) => {
        navigate(`/books?category=${encodeURIComponent(name)}`);
    };
    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-title">DANH MỤC</h3>
                <ul className="category-list">
                    {isCategory.map((category) => (
                        <li key={category._id} className="category-item" onClick={() => handleClick(category.name)}>
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