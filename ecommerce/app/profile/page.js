"use client";
import ClientComponent from "@/components/order/ClientComponent";
import React, { Suspense } from "react";


const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent />
    </Suspense>
  );
};

export default Page;
