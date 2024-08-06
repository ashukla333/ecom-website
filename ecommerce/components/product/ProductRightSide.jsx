import React, { useState } from "react";
import Content from "../common/Content";
import { FaStar } from "react-icons/fa6";
import SizeDropdown from "../common/input/SizeDropDown";
import Link from "next/link";
import { BiSolidHeartCircle } from "react-icons/bi";

const ProductRightSide = ({ rating = 4 }) => {
  const totalStars = 5;
  const validRating = Math.max(
    0,
    Math.min(totalStars, Number.parseInt(rating, 10) || 0)
  );
  const [selectedSize, setSelectedSize] = useState(null);
  console.log({ selectedSize });
  const handleSizeChange = (size) => {
    setSelectedSize(size); // Update the state with the selected size
  };

  // Example size options
  const sizeOptions = [
    { size: "S", id: 1 },
    { size: "M", id: 2 },
    { size: "L", id: 3 },
    { size: "XL", id: 4 },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Content text={"Black T-Shirt"} weight={7} variant={6} />
          <span className="bg-main-bg text-green-500 items-center flex font-bold md:text-sm text-xs px-2 py-1 rounded-md border-main-text border">
            In Stock
          </span>
        </div>
        <div className="pt-3 flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: totalStars }).map((_, index) => (
              <FaStar
                key={index}
                className={`w-6 h-6 ${
                  index < validRating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-gray-400 font-mono md:text-sm text-xs">
            ({rating}) Rating
          </div>
        </div>
        <div className="pt-5">
          <Content text={"About Project"} weight={6} variant={4} />
          <div className="flex md:flex-row flex-col  pt-5 gap-y-2 gap-5">
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Brand :</div>
              <div className="text-main-text font-bold">Pollo</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Gender :</div>
              <div className="text-main-text font-bold">Male</div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col pt-3  gap-y-2 gap-5">
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Category :</div>
              <div className="text-main-text font-bold">Sports</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Size :</div>
              <div className="text-main-text font-bold">
                <SizeDropdown
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                  onChange={handleSizeChange}
                  options={sizeOptions}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 flex items-center gap-3">
          <Content text={"Price :"} weight={6} variant={4} />
          <span className="text-main-text md:text-[25px] text-[18px] font-bold">
            ₹700.22
          </span>
          <span className="line-through text-red-500 font-semibold">₹200</span>
        </div>
        <div className="flex pt-5 md:flex-row flex-col w-full items-center gap-5">
          <Link
            href="#_"
            className="inline-flex overflow-hidden w-full text-white bg-gray-900 rounded group"
          >
            <span className="px-5 py-2 text-white bg-main-text group-hover:bg-purple-600 flex items-center justify-center">
              <svg
                className="md:w-7 w-5 h-5 md:h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </span>
            <span className="p-2 text-[13px] flex items-center md:text-[16px]">Add To Cart</span>
          </Link>
          <Link
            href="#_"
            className="inline-flex overflow-hidden w-full text-white bg-gray-900 rounded group"
          >
            <span className="px-5 py-2 text-white bg-main-text group-hover:bg-purple-600 flex items-center justify-center">
            <BiSolidHeartCircle fill="red" className="md:h-7 animate-pulse md:w-7 w-5 h-5" />
            </span>
            <span className="p-2 text-[13px] flex items-center md:text-[16px]">Wishlist Item</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductRightSide;
