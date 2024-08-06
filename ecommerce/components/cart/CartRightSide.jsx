import React from "react";
import Content from "../common/Content";
import Link from "next/link";

const CartRightSide = ({ Increment }) => {
  return (
    <div>
      <div className="w-full h-full bg-main-bg  text-main-text border p-4">
        <Content text={"Price Details"} variant={5} weight={6} />
        <div className=" flex justify-between pt-4">
          <div className="text-gray-500">Black-T Shirt ({Increment})item</div>
          <div className="font-bold">₹900</div>
        </div>
        <div className="border-b py-3"></div>
        <div className=" flex justify-between pt-4">
          <div className="text-gray-500">Total</div>
          <div className="font-bold text-xl">₹900</div>
        </div>
        <div className="pt-10">
          <Link
            href="/checkout"
            className="inline-flex w-full  text-center overflow-hidden text-white bg-gray-900 rounded group"
          >
            <span className="pl-4 pr-5 font-mono py-2.5 text-center flex items-center justify-center w-full">
              Process To Checkout
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartRightSide;
