"use client";
import React, { useEffect, useRef, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import {
  FaInfoCircle,
  FaRegHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaCrown, FaUser, FaUserPlus } from "react-icons/fa6";
import SearchBar from "./input/SearchBar";
import Link from "next/link";
import { BiSolidHeartCircle, BiUser, BiUserX } from "react-icons/bi";
import { customAxiosGET } from "@/app/apis/methods";
import { getUserApi, logOutUserApi } from "@/app/apis/list";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";

const Header = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState();
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

  const [showModal, setShowModal] = useState(false);
  const closeModalTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(closeModalTimeout.current);
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    closeModalTimeout.current = setTimeout(() => {
      setShowModal(false);
    }, 700);
  };

  const getUser = async () => {
    try {
      const result = await customAxiosGET("", getUserApi);
      if (result.status) {
        setUserData(result?.data);
        localStorage.setItem("userInfo", JSON.stringify(result?.data));
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const LogOut = async () => {
    try {
      console.log("Logging out...");
      const result = await customAxiosGET("", logOutUserApi);
      if (result.status) {
        localStorage.removeItem("userInfo");
        toast.success(result?.message);
        deleteCookie("AuthToken");
        router.push("/login");
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav
      className={`border-b shadow-primary-color shadow top-0 left-0 w-full ${
        isSticky
          ? "!bg-primary-color duration-1000 shadow-lg  !text-secondary-color"
          : "bg-transparent text-secondary-color "
      } top-0 left-0     flex justify-between items-center !z-[1000]`}
    >
      {/* laptop device */}
      <div className="w-full border-b-2 border-primary-color py-2  z-[1000] lg:block hidden">
        <div className="flex  flex-1 w-full   items-center">
          <div className=" flex-[0.2]  text-center p-2 h-12 w-10 ">
            {/* <Image className='w-full h-full ' src={""} height={1000} width={1000} alt='logo' /> */}
            {/* <Link
              className="text-[24px]  uppercase font-mono drop-shadow-sm font-[900] text-main-text cursor-pointer "
              href={"/"}
            >
              Kingsvilla
            </Link> */}
            <Link
              href={"/"}
              className="text-2xl relative text-center uppercase text-ellipsis font-mono font-bold mb-5"
            >
              Kingsvilla
              <FaCrown className="text-yellow-500 absolute -left-5 -top-2 -rotate-45" />
            </Link>
          </div>
          <div className="flex-[0.6] p-2 ">
            <SearchBar placeholder={"Search by Product & Category name..."} />
          </div>
          <div className="flex-[0.2] p-2 ">
            <div className="flex items-center justify-evenly">
              <Link
                href={"/wishlist"}
                className="cursor-pointer text-main-text "
              >
                <BiSolidHeartCircle
                  fill="red"
                  className="h-8 animate-pulse w-8"
                />
              </Link>
              <Link href={"/cart"} className="cursor-pointer text-main-text ">
                <GiShoppingBag className="h-[25px] w-full" />
              </Link>
              <div className="cursor-pointer text-main-text ">
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex gap-2 border-double border-2 bg-main-bg border-main-text p-2 rounded-full items-center justify-center w-10 h-10">
                    <span className="text-[18px] font-[700] text-main-text capitalize">
                      {userData?.name ? userData?.name.charAt(0) : <BiUser />}
                    </span>
                  </div>

                  {showModal && (
                    <div
                      className="absolute right-0 w-48 top-12  bg-white   border-[1px]  border-main-text shadow-lg"
                      onMouseEnter={() =>
                        clearTimeout(closeModalTimeout.current)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2  m-1 ">
                        {/* <h2 className="text-xl mb-4">Profile</h2> */}
                        <ul>
                          <Link
                            href={"/profile"}
                            className="mb-2 font-serif cursor-pointer flex hover:text-gray-500  text-main-text  items-center"
                          >
                            <FaUser className="mr-2 cursor-pointer " />
                            My Account
                          </Link>
                          {/* <Link
                            href={"/"}
                            className="mb-2 font-serif cursor-pointer flex text-gray-500  hover:text-main-text  items-center"
                          >
                            <FaInfoCircle className="mr-2 cursor-pointer " />
                            About
                          </Link> */}
                          {userData?.name && (
                            <div
                              onClick={() => {
                                LogOut();
                              }}
                              className="mb-2 font-serif cursor-pointer flex hover:text-gray-500  text-main-text  items-center"
                            >
                              <FaSignOutAlt className="mr-2 cursor-pointer " />
                              LogOut
                            </div>
                          )}
                          {!userData?.name ? (
                            <>
                              <Link
                                href={"/login"}
                                className="mb-2 font-serif cursor-pointer flex hover:text-gray-500  text-main-text  items-center"
                              >
                                <FaSignInAlt className="mr-2 cursor-pointer " />
                                Login
                              </Link>
                              <Link
                                href={"/signup"}
                                className="mb-2 font-serif cursor-pointer flex hover:text-gray-500  text-main-text  items-center"
                              >
                                <FaUserPlus className="mr-2 cursor-pointer " />
                                Sign Up
                              </Link>
                            </>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile device */}
      <div className=" lg:hidden block w-full border-b-2 border-black">
        <div className="flex justify-between !w-full p-3">
          <div className="uppercase text-base cursor-pointer font-[700]">
            Kingsvilla
          </div>
          <div className="cursor-pointer" onClick={toggleMenu}>
            <RiMenu2Line className="w-8 h-8" />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="p-4">
            <button
              className="text-white   focus:outline-none"
              onClick={toggleMenu}
            >
              <IoMdClose className="hover:rotate-180" />
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
  );
};

export default Header;
