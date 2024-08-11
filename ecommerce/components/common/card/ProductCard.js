import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import SwiperSlider from "../SwiperSlider";
import { SwiperSlide } from "swiper/react";


const ProductCard = ({ value, ...props }) => {
  return (
    <div>
      <div className="border rounded-sm border-main-text flex flex-col !h-[350px] w-full">
        <Link
          className="border cursor-pointer rounded-sm !h-[240px] w-full"
          href={`/product/${value?._id}`}
        >
          <SwiperSlider
            slidesPerView={1}
            autoplay={true}
            loop={false}
            pagination={true}
            navigation={false}
            className="h-full w-full"
          >
            {value["images"].map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={`${img.url}`}
                  height={500}
                  width={500}
                  alt={`Product_Image_${index}`}
                  className="h-full w-full hover-effect"
                  onError={(event) => {
                    event.target.src = "/images/MyDefaultProduct.png";
                    event.error = null;
                  }}
                />
              </SwiperSlide>
            ))}
          </SwiperSlider>
        </Link>
        <div className="flex flex-col p-2">
          <div className="flex justify-between">
            <div className="font-bold text-main-text font-mono">
              {value["name"]?.length > 8
                ? value["name"].slice(0, 8) + ".."
                : value["name"]}
            </div>
            <div className="text-main-text font-bold">₹{Math.floor(value["price"])}</div>
          </div>
          <div className="flex py-1 justify-between">
            <div className="flex gap-1 items-center">
              <div className="font-bold text-main-text font-mono">
                {value["ratings"][0]?.rating || "5"}
              </div>
              <FaStar className="text-base text-yellow-400" />
              <span className="text-sm text-gray-300">Rating</span>
            </div>
            <div className="text-red-600 text-sm line-through font-bold">
              ₹{value["offer"] || "290"}
            </div>
          </div>
          <div className="flex items-center border-t py-2 justify-between">
            <div>
              <Link
                href="#_"
                className="inline-flex overflow-hidden text-white bg-gray-900 rounded group"
              >
                <span className="px-2 py-1 text-white bg-main-text group-hover:bg-purple-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </span>
                <span className="p-2 text-[10px]">Add To Cart</span>
              </Link>
            </div>
            <BiSolidHeartCircle fill="red" className="h-7 animate-pulse w-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
