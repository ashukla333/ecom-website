import { FcLike } from "react-icons/fc";
import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  return (
    <div className='w-full border-b py-2'>
      <div className="flex flex-1 w-full  items-center">
        <div className=" flex-[0.2] text-center p-2 h-10 w-10 ">
          {/* <Image className='w-full h-full ' src={""} height={1000} width={1000} alt='logo' /> */}
          <span className='text-[20px] font-[800] cursor-pointer '>Modern Closet</span>
        </div>
        <div className="flex-[0.4] p-2 " >
          <div className="flex items-center text-[16px] font-[700]  justify-around">
            <li className="list-none cursor-pointer">Home</li>
            <li className="list-none cursor-pointer">Contact</li>
            <li className="list-none cursor-pointer">About</li>
            <li className="list-none cursor-pointer">Sign Up</li>
          </div>
        </div>
        <div className="flex-[0.4] p-2 ">
          <div className="flex items-center justify-evenly">
            <div className="cursor-pointer">
            <FaRegHeart className="h-7 w-7 text-black"/>
            </div>
            <div className="cursor-pointer">
            <MdOutlineShoppingCart className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header