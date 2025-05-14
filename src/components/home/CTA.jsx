import React from 'react';

const CTA = () => {
  return (
    <div className="bg-gray-500 mt-2 text-white py-12 px-6 md:px-20 text-center shadow-lg font-overpass">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Upgrade Your Ride Today 🏁
      </h2>
      <p className="text-lg md:text-xl mb-6 text-gray-300">
        Premium auto parts. Unbeatable prices. Fast shipping.  
        <span className="text-yellow-400 font-semibold"> Get the performance you crave.</span>
      </p>
      <a
        href="/store"
        className="inline-block bg-amber-600 text-white font-bold py-3 px-6 rounded-full hover:bg-amber-500 transition duration-300"
      >
        Shop Now
      </a>
    </div>
  );
};

export default CTA;
