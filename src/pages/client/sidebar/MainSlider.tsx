import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './MainSlider.scss';

const MainSlider = () => {
    const urlSlide = import.meta.env.VITE_BASE_URL;
    const slides = [
        {
            id: 1,
            image: `${urlSlide}/images/slides/home_slider_image_1.webp`,
        },
        {
            id: 2,
            image: `${urlSlide}/images/slides/home_slider_image_2.webp`,
        },
        {
            id: 3,
            image: `${urlSlide}/images/slides/home_slider_image_3.webp`,
        },
        {
            id: 4,
            image: `${urlSlide}/images/slides/home_slider_image_4.webp`,
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <>
            <div className="main-slider">
                <Slider {...settings}>
                    {slides.map((slide) => (
                        <div key={slide.id} className="slide-item">
                            <img src={slide.image} alt={`Slide ${slide.id}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default MainSlider;