import React from "react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import SimpleNameOfferCard from "../SimpleNameOfCard";
import Card from "../Cards";

const NewArrivalsSectionNew = ({
  newArrivalsSectionData = [],
  title = "Title",
  offersDescription,
  navigateArrowIcon = false,
  imgClassName = "",
  pricecss,
  offerClass = "",
  price,
  CategoryID
}) => {

  return (
    <>
      <div className="md:py-4 pt-4 text-main-text">
        <div className="items-center flex h-full justify-between gap-2 text-xl sm:text-2xl lg:text-3xl px-4 font-semibold  sm:flex">
          <div className="flex items-center">
            {" "}
            <div className="!h-8 !w-2 !bg-main-text !text-main-text !rounded-full !mr-2"></div>
            {title}
          </div>
        <div className="md:block hidden">
        <Link
            href={`/category/${CategoryID}?page=1`}
            className=" h-[40px]  gap-2 rounded-full bg-primary-color-0.8 flex justify-center items-center cursor-pointer"
          >
            <span className="text-base">View All</span>
            <MdChevronRight className="text-white-color" />
          </Link>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-6">
          {newArrivalsSectionData?.productData?.map((product, index) => {
            let { images, name,price, offer,offersDescription, handle, _id } = product;
            return (
              <Link href={`/product/${_id}`} key={index}>
                <Card className=" overflow-hidden w-full border-[0.05rem] border-main-text cursor-pointer">
                  <SimpleNameOfferCard
                    image={images}
                    title={name}
                    offer={offer}
                    price={price}
                    offerClass={offerClass}
                    pricecss={pricecss}
                    imgClassName={`${imgClassName} `}
                    navigateArrowIcon={navigateArrowIcon}
                    // offer={offersDescription}
                  />
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="text-xl flex justify-center w-full visible sm:hidden bg-primary-color-0.1 font-semibold p-3 items-center gap-3">
          <div>View All</div>
          <Link
            href={`/category/${newArrivalsSectionData?.categoryHandle}?page=1`}
            className="w-[1.8rem] h-[1.8rem] rounded-full bg-primary-color-0.8 flex justify-center items-center cursor-pointer"
          >
            <MdChevronRight className="text-white-color" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewArrivalsSectionNew;
