import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const SimpleNameOfferCard = ({
  className = "",
  imgClassName = "",
  image,
  title,
  offer,
  navigateArrowIcon = false,
  offerClass = "",
  price,
  pricecss,
}) => {
  return (
    <div
      className={`w-full !h-full ${className}  border-[0.05rem] border-secondary-primary-color`}
    >
      <Image
        src={image}
        width={500}
        height={500}
        alt="Product_Image"
        className={`${imgClassName}`}
        // unoptimized={true}
        onError={event => {
          event.target.src = "/images/MyDefaultProduct.png";
          event.error = null;
        }}
      />
      <hr className="w-full m-auto" />
      <div
        className={`flex justify-between items-center font-semibold ${
          className === "!bg-cream-color" && "py-4 px-0"
        } p-4 text-sm w-full`}
      >
        <div className="w-[80%] flex flex-col gap-1">
          <p className="w-full md:text-[18px] text-[16px]  font-[500] truncate">
            {title}
          </p>
          {offer && (
            <p
              className={`w-full md:text-[16px] text-[14px] text-red-600 font-[700] truncate ${offerClass}`}
            >
              {offer}
            </p>
          )}
          {price && (
            <p
              className={`w-full md:text-[16px] text-[14px]  font-[700] truncate ${pricecss}`}
            >
              {price}
            </p>
          )}
        </div>
        <div className="w-[10%]">{navigateArrowIcon && <BsArrowRight />}</div>
      </div>
    </div>
  );
};

export default SimpleNameOfferCard;