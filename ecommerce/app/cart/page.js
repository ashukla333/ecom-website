"use client";
import CartLeftSide from "@/components/cart/CartLeftSide";
import CartRightSide from "@/components/cart/CartRightSide";
import React, { useState } from "react";

const page = () => {
  const [Increment, setIncrement] = useState(0);

  return (
    <div>
      <div className="flex flex-1 md:p-10 gap-5 p-3 md:flex-row flex-col">
        <div className="md:flex-[0.7]">
          <CartLeftSide Increment={Increment} setIncrement={setIncrement} />
        </div>
        <div className="md:flex-[0.3]">
          <CartRightSide Increment={Increment} />
        </div>
      </div>
    </div>
  );
};

export default page;
