import React from 'react';

const AboutComponent = () => {
  return (
    <div className="px-6 py-16 pt-[80px] bg-gray-100 text-gray-800 font-overpass min-h-[80vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 mb-6">
          About Lion Auto Parts
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Welcome to <span className="font-semibold text-orange-500">Lion Auto Parts</span> — where performance meets precision!
        </p>
        <p className="text-base sm:text-lg leading-relaxed">
          Founded by a crew of car fanatics and engineering hustlers, Lion Auto Parts was built with one goal:
          <span className="font-semibold"> to fuel your ride with the best quality parts at savage prices. </span> Whether you're
          rebuilding a beast, upgrading your daily driver, or just replacing a worn-out component — we got your back!
        </p>
        <p className="mt-6 text-base sm:text-lg leading-relaxed">
          With over <span className="text-orange-600 font-semibold">10 years</span> of experience in the auto industry,
          we specialize in top-tier OEM and aftermarket parts for all major brands. From engines to exhausts, suspensions
          to sensors — if it moves, roars, or rolls, Lion Auto Parts got it.
        </p>
        <p className="mt-6 text-base sm:text-lg leading-relaxed">
          We pride ourselves on fast shipping, killer prices, and 24/7 support. You break it, we help fix it.
        </p>
        <p className="mt-10 font-semibold text-gray-700">
          Join the pride. Drive with confidence.
        </p>
        <p className="text-orange-600 font-bold text-xl mt-4">
          Lion Auto Parts – Built for Legends
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;
