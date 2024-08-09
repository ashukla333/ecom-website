"use client";
import Categorys from "../homePageComponent/Categorys";
import CopyRights from "../common/CopyRights";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const router = usePathname();
  const pages = ["/login", "/signup"];
  const layOutFunction = (router) => {
    if (pages.includes(router)) {
      return true;
    } else {
      return false;
    }
  };

  return layOutFunction(router) ? (
    <> {children}</>
  ) : (
    <>
      <div style={{ zIndex: "1000" }}>
        <Header />
        <Categorys />
      </div>
      <div
        style={{ zIndex: "0" }}
        className="w-full min-h-[100vh]  !z-[0] overflow-x-hidden"
      >
        {children}
      </div>
      <Footer />
      <CopyRights />
    </>
  );
}
