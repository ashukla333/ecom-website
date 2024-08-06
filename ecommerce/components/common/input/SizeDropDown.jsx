import { useState, useEffect } from 'react';

const SizeDropdown = ({ selectedSize,setSelectedSize, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle size selection
  const handleSizeSelect = (size) => {
    onChange(size); // Notify parent component about the selected size
    setIsOpen(false); // Close the dropdown
  };

  // Sync local state with prop value
  useEffect(() => {
    if (selectedSize && options.find(option => option.size === selectedSize.size)) {
      setSelectedSize(selectedSize);
    }
  }, [selectedSize, options]);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-text"
      >
        {selectedSize ? selectedSize.size : 'Select Size'}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSizeSelect(option)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeDropdown;
