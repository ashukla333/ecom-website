import React from "react";
import Content from "../common/Content";
import { customAxiosPOST } from "@/app/apis/methods";
import { toast } from "react-toastify";
import { processOrder } from "@/app/apis/list";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/app/store/createStore";

const CartRightSide = ({ ProductData, getCartData, quantities }) => {
  const router = useRouter();
  const { cartItems, setCartItems, clearCart } = useOrderStore();
  // Function to calculate total price
  const calculateTotalPrice = () => {
    return ProductData.reduce((total, product) => {
      const quantity = quantities[product._id] || 0; // Get the quantity for the product
      return total + product.price * quantity; // Accumulate the total price
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  // Prepare data for API call
  const prepareCartItems = () => {
    return getCartData.map(cartItem => {
      const productQuantity = quantities[cartItem.productId] || 0;
      return {
        productId: cartItem.productId,
        quantity: productQuantity,
        size: cartItem.size,
      };
    });
  };

  // Check if any product has a quantity of 0
  const hasZeroQuantity = () => {
    return getCartData.some(cartItem => {
      const productQuantity = quantities[cartItem.productId] || 0;
      return productQuantity <= 0;
    });
  };

  const handleCheckout = async () => {
    // Check if there's any zero quantity item
    if (hasZeroQuantity()) {
      toast.error('Cannot process checkout with zero quantity items');
      return; // Exit function without proceeding
    }

    const cartItems = prepareCartItems();

    try {
      const response = await customAxiosPOST("", processOrder, { cartItems });
      if (response.status) {
        toast.success(response.message);
        clearCart(); 
        const orderData = JSON.stringify(response.orderItems);
        router.push(`/checkout?orderData=${encodeURIComponent(orderData)}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to process order');
    }
  };

  return (
    <div>
      <div className="w-full h-full bg-main-bg text-main-text border p-4">
        <Content text={"Price Details"} variant={5} weight={6} />

        {ProductData.map((product) => {
          const quantity = quantities[product._id] || 0;
          return (
            <div key={product._id} className="flex justify-between pt-4">
              <div className="text-gray-500">
                {product.name} ({quantity} {quantity > 1 ? "items" : "item"})
              </div>
              <div className="font-bold">₹{product.price * quantity}</div>
            </div>
          );
        })}

        <div className="border-b py-3"></div>
        <div className="flex justify-between pt-4">
          <div className="text-gray-500">Total</div>
          <div className="font-bold text-xl">₹{totalPrice}</div>
        </div>
        <div className="pt-10">
          <div
            onClick={handleCheckout}
            className="inline-flex w-full cursor-pointer text-center overflow-hidden text-white hover:bg-white hover:text-black border-main-text border-2 bg-gray-900 rounded group"
          >
            <span className="pl-4 pr-5 font-mono py-2.5 text-center flex items-center justify-center w-full">
              Process To Checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRightSide;
