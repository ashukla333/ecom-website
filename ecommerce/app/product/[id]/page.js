"use client";
import { getproductApi, getproductByIdApi } from "@/app/apis/list";
import { customAxiosGET } from "@/app/apis/methods";
import Content from "@/components/common/Content";
import ProductLeftSide from "@/components/product/ProductLeftSide";
import ProductRightSide from "@/components/product/ProductRightSide";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [Product, setProduct] = useState([]);
  const [AboutProductData, setAboutProjectData] = useState();
  const { id } = useParams();
  const getProduct = async (id) => {
    try {
      const response = await customAxiosGET("", getproductByIdApi(id));
      if (response.status) {
        setProduct(response?.data?.productData);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  useEffect(() => {}, [AboutProductData]);

  console.log({ AboutProductData });
  return (
    <div>
      <div className="flex gap-2 md:p-10 p-3 flex-1 w-full  flex-col md:flex-row ">
        <div className="md:flex-[0.5] ">
          <ProductLeftSide
            Product={Product}
            setAboutProjectData={setAboutProjectData}
          />
        </div>
        <div className="md:flex-[0.5] bg-white">
          <ProductRightSide
            aboute={AboutProductData?.altText}
            rating={Product.ratings && Product.ratings[0]?.rating}
            Product={Product}
          />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2">
        <Content text={"Description"} weight={7} variant={6} />
        <span className="">
         {
          Product?.description
         }
        </span>
      </div>
    </div>
  );
};

export default page;
