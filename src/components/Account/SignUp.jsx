import React from 'react';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 pt-[100px] md:pt-[120px]">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 font-overpass">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Join The Lion Auto Parts</h2>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salutation */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-1 font-semibold">Salutation</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
              <option>Dr</option>
            </select>
          </div>

          {/* First Name */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">First Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Last Name */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Last Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Email */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Address Line 1 */}
          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Address Line 1</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Address Line 2 */}
          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Address Line 2</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>

          {/* City */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">City</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Country */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Country</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Postal Code */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Postal Code</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Mobile Number */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Mobile Number</label>
            <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Password */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Confirm Password */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Remember Me + Submit */}
          <div className="col-span-2 flex items-center justify-between flex-wrap mt-4">
            <label className="flex items-center h-[20px]">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>
            <button
              type="submit"
              className=" bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already a customer?{" "}
          <a href="/login" className="text-orange-600 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
