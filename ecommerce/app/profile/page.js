"use client";
import Content from "@/components/common/Content";
import TabBar from "@/components/TabBar/TabBar";
import React, { useState } from "react";
import useUserInfo from "../apis/userInfo";

const Page = () => {
  const user = useUserInfo();
  const [tab, setTab] = useState(1);
  const tabData = [
    {
      name: "My Account",
      id: 1,
    }
  ];
 
 
  return (
    <div className="p-5">
      <Content
        className={"uppercase"}
        weight={7}
        variant={7}
        text={"hi aman!"}
      />
      <div>
        <TabBar tabData={tabData} tab={tab} setTab={setTab} />
      </div>
      <div className="py-2 grid bg-gray-100 p-2 rounded-b-md md:grid-cols-2 grid-cols-1 md:gap-10 gap-4 ">
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
      </div>
    </div>
  );
};

export default Page;
