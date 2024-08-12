import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import SwiperSlider from "../SwiperSlider";
import { SwiperSlide } from "swiper/react";
import {
  createWishlistApi,
  deleteWishlistApi,
  getWishlistByIdApi,
} from "@/app/apis/list";
import {
  customAxiosDELETE,
  customAxiosGET,
  customAxiosPOST,
} from "@/app/apis/methods";
import { toast } from "react-toastify";
import useUserInfo from "@/app/apis/userInfo";
import { useRouter } from "next/router";
import Loader from "../Loader";

const ProductCard = ({ value, wishlist = false }) => {
  const userId = useUserInfo();
  const [getProductWishList, setProductWishList] = useState([]);
  const [loading, setLoading] = useState(false);

  const AddWishList = async (data) => {
    setLoading(true);
    try {
      const response = await customAxiosPOST("", createWishlistApi, data);
      if (response.status) {
        toast.success(response.message);
        if (userId?.user?._id) {
          getWishList(userId?.user?._id);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const getWishList = async (id) => {
    setLoading(true);
    try {
      const response = await customAxiosGET("", getWishlistByIdApi(id));
      if (response.status) {
        setProductWishList(response?.data?.products);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const RemoveWishList = async (data) => {
    setLoading(true);
    try {
      const response = await customAxiosDELETE("", deleteWishlistApi, data);
      if (response.status) {
        toast.success(response.message);
        if (userId?.user?._id) {
          getWishList(userId?.user?._id);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedGetWishList = debounce(getWishList, 1000);

  useEffect(() => {
    if (userId?.user?._id) {
      debouncedGetWishList(userId?.user?._id);
    }
  }, [userId?.user?._id]);

  const wishlistActive = getProductWishList.includes(value?._id);

  if (loading) {
    return <div className="loader flex justify-center items-center " ><Loader/></div>;
  }

  return (wishlist && wishlistActive) || !wishlist ? (
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
            <div className="text-main-text font-bold">
              ₹{Math.floor(value["price"])}
            </div>
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
            <div
              className="cursor-pointer"
              onClick={
                wishlistActive
                  ? () => {
                      RemoveWishList({
                        userId: userId?.user?._id,
                        productId: value?._id,
                      });
                    }
                  : () => {
                      AddWishList({
                        userId: userId?.user?._id,
                        productId: value?._id,
                      });
                    }
              }
            >
              <BiSolidHeartCircle
                fill={wishlistActive ? "red" : "black"}
                className="h-7 cursor-pointer  animate-pulse w-7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProductCard;
