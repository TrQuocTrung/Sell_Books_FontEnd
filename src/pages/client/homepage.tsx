import FeaturedBooks from "./books/FeaturedBooks";
import './homepage.scss'

const HomePage = () => {
    return (
        <div className="home-container" >
            <FeaturedBooks />
        </div>
    );
}
export default HomePage;