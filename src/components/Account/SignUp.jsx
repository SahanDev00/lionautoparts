import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignUp = () => {

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    salutation: 'Mr.',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    mobile: '',
    confirmPassword: '',
    oldPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Country`, {
          headers: { 'APIKey': apiKey },
        });

        if (response.data && response.data.data) {
          setCountries(response.data.data); // Corrected response parsing
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("API Fetch Error:", error.response ? error.response.data : error.message);
      }
    };

    fetchCountries();
  }, []);
  


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = `${process.env.REACT_APP_API_URL}/customer`; 

    let dataToSubmit = {
      customerID: "", 
      loginEmail: formData.email,
      loginPassword: formData.password,
      salutation: formData.salutation,
      firstName: formData.firstName,
      lastName: formData.lastName,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2 || "", // Optional address line 2
      city: formData.city,
      postalCode: formData.postalCode || "", // Optional postal code
      country: formData.country, // Default country if not provided
      telephoneMobile: formData.mobile,
      confirmPassword: formData.confirmPassword,
      oldPassword: formData.confirmPassword || ""
    };
      
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'APIKey': apiKey,
          },
          body: JSON.stringify(dataToSubmit),
        });
      
        const result = await response.json();

        if(!result.success) {
            toast.error(result.errorMessage, {
              position: "top-right",
            });
        }

        console.log(dataToSubmit)
      
        if (response.ok) {
          if (result.success) {
              const customerID = result.data.customerID; // Access customerID from the data object

              // Set cookies if Remember Me is checked
              if (rememberMe) {
              sessionStorage.setItem('customerId', customerID);
              Cookies.set('customerId', customerID, { expires: 30 });
              Cookies.set('firstName', result.data.firstName, { expires: 30 });
              Cookies.set('lastName', result.data.lastName, { expires: 30 });
              Cookies.set('email', result.data.loginEmail, { expires: 30 });
              } else {
              // Store data in session
              sessionStorage.setItem('customerId', customerID);
              sessionStorage.setItem('firstName', result.data.firstName);
              sessionStorage.setItem('lastName', result.data.lastName);
              sessionStorage.setItem('email', result.data.loginEmail);
            }
                
              toast.success('Successfully logged in!', {
                position: "top-right",
                autoClose: 2000,
              });
              setTimeout(() => {
                navigate('/');
              }, 2000);
          } else {
            toast.error(result.errorMessage, {
              position: "top-right",
            });
            console.error('Error:', result);
            console.error('Validation Errors:', result.errors); // Log validation errors
            
        }
      }
      }  catch (error) {
        console.error('Error:', error);
        toast.error('Sign in error!', {
          position: "top-right",
        });
      }
    }

    useEffect(() => {
      // Retrieve customer details from cookies or session storage
      const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');
  
      if (customerId) {
        // Handle auto-login or redirect based on customer data
        navigate('/');
      }
    }, [navigate]); 

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 pt-[100px] md:pt-[120px]">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 font-overpass">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Join The Lion Auto Parts</h2>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salutation */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-1 font-semibold">Salutation</label>
            <input
                required
                name='salutation'
                value={formData.salutation}
                onChange={handleChange}
                type="text"
                placeholder="Mr./Mrs./Ms."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
          </div>

          {/* First Name */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">First Name</label>
            <input
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Last Name */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Last Name</label>
            <input 
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Email */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Email</label>
            <input 
              name='email'
              value={formData.email}
              onChange={handleChange}
              type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Address Line 1 */}
          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Address Line 1</label>
            <input 
              name='addressLine1'
              value={formData.addressLine1}
              onChange={handleChange}
              type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Address Line 2 */}
          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Address Line 2</label>
            <input
              name='addressLine2'
              value={formData.addressLine2}
              onChange={handleChange}
              type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>

          {/* City */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">City</label>
            <input 
              name='city'
              value={formData.city}
              onChange={handleChange}
              type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Country */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Country</label>
            <select
                required
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {countries && countries.length > 0 ? (
                  countries.map((country) => (
                    <option key={country.countryCode} value={country.countryName}>
                      {country.countryName}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
          </div>

          {/* Postal Code */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Postal Code</label>
            <input 
              name='postalCode'
              value={formData.postalCode}
              onChange={handleChange}
              type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Mobile Number */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Mobile Number</label>
            <input 
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Password */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Password</label>
            <input 
                name='password'
                value={formData.password}
                onChange={handleChange}
                type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Confirm Password */}
          <div className='col-span-2 sm:col-span-1'>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <input 
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>

          {/* Remember Me + Submit */}
          <div className="col-span-2 flex items-center justify-between flex-wrap mt-4">
            <label className="flex items-center h-[20px]">
              <input type="checkbox"  checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} className="mr-2" />
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>
            <button
              type="submit"
              onClick={handleSubmit}
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
