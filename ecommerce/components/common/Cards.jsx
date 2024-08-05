import React from "react";
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`h-auto rounded shadow-sm shadow-lightest-gray-color bg-white-color ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;