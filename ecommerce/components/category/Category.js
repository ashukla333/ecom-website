import React, { useCallback, useEffect, useState, useMemo } from "react";
import CategoryRightSide from "./CategoryRightSide";
import { MdFilterList, MdFilterListOff } from "react-icons/md";
import Modal from "../common/Modal";
import Content from "../common/Content";
import RangeSlider from "../common/input/priceRange";
import { customAxiosGET } from "@/app/apis/methods";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { createUrlParamsFunction } from "@/helperFunction";
import Loader from "../common/Loader";

const Category = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState({
    gender: { name: "All", id: "1" },
  });
  const [rating, setRating] = useState(null);
  const [values, setValues] = useState([0, 10000]); // Default price range [min, max]
  const [loading, setLoading] = useState(false);

  const Gender = useMemo(() => [
    { name: "All", id: "1" },
    { name: "Male", id: "2" },
    { name: "Women", id: "3" },
    { name: "Unisex", id: "4" },
  ], []);

  const Rating = useMemo(() => [
    { name: "1 Stars & More", id: 1 },
    { name: "2 Stars & More", id: 2 },
    { name: "3 Stars & More", id: 3 },
    { name: "4 Stars & More", id: 4 },
    { name: "5 Stars & More", id: 5 },
  ], []);

  const handleChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const fetchProductByCategories = useCallback(async () => {
    if (!id) {
      toast.error("Category ID is missing.");
      return;
    }
    setLoading(true);
    try {
      const queryParams = {
        gender: filterValue.gender.name !== "All" ? filterValue.gender.name : undefined,
        minPrice: values[0] !== 0 ? values[0] : undefined,
        maxPrice: values[1] !== 10000 ? values[1] : undefined,
        minRating: rating || undefined,
      };

      const queryString = createUrlParamsFunction(queryParams);
      const url = `/v1/product/ProductByCategoryId/${id}?${queryString}`;
      const response = await customAxiosGET("", url);

      if (response.status) {
        setProducts(response.data.productData);
      } else {
        toast.error(response.message || "Failed to fetch products.");
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  }, [id, filterValue, rating, values]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProductByCategories();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [fetchProductByCategories]);

  return (
    <div>
      <div className="p-2 bg-main-bg border">
        <div
          className="flex py-2 justify-end"
          onClick={() => setFilter(!filter)}
        >
          <div className="inline-flex cursor-pointer overflow-hidden text-white bg-gray-900 rounded group">
            <span className="px-3.5 py-2 text-white bg-main-text group-hover:bg-purple-600 flex items-center justify-center">
              <MdFilterList className="w-5 h-5" />
            </span>
            <span className="pl-4 pr-5 md:text-base text-sm py-2.5">
              Filter Products
            </span>
          </div>
        </div>
        <div className="border bg-white">
          {loading ? <Loader /> : <CategoryRightSide Product={products} />}
        </div>
      </div>

      {/* Modal Filter */}
      <div className="relative h-full w-full top-0 right-0">
        <Modal
          open={filter}
          modelContentCss="!w-full !absolute left-0 scrollbar-hide !overflow-scroll top-0 xl:!w-[30%] !w-[95%] md:!w-[50%] lg:!w-[40%] !h-[100%]"
          setModelOpen={() => setFilter(!filter)}
        >
          <div className="p-2 flex flex-col gap-2">
            <Content
              className="text-main-text font-serif"
              weight={6}
              variant={6}
              text="Filter Product"
            />
          </div>
          <div className="p-2">
            <Content
              className="text-main-text font-serif"
              weight={6}
              variant={5}
              text="Gender"
            />
            <div className="grid grid-cols-2 py-2 gap-3">
              {Gender.map((value, index) => (
                <div
                  onClick={() => setFilterValue({ gender: value })}
                  key={index}
                  className={`${
                    filterValue.gender.id === value.id
                      ? "bg-main-text text-white"
                      : "bg-main-bg text-main-text"
                  } rounded-md border-2 border-main-text font-bold cursor-pointer md:text-base text-sm px-3 py-2`}
                >
                  {value.name}
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 !text-main-text">
            <Content
              className="!text-main-text font-serif"
              weight={6}
              variant={5}
              text="Price Range"
            />
            <RangeSlider max={10000} setValues={setValues} values={values} />
          </div>
          <div className="p-2">
            <Content
              className="text-main-text font-serif"
              weight={6}
              variant={5}
              text="Rating"
            />
            <div className="grid grid-cols-1 py-2 gap-3">
              {Rating.map((value, index) => (
                <div
                  onClick={() => setRating(value.id)}
                  className="flex font-bold md:text-base text-sm items-center gap-2"
                  key={index}
                >
                  <input
                    value={value.id}
                    type="radio"
                    className="text-main-text accent-black"
                    checked={rating === value.id}
                    onChange={handleChange}
                  />
                  {value.name}
                </div>
              ))}
            </div>
          </div> 
          <div className="flex w-full absolute bottom-1 justify-end p-2">
            <div
              className="text-white flex w-full justify-center items-center gap-2 cursor-pointer bg-main-text px-3 py-2 rounded-md"
              onClick={() => {
                setValues([0, 10000]);
                setRating(null);
                setFilterValue({ gender: { name: "All", id: "1" } });
              }}
            >
              <MdFilterListOff />
              <span>Clear Filter</span>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
