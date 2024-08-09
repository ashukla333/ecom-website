import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiSolidHeartCircle } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa6'

const Wishlish = ({value}) => {
  return (
    <div className="border rounded-sm border-main-text flex flex-col !h-[350px] w-full ">
    <Link
      className="border cursor-pointer rounded-sm !h-[240px] w-full"
      href={`/product/${value?.handle}?product=${value?.id}`}
    >
      <Image
        src={`${process.env.BASE_URL}${value["image"]}`}
        height={500}
        width={500}
        alt="img"
        className="h-full w-full hover-effect"
      />
    </Link>
    {/*  */}
    <div className="flex flex-col p-2">
      <div className="flex  justify-between">
        <div className="font-bold text-main-text font-mono">
          {value["name"]?.length > 10
            ? value["name"].slice(0, 10) + "..."
            : value["name"]}
        </div>
        <div className="text-main-text font-bold">{value["price"]}</div>
      </div>
      {/*  */}
      <div className="flex py-1  justify-between">
        <div className="flex gap-1 items-center">
          <div className="font-bold text-main-text font-mono">
            {value["rating"]}
          </div>
          <FaStar className="text-base text-yellow-400" />
          <span className="text-sm text-gray-300">Rating</span>
        </div>
        <div className="text-red-600 text-sm line-through font-bold">
          {value["offer"]}
        </div>
      </div>
      <div className="flex items-center border-t py-2 justify-between">
        <div className="">
          <Link
            href="/cart"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </span>
            <span className="p-2 text-[10px]">Go To Cart</span>
          </Link>
        </div>
        {/* <BiSolidHeartCircle fill="red" className="h-7 animate-pulse w-7" /> */}
      </div>
    </div>
  </div>
  )
}

export default Wishlish