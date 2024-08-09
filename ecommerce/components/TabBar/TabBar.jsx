import React from "react";

const TabBar = ({ tabData ,setTab,tab }) => {
  return (
    <div className="flex w-full gap-10  text-sm mt-4 border-b-2 border-main-text   font-bold ">
      {tabData.map((value, index) => {
        return <div onClick={()=>{setTab(value?.id)}} className={` px-10 py-2 ${tab==value?.id?"bg-main-text text-white":"text-main-text"} rounded-t-sm cursor-pointer `} key={index}>{value?.name}</div>;
      })}
    </div>
  );
};

export default TabBar;
