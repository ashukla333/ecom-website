import React from "react";
import CartCard from "./CartCard";

const CartLeftSide = ({setIncrement,Increment}) => {
  return (
    <div>
      <CartCard  Increment={Increment} setIncrement={setIncrement}/>
    </div>
  );
};

export default CartLeftSide;
