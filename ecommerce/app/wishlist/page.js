import { product } from "@/components/json";
import Wishlish from "@/components/wishlist/Wishlish";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen  flex justify-center items-center">
      {product?.products?.length > 0 ? (
        <div className="grid md:p-5 p-3 lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-3 w-full">
          {product.products.map((value, index) => (
            <div key={index} className="w-full h-full">
              <Wishlish value={value} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-center flex-col items-center w-[400px] h-[400px]">
          <Image
            src={`${process.env.BASE_URL}/noimg.gif`}
            height={500}
            width={500}
            alt="No Image"
            className="h-full w-full hover-effect"
          />
          Nothing to Show! Unlock Your Shopping Desires: <br/>
          Fill Your Empty Wishlist
        </div>
      )}
    </div>
  );
};

export default Page;
