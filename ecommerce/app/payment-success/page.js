import PaymentSuccessClient from "@/components/checkout/PaymentSuccessClient";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Payment Details...</div>}>
        <PaymentSuccessClient />
      </Suspense>
    </div>
  );
};

export default PaymentSuccessPage;
