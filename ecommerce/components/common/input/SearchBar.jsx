// components/SearchBar.js
import React from 'react';
import { ImSearch } from "react-icons/im";

const SearchBar = ({ placeholder,...props }) => {
  return (
    <div className="flex items-center border p-1 border-gray-300 rounded-md overflow-hidden">
      <input
        type="text"
        className="px-4 py-1 w-full outline-none"
        placeholder={placeholder}
      />
      <button className="px-2 py-1 rounded-sm bg-main-text text-white">
      <ImSearch className='text-xl'/>
      </button>
    </div>
  );
};

export default SearchBar;
