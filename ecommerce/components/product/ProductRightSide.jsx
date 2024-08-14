import React, { useEffect, useState } from "react";
import Content from "../common/Content";
import { FaStar } from "react-icons/fa6";
import SizeDropdown from "../common/input/SizeDropDown";
import Link from "next/link";
import { BiSolidHeartCircle } from "react-icons/bi";
import { product } from "../json";
import {
  customAxiosDELETE,
  customAxiosGET,
  customAxiosPOST,
} from "@/app/apis/methods";
import {
  createCart,
  createCartAPi,
  createWishlistApi,
  deleteWishlistApi,
  getBrandByIdApi,
  getCartByIdApi,
  getCategoryByIdApi,
  getWishlistByIdApi,
  removeCartApi,
} from "@/app/apis/list";
import { toast } from "react-toastify";
import useUserInfo from "@/app/apis/userInfo";
import Loader from "../common/Loader";
import { GiShoppingBag } from "react-icons/gi";
import SizeDropdownNew from "../common/input/SizeDropDownNew";
import { useCartStore } from "@/app/store/createStore";

const ProductRightSide = ({ rating = 4, Product, aboute }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalStars = 5;
  const validRating = Math.max(
    0,
    Math.min(totalStars, Number.parseInt(rating, 10) || 0)
  );
  const [selectedSize, setSelectedSize] = useState({});
  console.log({selectedSize})
  
  const handleSizeChange = (size) => {
    setSelectedSize(size); // Update the state with the selected size
  };

  // Example size options
  const sizeOptions = [
    { size: "S", id: 1 },
    { size: "M", id: 2 },
    { size: "L", id: 3 },
    { size: "XL", id: 4 },
    { size: "XXL", id: 4 },
  ];

  const [BrandData, setBrandData] = useState();
  const [categoryData, setCategoryData] = useState();
  const getBrand = async (id) => {
    if (!id) return;
    try {
      const data = await customAxiosGET("", getBrandByIdApi(id));
      if (data.status) {
        setBrandData(data.data.getBrandByids?.brandName);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Product?.brand) {
        getBrand(Product.brand);
      }
    }, 3000);

    return () => clearTimeout(handler);
  }, [Product?.brand]);

  const getCategory = async (id) => {
    if (!id) return;
    try {
      const data = await customAxiosGET("", getCategoryByIdApi(id));
      if (data.status) {
        setCategoryData(data.data.categoryList?.categoryName);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Product?.category) {
        getCategory(Product.category);
      }
    }, 3000);

    return () => clearTimeout(handler);
  }, [Product?.category]);

  // console.log({ categoryData });

  //

  // wishlist

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

  const wishlistActive = getProductWishList.includes(Product?._id);

  //  cart

  const [getCartData, setCartData] = useState();

  const getCartDataByID = async (id) => {
    setLoading(true);
    try {
      const response = await customAxiosGET("", getCartByIdApi(id));
      if (response.status || response.success) {
        setCartData(response?.data?.items);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AddTOCART = async (data) => {
    setLoading(true);
    try {
      const response = await customAxiosPOST("", createCartAPi, data);
      if (response.status) {
        toast.success(response.message);
        if (userId?.user?._id) {
          getCartDataByID(userId?.user?._id);
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

  const RemoveCart = async (data) => {
    setLoading(true);
    try {
      const response = await customAxiosDELETE("", removeCartApi, data);
      if (response.status) {
        toast.success(response.message);
        if (userId?.user?._id) {
          getCartDataByID(userId?.user?._id);
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

  const debouncedGetCart = debounce(getCartDataByID, 1000);

  useEffect(() => {
    if (userId?.user?._id) {
      debouncedGetCart(userId?.user?._id);
    }
  }, [userId?.user?._id]);

  const cartProductId = getCartData?.map((v) => v?.productId);
  const cartStatus = cartProductId?.includes(Product?._id);

  return !loading ? (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          {/* <Content
            className={"md:text-xl text-lg"}
            text={
              Product?.name?.length > 20
                ? Product?.name?.slice(0, 25) + "..."
                : Product?.name
            }
            weight={7}
            variant={6}
          /> */}
          <div className="relative  group">
            <div className="md:text-xl  text-lg font-bold">
              {Product?.name?.length > 25
                ? Product?.name?.slice(0, 25) + "..."
                : Product?.name}
            </div>
            <div className="absolute w-full top-5 left-1/2 transform  hidden group-hover:block bg-transparent text-black font-bold text-sm p-2 rounded">
              {Product?.name}
            </div>
          </div>
          <span
            className={`bg-main-bg ${
              selectedSize.stock > 0 ? "text-green-500" : "text-red-500"
            }   items-center flex font-bold md:text-sm text-xs px-2 py-1 rounded-md border-main-text border`}
          >
            {selectedSize.stock > 0 ? "In Stock" : "Out of Stock"}:{" "}
            {selectedSize.stock || 0}
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
        <div className="capitalize pt-5">
          <Content
            text={
              aboute ? aboute : Product.images && Product.images[0]?.altText
            }
            weight={6}
            variant={4}
          />
          <div className="flex md:flex-row flex-col  pt-5 gap-y-2 gap-5">
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Brand :</div>
              <div className="text-main-text font-bold">{BrandData}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Gender :</div>
              <div className="text-main-text font-bold">{Product?.gender}</div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col pt-3  gap-y-2 gap-5">
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Category :</div>
              <div className="text-main-text font-bold">{categoryData}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 font-semibold">Size :</div>
              <div className="text-main-text font-bold">
                <SizeDropdownNew
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                  onChange={handleSizeChange}
                  options={Product?.sizes}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 flex items-center gap-3">
          <Content text={"Price :"} weight={6} variant={4} />
          <span className="text-main-text md:text-[25px] text-[18px] font-bold">
            ₹{Product?.price || 0}
          </span>
          <span className="line-through text-red-500 font-semibold">
            ₹{Product.offer || 0}
          </span>
        </div>
        <div className="flex pt-5 md:flex-row flex-col w-full items-center gap-5">
          <div
            onClick={
              cartStatus
                ? () => {
                    removeFromCart(Product?._id);
                    RemoveCart({
                      userId: userId?.user?._id,
                      productId: Product?._id,
                    });
                  }
                : () => {
                    addToCart(Product);
                    AddTOCART({
                      userId: userId?.user?._id,
                      productId: Product?._id,
                      size: selectedSize?.size,
                      quantity: 0
                    });
                  }
            }
            className={`cursor-pointer inline-flex  overflow-hidden w-full border-2 border-main-text font-bold  rounded group ${
              cartStatus
                ? "bg-main-bg text-main-text"
                : "bg-main-text text-main-bg"
            }`}
          >
            <div
              className={`px-5  text-white    flex items-center justify-center`}
            >
              <div className="cursor-pointer">
                <GiShoppingBag
                  fill={cartStatus ? "red" : "white"}
                  className="h-7 cursor-pointer  animate-pulse w-7"
                />
              </div>
            </div>
            <div className="p-2 text-[13px] flex items-center md:text-[16px]">
              {cartStatus ? "Added to Cart" : "Add to Cart"}
            </div>
          </div>
          <div
            onClick={
              wishlistActive
                ? () => {
                    RemoveWishList({
                      userId: userId?.user?._id,
                      productId: Product?._id,
                    });
                  }
                : () => {
                    AddWishList({
                      userId: userId?.user?._id,
                      productId: Product?._id,
                    });
                  }
            }
            className={`cursor-pointer inline-flex  overflow-hidden w-full border-2 border-main-text font-bold  rounded group ${
              wishlistActive
                ? "bg-main-bg text-main-text"
                : "bg-main-text text-main-bg"
            }`}
          >
            <div
              className={`px-5  text-white    flex items-center justify-center`}
            >
              <div className="cursor-pointer">
                <BiSolidHeartCircle
                  fill={wishlistActive ? "red" : "white"}
                  className="h-7 cursor-pointer  animate-pulse w-7"
                />
              </div>
            </div>
            <div className="p-2 text-[13px] flex items-center md:text-[16px]">
              {wishlistActive ? "Wishlisted" : "Wishlist"}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="loader flex justify-center items-center ">
      <Loader />
    </div>
  );
};

export default ProductRightSide;
