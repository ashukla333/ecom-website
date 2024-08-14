import React, { useState } from "react";
import CartCard from "./CartCard";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperSlider from "../common/SwiperSlider";
import Content from "../common/Content";
import {
  FaHeartCircleCheck,
  FaHeartCirclePlus,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import Link from "next/link";
import useUserInfo from "@/app/apis/userInfo";
import { GiShoppingBag } from "react-icons/gi";
import { TbHeartShare } from "react-icons/tb";
import { PiEmptyFill } from "react-icons/pi";
import { IoHeartCircle, IoHeartCircleOutline } from "react-icons/io5";

const CartLeftSide = ({
  ProductData,
  quantities,
  setQuantities,
  AddWishList,
  RemoveCart,
}) => {
  const userId = useUserInfo();
  console.log({ quantities });
  const setIncrement = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(value, 0),
    }));
  };

  return ProductData.length > 0 ? (
    <div>
      {ProductData?.map((value, index) => {
        const quantity = quantities[value._id] || 0;
        return (
          <div
            key={index}
            className="w-full h-full border mb-3 rounded-sm  bg-main-bg text-main-text"
          >
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-7 md:flex-row  flex-col w-full items-center ">
                <Link
                  className="border cursor-pointer rounded-sm !h-[240px] md:!w-[190px] xl:!w-[220px] lg:!w-[150px] w-full"
                  href={`/product/${value?._id}`}
                >
                  <SwiperSlider
                    slidesPerView={1}
                    autoplay={true}
                    loop={false}
                    pagination={true}
                    navigation={false}
                    className="h-full md:!w-[190px] xl:!w-[220px] lg:!w-[150px] w-full"
                  >
                    {value["images"].map((img, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={`${img.url}`}
                          height={500}
                          width={500}
                          alt={`Product_Image_${index}`}
                          className="h-full md:!w-[190px] object-cover xl:!w-[220px] lg:!w-[150px] w-full hover-effect"
                          onError={(event) => {
                            event.target.src = "/images/MyDefaultProduct.png";
                            event.error = null;
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </SwiperSlider>
                </Link>
                <div className="flex w-full  p-2 flex-col gap-2">
                  <Content text={value["name"]} variant={5} weight={6} />
                  <div className="py-2">
                    Quantity:-
                    <div className="flex w-full pt-1 gap-2 ">
                      <div
                        className="p-2 bg-main-text text-lg cursor-pointer text-white grid place-content-center rounded"
                        onClick={() => {
                          setIncrement(value._id, quantity - 1);
                        }}
                      >
                        <FaMinus />
                      </div>
                      <input
                        type="text"
                        className="border w-16 outline-2 font-bold text-lg rounded-md text-center border-main-text"
                        name="Quantity"
                        value={quantity}
                        readOnly
                      />
                      <div
                        className="p-2 bg-main-text text-lg cursor-pointer text-white grid place-content-center rounded"
                        onClick={() => {
                          setIncrement(value._id, quantity + 1);
                        }}
                      >
                        <FaPlus />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4  items-center w-full">
                    <div
                      onClick={() => {
                        RemoveCart({
                          userId: userId?.user?._id,
                          productId: value?._id,
                        });
                      }}
                      className={`cursor-pointer inline-flex  overflow-hidden w-full md:w-[200px] border-2 border-main-text font-bold  rounded group ${"bg-main-text text-main-bg"}`}
                    >
                      <div
                        className={`px-2  text-white    flex items-center justify-center`}
                      >
                        <div className="cursor-pointer">
                          <GiShoppingBag
                            fill={"white"}
                            className="md:h-6 h-5 cursor-pointer  animate-pulse md:w-6"
                          />
                        </div>
                      </div>
                      <div className="p-2 text-[13px] flex items-center md:text-[13px]">
                        {"Remove to Cart"}
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        RemoveCart({
                          userId: userId?.user?._id,
                          productId: value?._id,
                        });
                        AddWishList({
                          userId: userId?.user?._id,
                          productId: value?._id,
                        });
                      }}
                      className={`cursor-pointer inline-flex rounded-full p-1 bg-main-text shadow-md border border-main-text  font-bold `}
                    >
                      <IoHeartCircle
                        fill={"white"}
                        className="h-7 cursor-pointer text-red-500  animate-pulse w-7"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-5 p-2 flex items-center  gap-3">
                  <span className="text-main-text md:text-[22px] text-[18px] font-bold">
                    ₹{value?.price}
                  </span>
                  <span className="line-through text-red-500 font-semibold">
                    ₹{value?.offer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) :  (
      <div className="flex justify-center  text-center flex-col items-center w-full h-[400px]">
        <Image
          src={`${process.env.BASE_URL}/noimg.gif`}
          height={500}
          width={500}
          alt="No Image"
          className="h-full w-[500px] hover-effect"
        />
        Nothing to Show! Unlock Your Shopping Desires: <br />
        Fill Your Empty Cart
      </div>
      )
    
};

export default CartLeftSide;
