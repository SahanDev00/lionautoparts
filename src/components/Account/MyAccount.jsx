import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUserEdit, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Dialog from '@radix-ui/react-dialog';

const MyAccount = () => {
  const customerID = sessionStorage.getItem('customerId') || Cookies.get('customerId');
  const [user, setUser] = useState([]);
  const Navigate = useNavigate();
  const [openUserModal, setOpenUserModal] = useState(false);
  const [editUser, setEditUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      customerID: customerID,
      loginEmail: editUser.loginEmail,
      salutation: editUser.salutation,
      firstName: editUser.firstName,
      middleName: editUser.middleName,
      lastName: editUser.lastName,
      addressLine1: editUser.addressLine1,
      addressLine2: editUser.addressLine2,
      city: editUser.city,
      postalCode: editUser.postalCode,
      country: editUser.country,
      telephoneMobile: editUser.telephoneMobile,
      loginPassword: editUser.loginPassword,
      confirmPassword: editUser.confirmPassword || editUser.loginPassword,
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/Customer`, customerData, {
        headers: {
          'Content-Type': 'application/json',
          'APIKey': process.env.REACT_APP_API_KEY,
        },
      });
      if (response.data.success) {
        toast.success('Profile updated successfuly!', {
          position: "top-right",
          autoClose: 2000, // Automatically close after 3 seconds
        });
        window.location.reload();
      } else {
        toast.error('Error updating profile!', {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile!', {
        position: "top-right",
      });
      
    }
  };

    useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/Customer/${customerID}`, {
          headers: { 'APIKey': apiKey }
        });

        setUser(result.data.data);
        setEditUser(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [customerID]);

  const handleLogout = () => {
    sessionStorage.clear();
    Cookies.remove('customerId');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('email');

    toast.success('Successfully logged out!', { position: "top-right", autoClose: 2000 });
    setTimeout(() => Navigate('/'), 2000);
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
            <p><span className="font-medium text-gray-900">Email:</span> {user.loginEmail}</p>
            <p><span className="font-medium text-gray-900">Mobile:</span> {user.telephoneMobile}</p>
          </div>
          <div className="space-y-3">
            <p><span className="font-medium text-gray-900">Address Line 1:</span> {user.addressLine1}</p>
            <p><span className="font-medium text-gray-900">Address Line 2:</span> {user.addressLine2}</p>
            <p><span className="font-medium text-gray-900">City:</span> {user.city}</p>
            <p><span className="font-medium text-gray-900">Country:</span> {user.country}</p>
            <p><span className="font-medium text-gray-900">Postal Code:</span> {user.postalCode}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setOpenUserModal(true)} 
            className={`flex items-center justify-center gap-2 px-4 py-3 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm`}
          >
            <FaUserEdit />
            Edit Information
          </button>
          <Link to='/orders'>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm`}
            >
              <FaBoxOpen />
              My Orders
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2 px-4 py-3 w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm`}
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </div>

        {/* USER INFO MODAL */}
        <Dialog.Root open={openUserModal} onOpenChange={setOpenUserModal}>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 shadow-sm z-50" />
          <Dialog.Content className="fixed max-h-[95vh] overflow-y-auto z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%]">
            <Dialog.Title className="text-xl font-bold font-karla">Edit User Information</Dialog.Title>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 font-karla">
              {/* Left Side - User Info */}
              <div className="w-full">
                <label className="block font-medium">Salutation</label>
                <input 
                  type="text" 
                  name='salutation'
                  value={editUser.salutation} 
                  onChange={(e) => setEditUser({ ...editUser, salutation: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">First Name</label>
                <input 
                  type="text" 
                  name='firstName'
                  value={editUser.firstName} 
                  onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Middle Name</label>
                <input 
                  type="text" 
                  name='middleName'
                  value={editUser.middleName} 
                  onChange={(e) => setEditUser({ ...editUser, middleName: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Last Name</label>
                <input 
                  type="text" 
                  name='lastName'
                  value={editUser.lastName} 
                  onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Email</label>
                <input 
                  type="email" 
                  name='email'
                  value={editUser.loginEmail} 
                  onChange={(e) => setEditUser({ ...editUser, loginEmail: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Mobile Number</label>
                <input 
                  type="text" 
                  name='mobile'
                  value={editUser.telephoneMobile} 
                  onChange={(e) => setEditUser({ ...editUser, telephoneMobile: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Password</label>
                <input 
                  type="password" 
                  name='password'
                  value={editUser.loginPassword} 
                  onChange={(e) => setEditUser({ ...editUser, loginPassword: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <label className="block mt-2 font-medium">Confirm Password</label>
                <input 
                  type="password" 
                  name='confirmPassword'
                  value={editUser.confirmPassword  || ''}
                  onChange={(e) => setEditUser({ ...editUser, confirmPassword: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  />
                  {editUser.confirmPassword && editUser.confirmPassword !== editUser.loginPassword && (
                    <p className='text-sm text-red-500'>Password Does not match</p>
                  )}
              </div>

              {/* Right Side - Shipping Info */}
              <div className="w-full">
                <h2 className="text-lg font-bold">Edit Shipping Information</h2>

                <label className="block mt-2 font-medium">Address Line 1</label>
                <input 
                  type="text" 
                  name='addressLine1'
                  value={editUser.addressLine1} 
                  onChange={(e) => setEditUser({ ...editUser, addressLine1: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Address Line 2</label>
                <input 
                  type="text" 
                  name='addressLine2'
                  value={editUser.addressLine2} 
                  onChange={(e) => setEditUser({ ...editUser, addressLine2: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">City</label>
                <input 
                  type="text" 
                  name='city'
                  value={editUser.city} 
                  onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Postal Code</label>
                <input 
                  type="text" 
                  name='postalCode'
                  value={editUser.postalCode} 
                  onChange={(e) => setEditUser({ ...editUser, postalCode: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Country</label>
                <input 
                  type="text" 
                  name='country'
                  value={editUser.country} 
                  onChange={(e) => setEditUser({ ...editUser, country: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-4">
              <button onClick={handleSubmit} className="px-4 py-2 bg-black font-karla text-white rounded-md transition">
                Save Changes
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
    </div>
  );
};



export default MyAccount;
