import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
      
        const apiURL = `${process.env.REACT_APP_API_URL}/Customer/GetByEmail?EmailAddress=${encodeURIComponent(formData.email)}`;
      
        try {
          const apiKey = process.env.REACT_APP_API_KEY;
      
          // Step 1: Check if the email exists
          const emailCheckResponse = await fetch(apiURL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'APIKey': apiKey,
            },
          });
      
          const emailCheckResult = await emailCheckResponse.json();
      
          if (emailCheckResponse.ok && emailCheckResult.success) {
            const customerData = emailCheckResult.data;
      
            // Step 2: Check if the entered password matches
            const enteredPassword = formData.password;
            const storedPassword = customerData.loginPassword;
      
            // Assuming the password is hashed; you should hash the entered password and compare with stored hash.
            if (storedPassword === enteredPassword) {
             
              if (rememberMe) {
                // Set cookies if Remember Me is checked
                Cookies.set('customerId', customerData.customerID, { expires: 30 });
                Cookies.set('firstName', customerData.firstName, { expires: 30 });
                Cookies.set('lastName', customerData.lastName, { expires: 30 });
                Cookies.set('email', customerData.email, { expires: 30 });
              } else {
                // Store data in session
                sessionStorage.setItem('customerId', customerData.customerID);
                sessionStorage.setItem('firstName', customerData.firstName);
                sessionStorage.setItem('lastName', customerData.lastName);
                sessionStorage.setItem('email', customerData.email);
              }
              // Handle successful login, like saving the customer data or redirecting the user
              toast.success('Successfully logged in!', {
                position: "top-right",
                autoClose: 2000, // Automatically close after 3 seconds
              });
              setTimeout(() => {
                navigate('/');
              }, 2000);
            } else {
              toast.error('Wrong Password!', {
                position: "top-right",
              });
            }
          } else {
            toast.error('Email not found!', {
              position: "top-right",
            });
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('An error occurred. Please try again.', {
            position: "top-right",
          });
        }
      };
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      useEffect(() => {
        // Retrieve customer details from cookies or session storage
        const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');
    
        if (customerId) {
          // Handle auto-login or redirect based on customer data
          navigate('/');
        }
      }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 font-overpass">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Welcome Back</h2>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="••••••••"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="mr-2" />
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleLoginSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          New to Lion Auto Parts?{' '}
          <a href="/sign-up" className="text-orange-600 font-semibold hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
