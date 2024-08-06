import Image from "next/image";
import React, { useState } from "react";
import Content from "../common/Content";
import Link from "next/link";
import { BiSolidHeartCircle } from "react-icons/bi";
import Button from "../common/Button";

const CartCard = ({Increment=0,setIncrement=()=>{}}) => {
  
  console.log(Increment);

  return (
    <div className="w-full h-full border bg-main-bg text-main-text">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-7 md:flex-row  flex-col w-full items-center ">
          <div className="md:w-[400px] !w-full  h-[200px] ">
            <Image
              alt="cart"
              src={"/products/p11.jpg"}
              width={500}
              height={500}
              className="h-full  border border-main-text hover-effect w-full object-cover "
            />
          </div>
          <div className="flex w-full  p-2 flex-col gap-2">
            <Content text={"Black T-Shirt"} variant={5} weight={6} />
            <div className="py-2">
              Quantity:-
              <div className="flex w-full pt-1 gap-2 ">
                <Button
                  type="secondary"
                  value="-"
                  className="w-full "
                  onClick={
                    Increment <= 0
                      ? () => {}
                      : () => {
                          setIncrement(Increment - 1);
                        }
                  }
                />
                <input
                  type="text"
                  className="border outline-2 font-bold text-lg rounded-md text-center border-main-text"
                  name="Quantity"
                  value={Increment}
                />
                <Button
                  type="secondary"
                  value="+"
                  className="w-full"
                  onClick={() => {
                    setIncrement(Increment + 1);
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2 items-center w-full">
              <Link
                href="#_"
                className="inline-flex w-full overflow-hidden text-white bg-gray-900 rounded group"
              >
                <span className="px-3  py-2 text-white bg-main-text group-hover:bg-purple-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
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
                <span className="p-2 w-full flex items-center text-[13px] md:text-[14px]">
                  Remove From Cart
                </span>
              </Link>
              <BiSolidHeartCircle
                fill="red"
                className="h-10 cursor-pointer animate-pulse w-10"
              />
            </div>
          </div>

          <div className="pt-5 p-2 flex items-center  gap-3">
            <span className="text-main-text md:text-[22px] text-[18px] font-bold">
              ₹700.22
            </span>
            <span className="line-through text-red-500 font-semibold">
              ₹200
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
