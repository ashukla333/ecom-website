import React from "react";
import Content from "../common/Content";
import OrderCard from "../order/OrderCard";

const CheckOutRight = () => {
  return (
    <div>
      <div className=" p-5 bg-main-bg">
        <Content text={"Order Summary"} weight={6} variant={6} />
        <div className="py-3">
          <OrderCard />
        </div>
        <div className="border-b-2 py-2"> </div>
        <div>
          <div className=" flex justify-between pt-4">
            <div className="text-gray-500  font-800 ">Total Product</div>
            <div className="font-medium  text-base">9</div>
          </div>
          <div className=" flex justify-between pt-4">
            <div className="text-gray-500  font-800 ">SubTotal</div>
            <div className="font-medium  text-base">₹900.22</div>
          </div>
          <div className=" flex justify-between pt-4">
            <div className="text-gray-500  font-800 ">Discount</div>
            <div className="font-medium  text-base">-₹200</div>
          </div>
          <div className=" flex justify-between pt-4">
            <div className="text-gray-500  font-800 ">Delivery Charges</div>
            <div className="font-medium  text-base">Free</div>
          </div>
          <div className="border-b-2 py-2"> </div>
          <div className=" flex justify-between pt-4">
            <div className="text-gray-500   font-800  ">Total</div>
            <div className="font-semibold  md:text-xl text-lg">₹700.22</div>
          </div>
        </div>

      </div>
        <div className="text-main-text border-2 mt-2 shadow-md drop-shadow-md shadow-slate-300 border-main-text text-center hover:ring-white cursor-pointer p-2 text-lg font-semibold hover:bg-main-text hover:text-white bg-white outline-1 ">Place Order</div>
    </div> 
  );
};

export default CheckOutRight;
