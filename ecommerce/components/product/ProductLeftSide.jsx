import Image from "next/image";
import React from "react";
import { product2 } from "../json";

const ProductLeftSide = () => {
  return (
    <div>
      <div className="w-full border-2 border-main-text overflow-hidden h-[250px] md:!h-[500px] ">
        <Image
          src={"/products/p11.jpg"}
          height={500}
          width={500}
          alt="product Image"
          className="w-full object-cover hover-effect h-full"
        />
      </div>
      <div className="flex pt-5 gap-2">
{
    product2?.products?.slice(1,5)?.map((value,index)=>{
        return  <div key={index} className="w-full border-2 border-main-text overflow-hidden h-[50px] md:!h-[100px] ">
        <Image
          src={value?.image}
          height={500}
          width={500}
          alt="product Image"
          className="w-full object-cover hover-effect h-full"
        />
      </div>
    })
}
      </div>
    </div>
  );
};

export default ProductLeftSide;
