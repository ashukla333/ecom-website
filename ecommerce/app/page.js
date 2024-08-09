"use client";
import LoginBanner from "@/components/homePageComponent/LoginBanner";
import MainHomePageBanner from "@/components/homePageComponent/mainBanner";
import NewArrivalsSectionNew from "@/components/common/card/NewArrivalSection";
import { product, product2 } from "@/components/json";
import React from "react";



const Page = () => {
 
  return (
    <div className="">
      <MainHomePageBanner
        bannerData={{
          desktopBanner: [
            "/images/mainBanner.jpg",
            "/images/img11.jpg",
            // "/images/img1.jpg",
            "/images/img22.jpg",
            // "/images/banner1.png",
            // "/images/banner2.png",
            // "/images/banner3.png",
          ],
          mobileBanner: [
            "/images/loginscreen.jpg",
            "/images/signup.jpg",
            "/images/login.jpg",
          ],
        }}
      />
      <LoginBanner />
      {/* Product   */}
      <NewArrivalsSectionNew
        title="Women Clothing"
        imgClassName="lg:!h-[280px]"
        navigateArrowIcon={true}
        newArrivalsSectionData={product}
      />
      <NewArrivalsSectionNew
      // pricecss={"hidden"}
        title="Man Clothing"
        imgClassName="lg:!h-[260px]"
        navigateArrowIcon={true}
        // offerClass="hidden"
        newArrivalsSectionData={product2}
      />
 
    </div>
  );
};

export default Page;
