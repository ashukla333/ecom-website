"use client";
import Content from "@/components/common/Content";
import ProductLeftSide from "@/components/product/ProductLeftSide";
import ProductRightSide from "@/components/product/ProductRightSide";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex gap-2 md:p-10 p-3 flex-1 w-full  flex-col md:flex-row ">
        <div className="md:flex-[0.5] ">
          <ProductLeftSide />
        </div>
        <div className="md:flex-[0.5] bg-white">
          <ProductRightSide />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2">
        <Content text={"Description"} weight={7} variant={6} />
        <span className="">
          Fabric: High-quality cotton or cotton blends are ideal, providing
          durability, softness, and breathability.  <br></br>
          Fit: Opt for a slim, loose,
          or oversized fit depending on your preference and the occasion.
          Consider features like moisture-wicking properties for enhanced
          comfort.
        </span>
      </div>
    </div>
  );
};

export default page;
