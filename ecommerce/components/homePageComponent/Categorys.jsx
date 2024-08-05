import React from "react";

const Categorys = () => {
  const categoryListing = [
    {
      name: "e-commerce",
      url: "e-commerce",
      baseurl: `/category/e-commerce`,
    },
    {
      name: "clothing",
      url: "clothing",
      baseurl: `/category/clothing`,
    },
    {
      name: "electronics",
      url: "electronics",
      baseurl: `/category/electronics`,
    },
    {
      name: "home & garden",
      url: "home-garden",
      baseurl: `/category/home-garden`,
    },
    {
      name: "beauty & health",
      url: "beauty-health",
      baseurl: `/category/beauty-health`,
    },
    {
      name: "sports & outdoors",
      url: "sports-outdoors",
      baseurl: `/category/sports-outdoors`,
    },
    {
      name: "toys & games",
      url: "toys-games",
      baseurl: `/category/toys-games`,
    },
    {
      name: "automotive",
      url: "automotive",
      baseurl: `/category/automotive`,
    },
    {
      name: "books & media",
      url: "books-media",
      baseurl: `/category/books-media`,
    },
    {
      name: "groceries",
      url: "groceries",
      baseurl: `/category/groceries`,
    },
    {
      name: "jewelry",
      url: "jewelry",
      baseurl: `/category/jewelry`,
    },
    {
      name: "pet supplies",
      url: "pet-supplies",
      baseurl: `/category/pet-supplies`,
    },
    {
      name: "office supplies",
      url: "office-supplies",
      baseurl: `/category/office-supplies`,
    },
  ];

  return (
    <div className="text-black bg-main-bg items-center flex-initial whitespace-nowrap scrollbar-hide flex gap-3 px-10 overflow-x-auto w-full">
      {categoryListing?.map((value, index) => (
        <div
          className="inline-block px-4 md:text-base text-sm capitalize hover:text-[#FE2C54] text-main-text font-[300] cursor-pointer  py-2 h-10 mr-3 w-full "
          key={index}
        >
          {value?.name}
        </div>
      ))}
    </div>
  );
};

export default Categorys;
