"use client";
import CartLeftSide from "@/components/cart/CartLeftSide";
import CartRightSide from "@/components/cart/CartRightSide";
import React, { useEffect, useState } from "react";
import {
  customAxiosDELETE,
  customAxiosGET,
  customAxiosPOST,
} from "../apis/methods";
import {
  createWishlistApi,
  getAllCartByIdApi,
  getproductApi,
  removeCartApi,
} from "../apis/list";
import { toast } from "react-toastify";
import { debounce } from "@/helperFunction";
import useUserInfo from "../apis/userInfo";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [Increment, setIncrement] = useState(0);
  const [getCartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ProductData, setProduct] = useState([]);
  const [quantities, setQuantities] = useState({});
  const userId = useUserInfo();

  const getCartDataByID = async (id) => {
    setLoading(true);
    try {
      const response = await customAxiosGET("", getAllCartByIdApi(id));
      if (response.status || response.success) {
        setCartData(response?.data?.items);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log({ getCartData });

  const getProductAllData = async () => {
    if (getCartData.length === 0) {
      return; // If no cart data, exit early
    }

    setLoading(true);
    const filterData = getCartData.map((v) => v.productId);
    console.log("Filter Data (Cart Product IDs):", filterData);

    try {
      const response = await customAxiosGET("", getproductApi);
      console.log("API Response Data:", response?.data?.productData);

      if (response.status || response.success) {
        const filteredProducts = response?.data?.productData?.filter((value) =>
          filterData.includes(value?._id?.trim())
        );

        console.log("Filtered Products:", filteredProducts);
        setProduct(filteredProducts);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const AddWishList = async (data) => {
    setLoading(true);
    try {
      const response = await customAxiosPOST("", createWishlistApi, data);
      if (response.status) {
        toast.success(response.message);
        if (userId?.user?._id) {
          getCartDataByID(userId?.user?._id);
        }
        window.location.reload();
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
        window.location.reload();
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

  useEffect(() => {
    if (getCartData.length > 0) {
      getProductAllData();
    }
  }, [getCartData]);
  

  console.log({ ProductData });

  return !loading ? (
    <div>
      <div className="flex flex-1 md:p-2 gap-5 p-3 md:flex-row flex-col">
        <div className="md:flex-[0.7] md:h-screen scrollbar-hide overflow-y-auto">
          <CartLeftSide
            setQuantities={setQuantities}
            quantities={quantities}
            RemoveCart={RemoveCart}
            AddWishList={AddWishList}
            ProductData={ProductData}
            Increment={Increment}
            setIncrement={setIncrement}
          />
        </div>
        <div className="md:flex-[0.3]">
          <CartRightSide getCartData={getCartData} quantities={quantities} ProductData={ProductData} />
        </div>
      </div>
    </div>
  ) : (
    <div className="loader flex justify-center items-center ">
      <Loader />
    </div>
  );
};

export default Page;
