import React, { useEffect, useRef, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaCrown, FaUser } from "react-icons/fa6";
import SearchBar from "./input/SearchBar";
import Link from "next/link";
import { BiSolidHeartCircle, BiUser } from "react-icons/bi";
import { customAxiosGET } from "@/app/apis/methods";
import { getUserApi, logOutUserApi, searchAPI } from "@/app/apis/list";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useCartStore } from "@/app/store/createStore";
import { IoHeartCircle } from "react-icons/io5";

const Header = () => {
  const router = useRouter();
  const cartCount = useCartStore((state) => state.cartCount);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Initialize as null
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log({
    userData,
  });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // const LogOut = () => {
  //   const authToken = localStorage.getItem("AuthToken");

  //   if (authToken) {
  //     // Clear user data from localStorage
  //     localStorage.removeItem("userInfo");
  //     localStorage.removeItem("AuthToken");

  //     // Provide feedback to the user and redirect
  //     toast.success("Logged out successfully!");
  //     router.push("/login");
  //   } else {
  //     // Show message if already logged out
  //     toast.error("Already logged out.");
  //   }
  // };
  const LogOut = async () => {
    const authToken = localStorage.getItem("AuthToken");

    if (authToken) {
      try {
        // Attempt to log out via the API
        const result = await customAxiosGET("", logOutUserApi);

        if (result.status === 200) {
          // Clear user data from localStorage
          localStorage.removeItem("userInfo");
          localStorage.removeItem("AuthToken");
          deleteCookie("AuthToken");
          // Provide feedback to the user and redirect
          toast.success(result?.message || "Logged out successfully!");
          router.push("/login");
        } else {
          toast.error(result?.message || "Logout failed.");
        }
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("An error occurred while logging out.");
      }
    } else {
      // Show message if already logged out
      toast.error("Already logged out.");
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => (document.body.style.overflow = "auto"); // Clean up on unmount
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchQuery = new URLSearchParams(window.location.search).get("query");
    setQuery(fetchQuery || "");

    const fetchData = async () => {
      try {
        const response = await customAxiosGET("", searchAPI, {
          params: { query: fetchQuery },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (fetchQuery) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleNavigation = (href) => {
    setIsMenuOpen(false); // Close the menu
    router.push(href); // Navigate to the new page
  };

  return (
    <nav
      className={`border-b shadow-primary-color shadow top-0 left-0 w-full transition-all duration-300 ${
        isSticky
          ? "!bg-primary-color shadow-lg !text-secondary-color"
          : "bg-transparent text-secondary-color"
      } flex justify-between items-center !z-[1000]`}
    >
      {/* Laptop Device */}
      <div className="w-full border-b-2 border-primary-color py-2 z-[1000] lg:block hidden">
        <div className="flex flex-1 w-full items-center">
          <div className="flex-[0.2] text-center p-2 h-12 w-10">
            <Link
              href={"/"}
              className="text-2xl relative text-center uppercase text-ellipsis font-mono font-bold mb-5"
            >
              Kingsvilla
              <FaCrown className="text-yellow-500 absolute -left-5 -top-2 -rotate-45" />
            </Link>
          </div>
          <div className="flex-[0.6] p-2">
            <SearchBar placeholder={"Search by Product & Category name..."} />
            {/* {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {products.length > 0 ? (
                  <ul>
                    {products.map((product) => (
                      <li key={product._id}>
                        <Link href={`/products/${product._id}`}>
                          <a>
                            {product.name} - {product.category.name} -{" "}
                            {product.brand.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            )} */}
          </div>
          <div className="flex-[0.2] p-2">
            <div className="flex items-center justify-evenly">
              <Link
                href={"/wishlist"}
                className="cursor-pointer text-main-text"
              >
                <BiSolidHeartCircle
                  fill="red"
                  className="h-8 animate-pulse w-8"
                />
              </Link>
              <Link
                href="/cart"
                className="relative cursor-pointer text-main-text"
              >
                <GiShoppingBag className="h-[25px] w-[25px]" />
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </div>
                )}
              </Link>
              <div className="cursor-pointer text-main-text">
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex gap-2 border-double border-2 bg-main-bg border-main-text p-2 rounded-full items-center justify-center w-10 h-10">
                    <span className="text-[18px] font-[700] text-main-text capitalize">
                      {userData?.user?.email ? (
                        userData?.user?.email.charAt(0)
                      ) : (
                        <BiUser />
                      )}
                    </span>
                  </div>
                  {showModal && (
                    <div
                      className="absolute right-0 w-48 top-12 bg-white border-[1px] border-main-text shadow-lg"
                      onMouseEnter={() =>
                        clearTimeout(closeModalTimeout.current)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2 m-1">
                        <ul>
                          <Link
                            href={"/profile"}
                            className="mb-2 font-serif cursor-pointer flex hover:text-gray-500 text-main-text items-center"
                          >
                            <FaUser className="mr-2 cursor-pointer" />
                            My Account
                          </Link>
                          {userData?.user?.email && (
                            <div
                              onClick={LogOut}
                              className="mb-2 font-serif cursor-pointer flex hover:text-gray-500 text-main-text items-center"
                            >
                              <FaSignOutAlt className="mr-2 cursor-pointer" />
                              Log Out
                            </div>
                          )}
                          {!userData?.user?.email && (
                            <>
                              <Link
                                href={"/login"}
                                className="mb-2 font-serif cursor-pointer flex hover:text-gray-500 text-main-text items-center"
                              >
                                <FaSignInAlt className="mr-2 cursor-pointer" />
                                Login
                              </Link>
                              <Link
                                href={"/signup"}
                                className="mb-2 font-serif cursor-pointer flex hover:text-gray-500 text-main-text items-center"
                              >
                                <FaUserPlus className="mr-2 cursor-pointer" />
                                Sign Up
                              </Link>
                            </>
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

      {/* Mobile Device */}
      <div className="lg:hidden block w-full border-b-2 border-black">
        <div className="flex justify-between  items-center !w-full p-3">
          <div
            onClick={() => handleNavigation("/")}
            className="uppercase text-base animate-pulse cursor-pointer font-[700]"
          >
            Kingsvilla
          </div>
          <div className="flex flex-row items-center">
            <button
              onClick={() => handleNavigation("/cart")}
              className="py-3 text-xl  hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
            >
              <GiShoppingBag className="mr-3 h-7 w-7" /> 
            </button>
            <button
              onClick={() => handleNavigation("/wishlist")}
              className="py-3 text-xl  hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
            >
              <IoHeartCircle
                fill="red"
                className="mr-3 h-7 w-7 animate-pulse"
              />{" "}
              
            </button>
            <div className="cursor-pointer" onClick={toggleMenu}>
              <RiMenu2Line className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-main-text bg-opacity-90 z-[50000] flex items-center justify-center transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`bg-main-text opacity-80 border-gray-500 p-6 rounded-xl shadow-lg w-full max-w-md transform transition-transform duration-300 ${
            isMenuOpen ? "scale-100" : "scale-95"
          }`}
        >
          <button
            className="text-white text-2xl absolute top-4 right-4 hover:text-gray-300 transition-colors duration-200"
            onClick={toggleMenu}
          >
            <IoMdClose />
          </button>
          <div className="text-white font-mono space-y-4 text-center">
            <button
              onClick={() => handleNavigation("/")}
              className="py-3 text-xl hover:bg-gray-700 hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
            >
              <FaHome className="mr-3" /> Home
            </button>
            <button
              onClick={() => handleNavigation("/cart")}
              className="py-3 text-xl hover:bg-gray-700 hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
            >
              <GiShoppingBag className="mr-3" /> Cart
            </button>
            <button
              onClick={() => handleNavigation("/wishlist")}
              className="py-3 text-xl hover:bg-gray-700 hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
            >
              <IoHeartCircle
                fill="red"
                className="mr-3 h-6 w-6 animate-pulse"
              />{" "}
              Wishlist
            </button>

            {userData?.user?.email && (
              <button
                onClick={LogOut}
                className="py-3 text-xl hover:bg-gray-700 hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
              >
                <FaSignOutAlt className="mr-2 cursor-pointer" />
                Log Out
              </button>
            )}

            {!userData?.user?.email && (
              <>
                <button
                  href={"/login"}
                  className="py-3 text-xl hover:bg-gray-700 hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
                >
                  <FaSignInAlt className="mr-2 cursor-pointer" />
                  Login
                </button>
                <button
                  href={"/signup"}
                  className="py-3 text-xl hover:bg-gray-700 hover:bg-opacity-80 rounded-md flex items-center justify-center transition-all duration-200"
                >
                  <FaUserPlus className="mr-2 cursor-pointer" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
