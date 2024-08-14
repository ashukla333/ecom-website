"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentVerification from "@/components/checkout/paymentVerify";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");
  const signature = searchParams.get("signature");

  console.log({paymentId, orderId, signature}); // Debugging output

  const paymentDetails = {
    paymentId: paymentId,
    orderId: orderId,
    signature: signature,
  };

  return (
    <div className="success-page text-center flex justify-center items-center h-screen flex-col gap-2">
      <h1 className="font-bold text-main-text">Payment Successful!</h1>
      <p>Your payment was successful. Thank you for your purchase!</p>
      <PaymentVerification paymentDetails={paymentDetails} />
      <button
        className="bg-green-600 px-5 text-white font-bold p-2 rounded-md "
        onClick={() => router.push("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
