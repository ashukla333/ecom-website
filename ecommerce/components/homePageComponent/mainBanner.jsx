import Image from "next/image";
import { SwiperSlide, useSwiper } from "swiper/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import SwiperSlider from "../common/SwiperSlider";
import Content from "../common/Content";

const MainHomePageBanner = ({ bannerData = [] }) => {
  let [inMobileMode, setInMobileMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 641) {
      setInMobileMode(true);
    } else {
      setInMobileMode(false);
    }
  }, [windowWidth]);

  const swiper = useSwiper();
  return (
    <div className="relative  text-primary-color">
      <SwiperSlider
        autoplay={{ delay: 3000 }}
        pagination={true}
        navigation={{
          nextEl: ".bannerPrev",
          prevEl: ".bannerNext",
          disabledClass: "text-lightest-gray-color",
        }}
      >
        {inMobileMode === false
          ? bannerData?.desktopBanner?.map((banner, index) => {
              return (
                <SwiperSlide className="!aspect-[16/5]" key={index}>
                  <div className="relative !aspect-[16/5] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 ">
                  
                    <video
                      src={`${banner}`}
                      width={500}
                      height={500}
                      autoPlay
                      muted
                      loop
                      // controls
                      className="w-full h-full  object-cover"
                      alt="Video Player"
                    />

                    <div className="!flex !flex-col !gap-2 lg:!gap-5 absolute !top-1/2 !left-20 md:!left-32 translate-y-[-50%]">
                      <Content
                        text={"Shop Smart, Live Better!"}
                        className={"!text-xl !font-[600]"}
                      />
                      <div>
                        <div className="!flex !flex-col">
                          <Content
                            text={'"Exclusive Products'}
                            className="!text-3xl lg:!text-5xl !font-bold  "
                          />
                          <Content
                            text={"Incredible Prices"}
                            className="!text-3xl lg:!text-5xl !font-bold  "
                          />
                          <Content
                            text={'Just for You!"'}
                            className="!text-3xl lg:!text-5xl !font-bold  "
                          />
                        </div>
                      </div>
                      {/* <div
                        className="!w-max cursor-pointer gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300 bg-[linear-gradient(110deg,#C291A4,45%,#1e2631,70%,#F4C2C2)] bg-[length:200%_100%] px-6 font-medium text-primary-color transition-colors focus:outline-none focus:ring-2 flex focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        type=""
                      >
                        <span className="!font-medium">Shop Now</span>
                        <IoArrowForwardSharp />
                      </div> */}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : bannerData?.mobileBanner?.map((banner, index) => {
              return (
                <SwiperSlide className="" key={index}>
                  <div className="relative h-[300px] w-full">
                  <video
                      src={`${banner}`}
                      width={500}
                      height={500}
                      autoPlay
                      muted
                      loop
                      // controls
                      className="w-full h-full  object-cover"
                      alt="Video Player"
                    />

                    <div className="!absolute !w-full !top-16 !py-5">
                      <div className="!flex !flex-col !gap-2 lg:!gap-5 !items-center !justify-center">
                        <Content
                          text={"Shop Smart, Live Better!"}
                          className={"!text-xl !font-medium"}
                        />
                        <div>
                          <div className="!flex !flex-col !text-center">
                            <Content
                              text={'"Exclusive Products'}
                              className="!text-3xl lg:!text-5xl !font-bold  "
                            />
                            <Content
                              text={"Incredible Prices"}
                              className="!text-3xl lg:!text-5xl !font-bold  "
                            />
                            <Content
                              text={'Just for You!"'}
                              className="!text-3xl lg:!text-5xl !font-bold  "
                            />
                          </div>
                        </div>
                        {/* <div
                          className="!w-max cursor-pointer gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300 bg-[linear-gradient(110deg,#C291A4,45%,#1e2631,70%,#F4C2C2)] bg-[length:200%_100%] px-6 font-medium text-primary-color transition-colors focus:outline-none focus:ring-2 flex focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                          type=""
                        >
                          <span className="!font-medium">Explore More</span>
                          <IoArrowForwardSharp />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        <div className="md:!block !hidden">
          <Button
            id="bannerNext"
            className="bannerNext absolute left-1 !bg-primary-color  top-[50%] translate-y-[-50%] h-20 z-20 cursor-pointer !text-xl"
            type="secondary"
          >
            <FiArrowLeft className="text-main-text" />
          </Button>
          <Button
            id="bannerPrev"
            className="bannerPrev absolute right-1 !bg-primary-color  top-[50%] translate-y-[-50%] h-20 z-20 cursor-pointer !text-xl"
            type="secondary"
          >
            <FiArrowRight className="text-main-text" />
          </Button>
        </div>
      </SwiperSlider>
    </div>
  );
};

export default MainHomePageBanner;
