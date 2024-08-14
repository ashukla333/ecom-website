import { getCategoryApi } from "@/app/apis/list";
import { customAxiosGET } from "@/app/apis/methods";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Categorys = () => {
 
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await customAxiosGET("", getCategoryApi);
      if (response.status) {
        setCategories(response.data.categorylist);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="text-black bg-main-bg items-center flex-initial whitespace-nowrap scrollbar-hide flex gap-3 md:px-10 px-3 overflow-x-auto w-full">
      {categories?.filter(category => category.isActive).map((value, index) => (
        <Link
        href={`/category/${value?._id}`}
          className="inline-block px-4 md:text-base text-sm capitalize hover:text-[#FE2C54] text-main-text font-[500] cursor-pointer  py-2 h-10 mr-3 w-full "
          key={index}
        >
          {value?.categoryName}
        </Link>
      ))}
    </div>
  );
};

export default Categorys;
