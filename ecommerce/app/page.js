"use client";
import LoginBanner from "@/components/homePageComponent/LoginBanner";
import MainHomePageBanner from "@/components/homePageComponent/mainBanner";
import NewArrivalsSectionNew from "@/components/common/card/NewArrivalSection";
import React, { useEffect, useState } from "react";
import { customAxiosGET } from "./apis/methods";
import { getCategoryApi, getProductByCategoryIdApi } from "./apis/list";
import { toast } from "react-toastify";
import BrandsSection from "@/components/homePageComponent/BrandsSection";
import Loader from "@/components/common/Loader";


const Page = () => {
  const [product, setProduct] = useState([]);
  const [productMan, setProductMan] = useState([]);
  const [category, setCategories] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCategoriesFirstData = async (category) => {
    setLoading(true); // Start loading before API call
    try {
      const response = await customAxiosGET(
        "",
        getProductByCategoryIdApi(category.first._id)
      );
      if (response.status) {
        setProduct(response.data);
      } else {
        // toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  const fetchCategoriesSecondData = async (category) => {
    setLoading(true); // Start loading before API call
    try {
      const response = await customAxiosGET(
        "",
        getProductByCategoryIdApi(category.second._id)
      );
      if (response.status) {
        setProductMan(response.data);
      } else {
        // toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  const fetchCategoriesAPI = async () => {
    setLoading(true); // Start loading before API call
    try {
      const response = await customAxiosGET("", getCategoryApi);
      if (response.status) {
        setCategories({
          first: response.data.categorylist[0],
          second: response.data.categorylist[1],
        });
      } else {
        // toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  useEffect(() => {
    fetchCategoriesAPI();
  }, []);

  useEffect(() => {
    if (category.first && category.second) {
      fetchCategoriesFirstData(category);
      fetchCategoriesSecondData(category);
    }
  }, [category]);

  if (loading) {
    return <Loader />; // Show the loader if any API is being fetched
  }

  return (
    <div className="">
      <MainHomePageBanner
        bannerData={{
          desktopBanner: [
            "/images/bannerVideo.mp4",
          ],
          mobileBanner: [
            "/images/bannerVideo.mp4",
          ],
        }}
      />
      <LoginBanner />
      <BrandsSection />
      {/* Product Sections */}
      <NewArrivalsSectionNew
        title={`${category?.first?.categoryName || ""} Cloth`}
        navigateArrowIcon={true}
        newArrivalsSectionData={product}
        CategoryID={category?.second?._id}
      />
      <NewArrivalsSectionNew
        title={`${category?.second?.categoryName || ""} Cloth`}
        navigateArrowIcon={true}
        CategoryID={category?.second?._id}
        newArrivalsSectionData={productMan}
      />
    </div>
  );
};

export default Page;
