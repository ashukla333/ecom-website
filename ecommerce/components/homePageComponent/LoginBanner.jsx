import Image from "next/image";
import React from "react";
import { BiLogInCircle } from "react-icons/bi";
import { VscSignIn } from "react-icons/vsc";

const LoginBanner = () => {
  return (
    <div className="relative w-full md:h-[80px] h-[140px]">
      <div className="top-0 absolute left-0 md:h-[80px] h-[120px] w-full">
        <Image
          src={`/images/loginbanner.png`}
          width={1000}
          height={2000}
          className="w-full h-full"
          alt="bannerImage"
        ></Image>
      </div>
      <div className="absolute md:flex md:flex-row flex-col gap-4 top-3 w-full items-center md:px-10 px-2  justify-between ">
        <div className="text-[24px] font-bold text-primary-color ">
          Register Kingsvilla{" "}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div
            className="!w-max gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300 cursor-pointer bg-primary-color   bg-[length:200%_100%] px-6 font-medium text-main-text transition-colors focus:outline-none focus:ring-2 flex focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            type=""
          >
            <span className="!font-medium">Login</span>
            <BiLogInCircle />
          </div>
          <div
            className="!w-max gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300 cursor-pointer bg-primary-color   bg-[length:200%_100%] px-6 font-medium text-main-text transition-colors focus:outline-none focus:ring-2 flex focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            type=""
          >
            <span className="!font-medium">Sign In</span>
            <VscSignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
