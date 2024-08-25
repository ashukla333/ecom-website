"use client";
import { product } from "@/components/json";
import Wishlish from "@/components/wishlist/Wishlish";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { customAxiosGET } from "../apis/methods";
import { getproductApi } from "../apis/list";
import { toast } from "react-toastify";
import ProductCard from "@/components/common/card/ProductCard";
import Loader from "@/components/common/Loader";

const Page = () => {
  const [Product, setProduct] = useState([]);
  const [loader,setLoader]=useState(false)
  const getProduct = async () => {
    setLoader(true)
    try {
      const response = await customAxiosGET("", getproductApi);
      if (response.status) {
        setLoader(false)
        setProduct(response?.data?.productData);
      } else {
        toast.error(response.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return !loader?(
    <div className="w-full py-5   flex justify-center items-center">
      {Product?.length > 0 ? (
        <div className="md:p-2   grid lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-5 gap-2">
          {Product?.length > 0 &&
            Product.map((value, index) => {
              return (
                value?.isActive && <ProductCard wishlist={true} value={value} key={index} />
              );
            })}
        </div>
      ) : (
        <div className="flex justify-center  text-center flex-col items-center w-[400px] h-[400px]">
          <Image
            src={`${process.env.BASE_URL}/noimg.gif`}
            height={500}
            width={500}
            alt="No Image"
            className="h-full w-full hover-effect"
          />
          Nothing to Show! Unlock Your Shopping Desires: <br />
          Fill Your Empty Wishlist
        </div>
      )}
    </div>
  ):(
    <div className="flex justify-center items-center h-screen">
     <Loader/>
    </div>
  )
};

export default Page;
