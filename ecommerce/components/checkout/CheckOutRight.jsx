import React, { useEffect, useState } from "react";
import Content from "../common/Content";
import { customAxiosPOST } from "@/app/apis/methods";
import { placeOrder, verifyPayment } from "@/app/apis/list";
import { toast } from "react-toastify";
import OrderCard from "../order/OrderCard";
import useUserInfo from "@/app/apis/userInfo";
import { useRouter } from "next/navigation";

const CheckOutRight = ({ ProductData, selectedAddress, orderData }) => {
  // Calculate total products
  const router=useRouter()
  const userInfo = useUserInfo();
  const [isProcessing, setIsProcessing] = useState(false);
  const totalProducts = orderData?.length || 0;

  // Initialize variables
  let subtotal = 0;
  let totalDiscount = 0;

  const orderItemsWithOffers = orderData?.map((item) => {
    // Find the product in ProductData
    const matchedProduct = ProductData.find(
      (product) => product._id === item.productId
    );

    if (matchedProduct) {
      // Correct calculation of discount based on offer percentage
      const offerPercentage = matchedProduct.offer || 0;

      // Convert offerPercentage to a decimal value for correct discount calculation
      const discountAmount = (item.price * offerPercentage) / 100;
      const priceAfterOffer = item.price - discountAmount;

      // Ensure priceAfterOffer is not negative
      const itemTotal =
        priceAfterOffer > 0
          ? priceAfterOffer * item.quantity
          : item.price * item.quantity;

      // Update subtotal and total discount
      subtotal += itemTotal;
      totalDiscount += matchedProduct.offer;

      return {
        ...item,
        offer: offerPercentage,
        priceAfterOffer,
        itemTotal,
        discountAmount, // Add discountAmount to the item
      };
    }

    return item;
  });

  // Delivery charges (assuming free in this example)
  const deliveryCharges = 0;

  // Calculate total
  const total = subtotal + deliveryCharges;

  // Debugging output
  console.log(`Subtotal: ₹${subtotal}`);
  console.log(`Total Discount: ₹${totalDiscount}`);
  console.log(`Total: ₹${total}`);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    if (!selectedAddress?.address) {
      setIsProcessing(false);
      toast.error("Address is required:)");
      return;
    }

    try {
      // Prepare order data
      const orderPayload = {
        orderItems: orderData.map((item) => ({
          productId: item.productId,
          name: ProductData.find((product) => product._id === item.productId)
            ?.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        shippingAddress: selectedAddress?.address,
        paymentMethod: "Razorpay", // or other payment methods
        totalAmount: subtotal, // Total amount after applying discounts
      };

      // Send order data to server
      const response = await customAxiosPOST("", placeOrder, orderPayload);

      if (response.status) {
        // Handle successful order placement
        console.log("Order placed successfully:", response.data);

        // Prepare Razorpay options
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
          amount: subtotal * 100,
          currency: "INR",
          name: "KingsVillah",
          description: "let's Pay",
          order_id: response.razorpayOrderId, 
          handler: async function (paymentResponse) {
            console.log("Razorpay Payment Response:", paymentResponse);
            try {
              // Confirm payment with your server
              const verificationPayload = {
                paymentId: paymentResponse.razorpay_payment_id,
                orderId: paymentResponse.razorpay_order_id,
                signature: paymentResponse.razorpay_signature,
              };

              const verificationResponse = await customAxiosPOST(
                "",
                verifyPayment,
                verificationPayload
              );

              if (verificationResponse.status) {
                toast.success("Payment successful!");
                // router.push("/payment-success");
                const queryParams = new URLSearchParams(verificationPayload).toString();
                router.push(`/payment-success?${queryParams}`); 
                  // router.push(`/payment-success?orderData=${encodeURIComponent(verificationPayload)}`);
              } else {
                // Handle verification failure
                toast.error("Payment verification failed!");
                router.push("/payment-failure");
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              toast.error("Error verifying payment!");
            }
          },
          prefill: {
            name: userInfo.user.name,
            email: userInfo.user.email,
            contact: selectedAddress.phone,
          },
          theme: {
            color: "#000000",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        console.error("Order placement failed:", response.data.message);
        toast.error("Order placement failed!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="p-5 bg-main-bg">
        <Content text={"Order Summary"} weight={6} variant={6} />
        <div className="py-3 scrollbar-hide h-full shadow-md overflow-y-auto">
          <OrderCard
            ProductData={orderItemsWithOffers}
            finalProduct={ProductData}
          />
        </div>
        <div className="border-b-2 py-2"> </div>
        <div>
          <div className="flex justify-between pt-4">
            <div className="text-gray-500 font-800">Total Products</div>
            <div className="font-medium text-base">{totalProducts}</div>
          </div>
          <div className="flex justify-between pt-4">
            <div className="text-gray-500 font-800">SubTotal</div>
            <div className="font-medium text-base">₹{subtotal.toFixed(2)}</div>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between pt-4">
              <div className="text-gray-500 font-800">Total Discount</div>
              <div className="font-medium text-base text-red-500">
                -₹{totalDiscount.toFixed(2)}
              </div>
            </div>
          )}
          <div className="flex justify-between pt-4">
            <div className="text-gray-500 font-800">Delivery Charges</div>
            <div className="font-medium text-base">
              {deliveryCharges === 0
                ? "Free"
                : `₹${deliveryCharges.toFixed(2)}`}
            </div>
          </div>
          <div className="border-b-2 py-2"> </div>
          <div className="flex justify-between pt-4">
            <div className="text-gray-500 font-800">Total</div>
            <div className="font-semibold md:text-xl text-lg">
              ₹{total.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-main-text border-2 mt-2 shadow-md drop-shadow-md shadow-slate-300 border-main-text text-center hover:ring-white cursor-pointer p-2 text-lg font-semibold hover:bg-main-text hover:text-white bg-white outline-1"
        onClick={handlePlaceOrder}
        disabled={isProcessing}
      >
        {isProcessing ? "Placing Order..." : "Place Order"}
      </div>
    </div>
  );
};

export default CheckOutRight;
