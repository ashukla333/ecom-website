"use client";
import React, { useEffect, useState } from "react";
import Content from "@/components/common/Content";
import TabBar from "@/components/TabBar/TabBar";
import { FaUser, FaShoppingBag, FaClipboardList } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";
import useUserInfo from "../apis/userInfo";
import { DeleteOrderApi, getAllOrderApi } from "../apis/list";
import { customAxiosDELETE, customAxiosGET } from "../apis/methods";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const Page = () => {
  const user = useUserInfo();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = parseInt(searchParams.get("tab")) || 1;
  const [tab, setTab] = useState(initialTab);
  const [OrderData, setOrderData] = useState([]);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const GetAllOrder = async (id) => {
    try {
      const result = await customAxiosGET("", getAllOrderApi(id));
      if (result.status) {
        setOrderData(result?.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const DeleteOrder = async (id) => {
    try {
      const result = await customAxiosDELETE("", DeleteOrderApi(id));
      if (result.status) {
        toast.success(result.message);
        GetAllOrder(user?.user?._id);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  useEffect(() => {
    if (user?.user?._id) {
      GetAllOrder(user?.user?._id);
    }
  }, [user?.user?._id]);

  const tabData = [
    {
      name: "My Account",
      id: 1,
      icon: <FaUser className="inline mr-2" />,
    },
    {
      name: "My Orders",
      id: 2,
      icon: <FaShoppingBag className="inline mr-2" />,
    },
    {
      name: "Order Details",
      id: 3,
      icon: <FaClipboardList className="inline mr-2" />,
    },
  ];

  const handleCancelOrder = (orderId) => {
    // Implement the cancel order logic here
    console.log("Cancelling order:", orderId);
    DeleteOrder(orderId);
    // Update order state or notify user
  };

  const changeTab = (id) => {
    setTab(id);
    router.replace(`?tab=${id}`);
  };

  return (
    <div className="p-5">
      <Content
        className={"uppercase"}
        weight={7}
        variant={7}
        text={`hi ${user?.name}`}
      />
      <div>
        <TabBar tabData={tabData} tab={tab} setTab={changeTab} />
      </div>
      <div className="py-2 grid bg-gray-100 p-2 rounded-b-md md:grid-cols-2 grid-cols-1 md:gap-10 gap-4">
        {tab === 1 && (
          <>
            <div className="mb-2 flex flex-col gap-2">
              <strong>User Name:</strong>{" "}
              <span className="border-b-2 capitalize bg-white p-1 text-lg rounded-t-md border-main-text">
                {user?.name || "-"}
              </span>
            </div>
            <div className="mb-2 flex flex-col gap-2">
              <strong>Account Created At:</strong>{" "}
              <span className="border-b-2 bg-white p-1 text-lg rounded-t-md border-main-text">
                {user?.user?.createdAT
                  ? new Date(user.user.createdAT).toLocaleDateString()
                  : "-"}
              </span>
            </div>
            <div className="mb-2 flex flex-col gap-2">
              <strong>Email:</strong>{" "}
              <span className="border-b-2 bg-white p-1 text-lg rounded-t-md border-main-text">
                {user?.user?.email || "-"}
              </span>
            </div>
          </>
        )}
        {tab === 2 && (
          <div className="col-span-2 overflow-y-auto">
            <strong>My Orders:</strong>
            {OrderData.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 mt-2 rounded-md shadow-md border flex justify-between items-center"
              >
                <div>
                  <span className="block font-semibold">
                    Order #{order._id}
                  </span>
                  <span className="block text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="block text-sm text-gray-600">
                    Total: ₹{order.totalAmount}
                  </span>
                  <span className="block text-sm text-gray-600">
                    Status:{" "}
                    <span
                      className={`${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      } font-semibold`}
                    >
                      {order.status}
                    </span>
                  </span>
                </div>
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="bg-red-500 text-white shadow-md px-3 py-2 rounded-md hover:bg-red-600"
                  >
                    <RiDeleteBin5Fill fill="white" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {tab === 3 && (
          <div className="col-span-2">
            <strong>Order Details:</strong>
            {OrderData.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 mt-2 rounded-md shadow-sm"
              >
                <div className="mb-2 border p-2 rounded-md">
                  <span className="block font-semibold">
                    Order #{order._id}
                  </span>
                  {order.orderItems.map((item) => (
                    <div key={item._id}>
                      <span className="block text-sm text-gray-600">
                        Item: {item.name}
                      </span>
                      <span className="block text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                      <span className="block text-sm text-gray-600">
                        Price: ₹{item.price}
                      </span>
                      <span className="block text-sm text-gray-600">
                        Total: ₹{item.total}
                      </span>
                    </div>
                  ))}
                  <span className="block text-sm text-gray-600">
                    Status: {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
