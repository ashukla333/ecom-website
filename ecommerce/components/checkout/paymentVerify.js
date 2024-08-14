import { verifyPayment } from "@/app/apis/list";
import { customAxiosPOST } from "@/app/apis/methods";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const PaymentVerification = ({ paymentDetails, orderId }) => {
    const router=useRouter()
  const handlePaymentVerification = async () => {
    try {
      const response = await customAxiosPOST("", verifyPayment, paymentDetails);
      if (response.status) {
        toast.success("Payment verified successfully!");
        router.push('/')
        // Redirect to order success page or show a success message
      } else {
        toast.error("Payment verification failed!");
        // Redirect to order failure page or show a failure message
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Error verifying payment!");
    }
  };

  return (
    <div>
      <button
        onClick={handlePaymentVerification}
        className="text-main-text border-2 px-5 rounded-md mt-2 shadow-md drop-shadow-md shadow-slate-300 border-main-text text-center hover:ring-white cursor-pointer p-2 text-lg font-semibold hover:bg-main-text hover:text-white bg-white outline-1"
      >
        Verify Payment
      </button>
    </div>
  );
};

export default PaymentVerification;
