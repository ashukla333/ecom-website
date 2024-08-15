import React from "react";
import ProductCard from "../common/card/ProductCard";
import { product, product2 } from "../json";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import ProductCardMain from "../common/card/ProductCardMain";

const CategoryRightSide = ({ Product, ...props }) => {
  return Product?.length > 0 ? (
    <div className="md:p-2 grid lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-5 gap-2">
      {Product?.length > 0 &&
        Product.map((value, index) => {
          return (
            value?.isActive && (
              <ProductCardMain wishlist={false} value={value} key={index} />
            )
          );
        })}
    </div>
  ) : (
    <Link
      href={"/"}
      className="flex justify-center gap-2 h-[200px] items-center font-bold md:text-xl text-sm "
    >
      <IoChevronBackOutline /> No Category Found
    </Link>
  );
};

export default CategoryRightSide;
