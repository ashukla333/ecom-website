import React, { useState } from "react";
import CategoryRightSide from "./CategoryRightSide";
import Image from "next/image";
import { MdFilterList } from "react-icons/md";
import Modal from "../common/Modal";
import Content from "../common/Content";
import { GrClear } from "react-icons/gr";
import RangeSlider from "../common/input/priceRange";

const Category = () => {
  const [filter, setFilter] = useState(false);
  const [FilterValue, setFilterValue] = useState({
    gender: { name: "All", id: "1" },
  });
  const [rating, setRating] = useState(null);
  const [values, setValues] = useState([50]);
  const Gender = [
    {
      name: "All",
      id: "1",
    },
    {
      name: "Men",
      id: "2",
    },
    {
      name: "Women",
      id: "3",
    },
    {
      name: "Unisex",
      id: "4",
    },
  ];
  const Rating = [
    {
      name: "1 Stars & above",
      id: 1,
    },
    {
      name: "2 Stars & above",
      id: 2,
    },
    {
      name: "3 Stars & above",
      id: 3,
    },
    {
      name: "4 Stars & above",
      id: 4,
    },
  ];

  const handleChange = (e) => {
    const { name } = e.target;
    setRating(name);
  };
  return (
    <div>
      <Image
        src={"/images/categoryPageImg.jpg"}
        alt="img"
        height={1000}
        width={1000}
        className="h-full w-full"
      />
      <div className=" p-2 bg-main-bg border  ">
        <div
          className="flex py-2 justify-end"
          onClick={() => {
            setFilter(!filter);
          }}
        >
          <div className="inline-flex cursor-pointer overflow-hidden text-white bg-gray-900 rounded group">
            <span className="px-3.5 py-2 text-white bg-main-text group-hover:bg-purple-600 flex items-center justify-center">
              <MdFilterList className="w-5 h-5" />
            </span>
            <span className="pl-4 pr-5 md:text-base text-sm  py-2.5">
              Filter Products
            </span>
          </div>
        </div>
        <div className=" border bg-white ">
          <CategoryRightSide />
        </div>
      </div>

      {/* modal filter */}
      <div className="relative h-full w-full top-0 right-0">
        <Modal
          open={filter}
          modelContentCss={
            "!w-full !absolute left-0 scrollbar-hide !overflow-scroll top-0 xl:!w-[30%] !w-[95%] md:!w-[50%] lg:!w-[40%] !h-[100%]"
          }
          setModelOpen={() => {
            setFilter(!filter);
            setValues([50]);
            setRating(null);
            setFilterValue({ gender: { name: "All", id: "1" } });
          }}
        >
          <div className="p-2 flex flex-col gap-2">
            <Content
              className={"text-main-text  font-serif"}
              weight={6}
              variant={6}
              text={"Filter Product"}
            />
          </div>
          <div className="flex justify-end p-2">
            <div
              className="text-white flex items-center gap-2 cursor-pointer bg-main-text px-3 py-2 rounded-md"
              onClick={() => {
                setValues([50]);
                setRating(null);
                setFilterValue({ gender: { name: "All", id: "1" } });
              }}
            >
              <GrClear />
              <span>Clear Filter</span>
            </div>
          </div>
          <div className="p-2">
            <Content
              className={"text-main-text  font-serif"}
              weight={6}
              variant={5}
              text={"Gender"}
            />
            <div className="grid grid-cols-2 py-2 gap-3">
              {Gender?.map((value, index) => {
                return (
                  <div
                    onClick={() => {
                      setFilterValue({ gender: value });
                    }}
                    key={index}
                    className={` ${
                      FilterValue?.gender?.id == value?.id
                        ? "bg-main-text text-white "
                        : "bg-main-bg text-main-text"
                    } rounded-md border-2 border-main-text font-bold cursor-pointer md:text-base text-sm px-3 py-2`}
                  >
                    {value?.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-2">
            <Content
              className={"text-main-text  font-serif"}
              weight={6}
              variant={5}
              text={"Price Range"}
            />
            <RangeSlider max={10000} setValues={setValues} values={values} />
          </div>
          <div className="p-2">
            <Content
              className={"text-main-text  font-serif"}
              weight={6}
              variant={5}
              text={"Rating"}
            />
            <div className="grid grid-cols-1 py-2 gap-3">
              {Rating?.map((value, index) => {
                return (
                  <div
                    onClick={() => {
                      setRating(value);
                    }}
                    className="flex font-bold  md:text-base text-sm items-center gap-2"
                    key={index}
                  >
                    <input
                      name={value?.name}
                      type="radio"
                      className="text-main-text accent-black"
                      checked={rating?.name == value?.name}
                      onClick={handleChange}
                    />
                    {value?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
