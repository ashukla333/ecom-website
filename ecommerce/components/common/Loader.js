// components/Loader.js
import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Image className="loader" src="/loader.gif" alt="Loading..." width={100} height={100} />
    </div>
  );
};

export default Loader;
