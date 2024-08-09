import Image from "next/image";
import React from "react";
import Content from "../common/Content";

const OrderCard = () => {
  return (
    <div className="bg-white border w-full h-full shadow-md drop-shadow-md rounded-sm border-main-text">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-[100px]   h-[100px] ">
            <Image
              alt="cart"
              src={`${process.env.BASE_URL}/products/p11.jpg`}
              width={500}
              height={500}
              className="h-full  border border-main-text hover-effect w-full object-cover "
            />
          </div>
          <div className="flex flex-col gap-1">
            <Content text={"Black T-Shirt"} variant={3} weight={5} />
            <div className="  flex items-center  gap-3">
              <span className="text-main-text md:text-[16px] text-[14px] font-bold">
                ₹700.22
              </span>
              <span className="line-through text-red-500 font-semibold">
                ₹200
              </span>
            </div>
          </div>
        </div>
        <div className="p-2 text-main-text md:text-[15px] text-[12px] font-bold">
            x9
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
