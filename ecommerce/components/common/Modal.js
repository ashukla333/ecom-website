import Image from "next/image";
import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";

const Model = ({ children, open, setModelOpen, ...props }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return ()=>document.body.style.overflowY = "auto";
  }, [open]);

  return (
    open && (
      <div
        className={`fixed top-0 left-0 w-full  h-full bg-primary-bg-color bg-opacity-[0.7]  z-[1000] flex justify-center items-center ${props?.modelContainerCss}`}
      >
        <div
          className={`relative w-[90%] md:w-[75%] h-[95%] md:h-[75%]  bg-white ${props?.modelContentCss}`}
        >
          {/* close button */}
          <div
            className={`absolute top-1 right-1   w-[40px] h-[40px] bg-primary-color flex justify-center items-center z-[100] cursor-pointer ${props?.modelCloseContainerCss}`}
            onClick={() => setModelOpen(false)}
          >
          <CgClose className="w-6 h-6 transition-all hover:rotate-90 " />
          </div>
          {/* children */}
          {children}
        </div>
      </div>
    )
  );
};

export default Model;