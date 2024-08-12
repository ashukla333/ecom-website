import Image from "next/image";
import React, { useState } from "react";

const ProductLeftSide = ({ Product ,setAboutProjectData}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      <div className="w-full border-2 border-main-text overflow-hidden h-[250px] md:!h-[500px]">
        {Product?.images && (
          <Image
            src={`${Product?.images[selectedImageIndex]?.url}`}
            height={500}
            width={500}
            alt="product Image"
            className="w-full object-cover hover-effect h-full"
          />
        )}
      </div>
      <div className="flex pt-5 gap-2">
        {Product?.images?.map((value, index) => (
          <div
            key={index}
            className="w-full border-2 border-main-text overflow-hidden h-[50px] md:!h-[100px] cursor-pointer"
            onClick={() => {handleThumbnailClick(index),setAboutProjectData(value)}}
          >
            <Image
              src={`${value?.url}`}
              height={500}
              width={500}
              alt="product Thumbnail"
              className="w-full object-cover hover-effect h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLeftSide;
