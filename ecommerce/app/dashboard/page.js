"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaListAlt, FaCogs } from "react-icons/fa"; // Import icons from react-icons
import { FaBox, FaChartBar, FaTag, FaUsers } from "react-icons/fa6";
import Product from "./product/page";
import Category from "./category/page";

const tabs = [
  {
    name: "Product",
    component: <Product />,
    content: "This is the Product page content.",
    icon: <FaBox />,
  },
  {
    name: "Brand",
    content: "This is the Brand page content.",
    icon: <FaTag />,
  },
  {
    name: "Order",
    content: "This is the Order page content.",
    icon: <FaShoppingCart />,
  },
  {
    name: "Category",
    component: <Category />,
    content: "This is the Category page content.",
    icon: <FaListAlt />,
  },
  {
    name: "Reports",
    content: "This is the Reports page content.",
    icon: <FaChartBar />,
  },
  {
    name: "Users",
    content: "This is the Users page content.",
    icon: <FaUsers />,
  },
  {
    name: "Settings",
    content: "This is the Settings page content.",
    icon: <FaCogs />,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const renderContent = () => {
    const activeTabData = tabs.find((tab) => tab.name === activeTab);
    return activeTabData ? (
      activeTabData.component || <div>{activeTabData.content}</div>
    ) : (
      <div>Select a tab to view content.</div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Tabbar */}
      <div className="flex-[15%] bg-main-bg text-main-text p-4">
        <h2 className="text-xl font-bold mb-4">Welcome!</h2>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`mb-2 cursor-pointer p-2 rounded border-2 ${
                activeTab === tab.name
                  ? "bg-gray-300 border-gray-500"
                  : "hover:bg-gray-200 border-transparent"
              } flex items-center space-x-2`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Main Content */}
      <div className="flex-[85%] bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
