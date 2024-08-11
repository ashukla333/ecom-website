import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import SwiperSlider from "./SwiperSlider";
import { SwiperSlide } from "swiper/react";

const SimpleNameOfferCard = ({
  className = "",
  imgClassName = "",
  image = [], // Expecting an array of image objects
  title,
  offer,
  navigateArrowIcon = false,
  offerClass = "",
  price,
  pricecss,
}) => {
  return (
    <div
      className={`w-full !h-full ${className} border-[0.05rem] border-secondary-primary-color`}
    >
      <SwiperSlider
        slidesPerView={1} // Adjust as needed
        autoplay={true}
        loop={true}
        pagination={true}
        navigation={false}
        className={`w-full ${imgClassName}`}
      >
        {image.map((img, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <Image
              src={img.url}
              width={500}
              height={500}
              alt={`Product_Image_${index}`}
              className="!h-[260px] hover-effect"
              onError={(event) => {
                event.target.src = "/images/MyDefaultProduct.png";
                event.error = null;
              }}
            />
          </SwiperSlide>
        ))}
      </SwiperSlider>
      <hr className="w-full m-auto" />
      <div
        className={`flex justify-between items-center font-semibold ${
          className === "!bg-cream-color" && "py-4 px-0"
        } p-4 text-sm w-full`}
      >
        <div className="w-[80%] flex flex-col gap-1">
          <p className="w-full md:text-[18px] text-[16px] font-[500] truncate">
            {title}
          </p>
         
          {/* {price && (
            <p
              className={`w-full md:text-[17px] text-[14px] font-[700] truncate ${pricecss}`}
            >
              ₹{price}
            </p>
          )} */}
           {offer && (
            <p
              className={`w-full md:text-[16px]  text-[14px] text-red-600 font-[700] truncate ${offerClass}`}
            >
               ₹{offer} OFF
            </p>
          )}
        </div>
        <div className="w-[10%]">{navigateArrowIcon && <BsArrowRight />}</div>
      </div>
    </div>
  );
};

export default SimpleNameOfferCard;
