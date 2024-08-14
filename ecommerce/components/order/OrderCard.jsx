import React from "react";
import Image from "next/image";
import Content from "../common/Content";
import SwiperSlider from "../common/SwiperSlider";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";

const OrderCard = ({ ProductData, finalProduct }) => {
  // Create a mapping of ProductData by _id
  const productMap = new Map(ProductData?.map(product => [product.productId, product]));

  // Merge the ProductData with finalProduct by matching IDs
  const mergedData = finalProduct?.map(orderItem => {
    const product = productMap?.get(orderItem._id);
    console.log(product,"product++")
    return {
      ...orderItem,
      ...product,
      quantity: product.quantity,
    };
  });

  console.log({mergedData,productMap})

  return (
    <div className="bg-white border w-full h-full   drop-shadow-md rounded-sm border-main-text">
      {mergedData?.map((item) => (
        <div key={item._id} className="flex gap-2 border-b items-center justify-between p-2">
          <div className="flex gap-2 items-center">
            <div className="w-[100px] h-[100px] ">
              <Link
                className="cursor-pointer rounded-sm w-[100px] h-[100px] "
                href={`/product/${item._id}`}
              >
                <SwiperSlider
                  slidesPerView={1}
                  autoplay={true}
                  loop={false}
                  pagination={true}
                  navigation={false}
                  className="w-[100px] h-[100px]"
                >
                  {item.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={img.url}
                        height={100}
                        width={100}
                        alt={`Product_Image_${index}`}
                        className="object-cover w-[100px] h-[100px] hover-effect"
                        onError={(event) => {
                          event.target.src = "/images/MyDefaultProduct.png";
                          event.error = null;
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </SwiperSlider>
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <Content text={item.name} variant={3} weight={5} />
              <div className="flex items-center gap-3">
                <span className="text-main-text md:text-[16px] text-[14px] font-bold">
                  ₹{item.price.toFixed(2)}
                </span>
                {item.offer > 0 && (
                  <span className="line-through text-red-500 font-semibold">
                    ₹{item.offer.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="p-2 text-main-text md:text-[15px] text-[12px] font-bold">
            x{item.quantity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
