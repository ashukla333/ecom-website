"use client";
import LoginBanner from "@/components/homePageComponent/LoginBanner";
import MainHomePageBanner from "@/components/homePageComponent/mainBanner";
import NewArrivalsSectionNew from "@/components/common/card/NewArrivalSection";
// import { product, product2 } from "@/components/json";
import React, { useEffect, useState } from "react";
import { customAxiosGET } from "./apis/methods";
import { getCategoryApi, getProductByCategoryIdApi } from "./apis/list";
import { toast } from "react-toastify";
import BrandsSection from "@/components/homePageComponent/BrandsSection";

const Page = () => {
  const [product, setProduct] = useState([]);
  const [productMan, setProductMan] = useState([]);

  const [category, setCategories] = useState({});

  const fetchCategoriesFistData = async (category) => {
    try {
      const response = await customAxiosGET(
        "",
        getProductByCategoryIdApi(category.first._id)
      );
      if (response.status) {
        setProduct(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch categories.");
    }
  };
  const fetchCategoriesSecondData = async (category) => {
    try {
      const response = await customAxiosGET(
        "",
        getProductByCategoryIdApi(category.second._id)
      );
      if (response.status) {
        setProductMan(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch categories.");
    }
  };

  const fetchCategoriesAPi = async () => {
    try {
      const response = await customAxiosGET("", getCategoryApi);
      if (response.status) {
        setCategories({
          first: response.data.categorylist[0],
          second: response.data.categorylist[1],
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategoriesAPi();
  }, []);

  useEffect(() => {
    fetchCategoriesFistData(category);
    fetchCategoriesSecondData(category);
  }, [category]);

  return (
    <div className="">
      <MainHomePageBanner
        bannerData={{
          desktopBanner: [
            "/images/mainBanner.jpg",
            "/images/img11.jpg",
            "/images/img22.jpg",
          ],
          mobileBanner: [
            "/images/loginscreen.jpg",
            "/images/signup.jpg",
            "/images/login.jpg",
          ],
        }}
      />
      <LoginBanner />
      <BrandsSection />
      {/* Product   */}
      <NewArrivalsSectionNew
        title={`${category?.first?.categoryName || ""} Cloth`}
        navigateArrowIcon={true}
        newArrivalsSectionData={product}
        CategoryID={category?.second?._id}
      />
      <NewArrivalsSectionNew
        // pricecss={"hidden"}
        title={`${category?.second?.categoryName || ""} Cloth`}
        navigateArrowIcon={true}
        // offerClass="hidden"
        CategoryID={category?.second?._id}
        newArrivalsSectionData={productMan}
      />
    </div>
  );
};

export default Page;
