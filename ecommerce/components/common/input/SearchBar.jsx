// components/SearchBar.js
import React, { useState } from 'react';
import { ImSearch } from "react-icons/im";
import { useRouter } from 'next/navigation';

const SearchBar = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // router.push(`?search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex items-center border p-1 border-gray-300 rounded-md overflow-hidden">
      <input
        type="text"
        className="px-4 py-1 w-full outline-none"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-2 py-1 rounded-sm bg-main-text text-white"
        onClick={handleSearch}
      >
        <ImSearch className='text-xl'/>
      </button>
    </div>
  );
};

export default SearchBar;
