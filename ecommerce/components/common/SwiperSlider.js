import { Swiper } from "swiper/react";
import {
    Autoplay,
    Navigation,
    Pagination,
    FreeMode,
    Scrollbar,
    Mousewheel,
} from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

const SwiperSlider = ({
    direction = "horizontal",
    slidesPerView = 1,
    tableView = 1,
    freemode,
    desktopView = 1,
    navigation = true,
    pagination = true,
    loop = true,
    children,
    onClick = () => { },
    tabletView,
    autoplay = true,
    mousewheel = false,
    mobileView,
    className = "",
    scrollbar = false,
    samallMobileView,
    samallestView,
    ...props
}) => {
    return (
        <Swiper
            direction={direction}
            slidesPerView={slidesPerView}
            modules={[
                Autoplay,
                Navigation,
                Pagination,
                FreeMode,
                Scrollbar,
                Mousewheel,
            ]}
            pagination={pagination}
            navigation={navigation}
            autoplay={autoplay}
            scrollbar={scrollbar}
            loop={loop}
            mousewheel={mousewheel}
            onClick={onClick}
            className={className}
            freeMode={freemode}
            breakpoints={{
                0: {
                    slidesPerView: slidesPerView || 1,
                },
                300: {
                    slidesPerView: samallestView || 1,
                },
                400: {
                    slidesPerView: mobileView || slidesPerView,
                },
                500: {
                    slidesPerView: samallMobileView || slidesPerView,
                },
                608: {
                    slidesPerView: tabletView || slidesPerView,
                },
                800: { slidesPerView: tabletView || slidesPerView },

                1280: {
                    slidesPerView: desktopView || slidesPerView,
                },
            }}
            {...props}
        >
            {children}
        </Swiper>
    );
};

export default SwiperSlider;