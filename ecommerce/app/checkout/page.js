import CheckOutLeft from "@/components/checkout/CheckOutLeft";
import CheckOutRight from "@/components/checkout/CheckOutRight";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-1 md:p-10 p-3 md:flex-row flex-col">
        <div className="flex-[0.7]"><CheckOutLeft/></div>
        <div className="flex-[0.3]"><CheckOutRight/></div>
      </div>
    </div>
  );
};

export default page;
