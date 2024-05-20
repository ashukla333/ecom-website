'use client'
import React, { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
console.log(isMenuOpen,"isMenuOpen")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full ${isSticky ? "bg-primary-color duration-1000 shadow-lg  text-secondary-color" : "bg-transparent text-primary-color  "} top-0 left-0     flex justify-between items-center z-[1000]`}
    >
      {/* laptop device */}
      <div className='w-full border-b-2 border-primary-color py-2  lg:block hidden'>
        <div className="flex flex-1 w-full  items-center">
          <div className=" flex-[0.2] text-center p-2 h-10 w-10 ">
            {/* <Image className='w-full h-full ' src={""} height={1000} width={1000} alt='logo' /> */}
            <span className='text-[20px]  uppercase font-serif cursor-pointer '>Kingsvilla</span>
          </div>
          <div className="flex-[0.6] p-2 " >
            <div className="flex items-center text-[16px] font-[700]  justify-around">
              <li className="list-none cursor-pointer">Home</li>
              <li className="list-none cursor-pointer">Contact</li>
              <li className="list-none cursor-pointer">About</li>
              <li className="list-none cursor-pointer">Sign Up</li>
            </div>
          </div>
          <div className="flex-[0.2] p-2 ">
            <div className="flex items-center justify-evenly">
              <div className="cursor-pointer">
                <FaRegHeart className="h-5 w-5 " />
              </div>
              <div className="cursor-pointer">
                <MdOutlineShoppingCart className="h-6 w-6" />
              </div>
              <div className="cursor-pointer">
                <CgProfile className="h-7  w-7" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile device */}
      <div className=" lg:hidden block w-full border-b-2 border-black">
        <div className="flex justify-between !w-full p-3">
          <div className="uppercase text-base cursor-pointer font-[700]">Kingsvilla</div>
          <div className="cursor-pointer"  onClick={toggleMenu}><RiMenu2Line className="w-8 h-8"/></div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="p-4">
            <button
              className="text-white   focus:outline-none"
              onClick={toggleMenu}
            >
             <IoMdClose className="hover:rotate-180"  />
            </button>
            {/* Add your menu items here */}
            <div className="text-white mt-4">
              <a href="#" className="block py-2">
                Home
              </a>
              <a href="#" className="block py-2">
                About
              </a>
              <a href="#" className="block py-2">
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header