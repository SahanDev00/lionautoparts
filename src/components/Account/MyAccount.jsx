import React from 'react';
import { FaUserEdit, FaLock, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const MyAccount = () => {
  const user = {
    salutation: 'Mr.',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'Colombo',
    country: 'Sri Lanka',
    postalCode: '10000',
    mobile: '+94 712345678',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-[100px] md:pt-[150px]">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-10 font-overpass">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">My Account</h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-sm md:text-base text-gray-700">
          <div className="space-y-3">
            <p><span className="font-medium text-gray-900">Salutation:</span> {user.salutation}</p>
            <p><span className="font-medium text-gray-900">First Name:</span> {user.firstName}</p>
            <p><span className="font-medium text-gray-900">Last Name:</span> {user.lastName}</p>
            <p><span className="font-medium text-gray-900">Email:</span> {user.email}</p>
            <p><span className="font-medium text-gray-900">Mobile:</span> {user.mobile}</p>
          </div>
          <div className="space-y-3">
            <p><span className="font-medium text-gray-900">Address Line 1:</span> {user.address1}</p>
            <p><span className="font-medium text-gray-900">Address Line 2:</span> {user.address2}</p>
            <p><span className="font-medium text-gray-900">City:</span> {user.city}</p>
            <p><span className="font-medium text-gray-900">Country:</span> {user.country}</p>
            <p><span className="font-medium text-gray-900">Postal Code:</span> {user.postalCode}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton icon={<FaUserEdit />} text="Edit Information" color="blue" />
          <ActionButton icon={<FaLock />} text="Change Password" color="amber" />
          <ActionButton icon={<FaBoxOpen />} text="My Orders" color="emerald" />
          <ActionButton icon={<FaSignOutAlt />} text="Log Out" color="rose" />
        </div>
      </div>
    </div>
  );
};

// Reusable action button component
const ActionButton = ({ icon, text, color }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-3 w-full bg-${color}-500 hover:bg-${color}-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm`}
    >
      {icon}
      {text}
    </button>
  );
};

export default MyAccount;
