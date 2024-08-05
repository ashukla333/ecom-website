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
}) => {
  return (
    <>
      <div className="py-4 text-main-text">
        <div className="items-center h-full justify-between gap-2 text-xl sm:text-2xl lg:text-3xl px-4 font-semibold hidden sm:flex">
          <div className="flex items-center">
            {" "}
            <div className="!h-8 !w-2 !bg-main-text !text-main-text !rounded-full !mr-2"></div>
            {title}
          </div>
          <Link
            href={`/category/${newArrivalsSectionData?.categoryHandle}?page=1`}
            className="w-[40px] h-[40px] rounded-full bg-primary-color-0.8 flex justify-center items-center cursor-pointer"
          >
            <MdChevronRight className="text-white-color" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-6">
          {newArrivalsSectionData?.products?.map((product, index) => {
            let { image, name, offersDescription, handle, id } = product;
            return (
              <Link href={`/product/${handle}?product=${id}`} key={index}>
                <Card className=" overflow-hidden w-full border-[0.05rem] border-main-text cursor-pointer">
                  <SimpleNameOfferCard
                    image={image}
                    title={name}
                    price={price}
                    offerClass={offerClass}
                    pricecss={pricecss}
                    imgClassName={`${imgClassName} `}
                    navigateArrowIcon={navigateArrowIcon}
                    offer={offersDescription}
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
