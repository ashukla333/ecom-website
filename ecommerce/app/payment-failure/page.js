"use client"
import React from "react";
import { useRouter } from "next/navigation";

const PaymentFailure = () => {
  const router = useRouter();

  return (
    <div className="failure-page text-center p-2 flex justify-center items-center h-screen flex-col gap-2">
      <h1 className="font-bold text-main-text">Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed. Please try again.</p>
      <button className="bg-red-600 text-white px-5  font-bold p-2 rounded-md " onClick={() => router.back()}>Go Back to Checkout</button>
    </div>
  );
};

export default PaymentFailure;
