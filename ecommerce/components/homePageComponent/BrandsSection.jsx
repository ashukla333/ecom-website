import { getBrandApi } from "@/app/apis/list";
import { customAxiosGET } from "@/app/apis/methods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BrandsSection = ({ imgClassName }) => {
  const [brands, setBrands] = useState([]);
  const fetchBrands = async () => {
    try {
      const response = await customAxiosGET("", getBrandApi);
      if (response.status) {
        setBrands(response.data.brandlist);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch brands.");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <>
     <div className="items-center h-full  pt-4 justify-between gap-2 text-xl sm:text-2xl lg:text-3xl px-4 font-semibold  sm:flex">
          <div className="flex items-center">
            {" "}
            <div className="!h-8 !w-2 !bg-main-text !text-main-text !rounded-full !mr-2"></div>
            {"Clothing Brands"}
          </div>
        
        </div>
      <div className="grid md:grid-cols-5 grid-cols-2 p-4  gap-2 !w-full h-full">
        {brands.map((value, index) => {
          return (
            value?.isActive && (
              <Link
                key={index}
                href={`/category/${value?._id}?page=1`}
                className="cursor-pointer "
              >
                <Image
                  src={`${value?.logoUrl}`}
                  width={500}
                  height={500}
                  alt="Product_Image"
                  className={`${imgClassName}   !h-[150px] w-full hover-effect`}
                  // unoptimized={true}
                  onError={(event) => {
                    event.target.src = "/images/MyDefaultProduct.png";
                    event.error = null;
                  }}
                />
              </Link>
            )
          );
        })}
      </div>
    </>
  );
};

export default BrandsSection;
