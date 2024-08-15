"use client";

import CheckOutLeft from "@/components/checkout/CheckOutLeft";
import CheckOutRight from "@/components/checkout/CheckOutRight";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { customAxiosGET } from "../apis/methods";
import { getproductApi } from "../apis/list";
import { toast } from "react-toastify";

const Page = () => {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ProductData, setProduct] = useState([]);

  const getSelectedAddress = (addresses) => {
    const selectedAddress = addresses.find((address) => address.selected);

    if (selectedAddress) {
      return {
        fullName: `${selectedAddress.firstName} ${selectedAddress.lastName}`,
        address: `${selectedAddress.address}, ${selectedAddress.area}, ${selectedAddress.city} - ${selectedAddress.pinCode}`,
        phoneNumber: selectedAddress.number,
      };
    }

    return null; // No selected address found
  };

  const selectedAddress = getSelectedAddress(addresses);

  console.log({ selectedAddress });

  useEffect(() => {
    const orderDataParam = searchParams.get("orderData");
    if (orderDataParam) {
      const parsedOrderData = JSON.parse(decodeURIComponent(orderDataParam));
      setOrderData(parsedOrderData);
    }
  }, [searchParams]);

  console.log({ orderData });

  const getProductAllData = async () => {
    if (!orderData || orderData.length === 0) {
      return; // If no cart data, exit early
    }

    setLoading(true);
    const filterData = orderData.map((v) => v.productId);
    console.log("Filter Data (Cart Product IDs):", filterData);

    try {
      const response = await customAxiosGET("", getproductApi);
      console.log("API Response Data:", response?.data?.productData);

      if (response.status || response.success) {
        const filteredProducts = response?.data?.productData?.filter((value) =>
          filterData.includes(value?._id?.trim())
        );

        console.log("Filtered Products:", filteredProducts);
        setProduct(filteredProducts);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderData?.length > 0) {
      getProductAllData();
    }
  }, [orderData]);

  console.log({ ProductData });

  return (
    <div>
      <div className="flex flex-1 md:p-10 p-3 md:gap-4 gap-3 md:flex-row flex-col">
        <div className="flex-[0.6]">
          <CheckOutLeft setAddresses={setAddresses} addresses={addresses} />
        </div>
        <div className="flex-[0.4]">
          <CheckOutRight
            selectedAddress={selectedAddress}
            orderData={orderData}
            ProductData={ProductData}
          />
        </div>
      </div>
    </div>
  );
};

// Wrap Page component in Suspense in the export
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Page />
    </Suspense>
  );
}
