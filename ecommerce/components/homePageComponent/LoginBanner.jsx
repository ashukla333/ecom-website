import { getUserApi } from "@/app/apis/list";
import { customAxiosGET } from "@/app/apis/methods";
import useUserInfo from "@/app/apis/userInfo";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { VscSignIn } from "react-icons/vsc";

const LoginBanner = () => {
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    try {
      const result = await customAxiosGET("", getUserApi);
      if (result.status) {
        setUserData(result?.data);
        // localStorage.setItem("userInfo", JSON.stringify(result?.data));
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="relative w-full md:h-[80px] h-[140px]">
      <div className="top-0 absolute left-0 md:h-[80px] h-[120px] w-full">
        <Image
          src={`${process.env.BASE_URL}/images/loginbanner.png`}
          width={1000}
          height={2000}
          className="w-full h-full"
          alt="bannerImage"
        ></Image>
      </div>
      <div className="absolute md:flex md:flex-row flex-col gap-4 md:top-4 top-5 w-full items-center md:px-10 px-2  justify-between ">
        <div className="md:text-[24px] text-[21px] text-center font-bold flex items-center text-primary-color ">
          {userData?.user?.email
            ? "Welcome back to Kingsvilla! We’re thrilled to have you with us."
            : "Register Kingsvilla"}
        </div>
        {userData?.user?.email ? (
          <></>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Link
              href={"/login"}
              className="!w-max gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300 cursor-pointer bg-primary-color   bg-[length:200%_100%] px-6 font-medium text-main-text transition-colors focus:outline-none focus:ring-2 flex focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              type=""
            >
              <span className="!font-medium">Login</span>
              <BiLogInCircle />
            </Link>
            <Link
              href={"/signup"}
              className="!w-max gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300 cursor-pointer bg-primary-color   bg-[length:200%_100%] px-6 font-medium text-main-text transition-colors focus:outline-none focus:ring-2 flex focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              type=""
            >
              <span className="!font-medium">Sign In</span>
              <VscSignIn />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginBanner;
