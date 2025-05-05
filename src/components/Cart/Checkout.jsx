import React, { useEffect, useState  } from 'react';
import { useCart } from './CartContext'; // Adjust the path as needed
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart  } = useCart(); // Get your cart data dynamically from CartContext
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');

  useEffect(() => {
    if (customerId) {
      // Fetch profile data from API
      const fetchProfileData = async () => {
        const api = process.env.REACT_APP_API_URL;
        const apiURL = `${api}/api/Customer`; // Adjust with dynamic ID as necessary

        try {
          const apiKey = process.env.REACT_APP_API_KEY;
          const response = await fetch(`${apiURL}/${customerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'APIKey': apiKey,
            },
          });
          const result = await response.json();

          if (response.ok) {
            setProfileData(result.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchProfileData();
    }
  }, [customerId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (customerId) {
      // Fetch profile data from API
      const fetchProfileData = async () => {
        const apiURL = `${process.env.REACT_APP_API_URL}/Customer`; // Adjust with dynamic ID as necessary

        try {
          const apiKey = process.env.REACT_APP_API_KEY;
          const response = await fetch(`${apiURL}/${customerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'APIKey': apiKey,
            },
          });
          const result = await response.json();

          if (response.ok) {
            setProfileData(result.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchProfileData();
    }
  }, [customerId]);

  // Calculate order details
  const items = cartItems.length;
  const pieces = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  //place order
  const total = calculateTotal();
  const handlePlaceOrder = async () => {
    const orderData = {
      orderID: "",  // Populate this with the order ID after placing the order
      customerID: customerId,  // Replace with actual customer ID if available
      customerName: `${profileData.firstName} ${profileData.lastName}`,
      shipAddressLine1: profileData.addressLine1 + profileData.addressLine2,
      shipAttTo: profileData.addressLine1 + profileData.addressLine2,
      shipCity: profileData.city,
      shipState: profileData.state,
      shipPostalCode: profileData.postalCode,
      shipCountry: profileData.country,
      itemCount: items,
      itemTotal: parseFloat(total),
      itemTotalDisplay: parseFloat(total),
      orderStatus: "P",  // Default status
      remarks: "",  // Optional remarks
      action: {
        OrderActionID: "",
        OrderID: "",  // Populate if needed
        ActionDate: new Date().toISOString(),
        ActionType: "P",
        Remarks: "",
        UserID: ""  // Set this to the logged-in user's ID
      }
    };
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': apiKey
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response
        const orderID = responseData.data.orderID; // Get the order ID from the response

        for (const item of cartItems) {
          const orderItemData = {
            orderID: orderID,
            itemID: item.itemID, // Use the item ID from your cart item
            remarks: "", // Any optional remarks
            itemPrice: parseFloat(item.retailPrice),
            itemDiscount: 0,  // Set this if applicable
            itemQty: parseInt(item.quantity, 10),
            paymentStatus: "NP",  // Customize as needed
            transaction: "", // Customize as needed
            returnURL: "", // Customize the return URL
            itemCode: item.itemCode, // Add the item code if available
            itemName: item.name, // Item name from your cart item
            lineTotal: parseFloat(item.retailPrice) * parseInt(item.quantity, 10),
            itemPriceDisplay: item.retailPrice,
            itemDiscountDisplay: "-",
            remarksDisplay: "",
            lineTotalDisplay: (parseFloat(item.retailPrice) * parseInt(item.quantity, 10)).toFixed(2)
          };
                    // Send each item to the OrderItem API
                    const orderItemResponse = await fetch(`${process.env.REACT_APP_API_URL}/OrderItem`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'APIKey': apiKey
                      },
                      body: JSON.stringify(orderItemData)
                    });
            
                    if (!orderItemResponse.ok) {
                      alert(`Failed to place order item: ${item.name}`);
                    }
        }

        toast.success('Order placed successfully!', {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          clearCart();
          navigate('/')
        }, 2000);
        // Handle successful order placement, e.g., redirect or show a message
      } else {
        toast.error('Failed to place order!', {
          position: "top-right",
          autoClose: 2000,
        });
        // Handle failed order placement, e.g., show an error message
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle network errors, e.g., show an error message
    }
  };


  return (
    <div className='w-full mx-auto pt-[50px] min-h-screen'>
      <div className='w-full mx-auto'>
        <div className='w-[85%] mx-auto h-[200px] md:h-[200px] flex flex-col justify-center'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-roboto font-semibold md:w-[700px]'>
                Checkout. <span className='text-gray-500'>And Own Your Products.</span>
            </h1>
        </div>

        <div className='mx-auto w-[80%] h-full flex items-center justify-center'>
          {/* Right Side */}
          <div className='w-full mx-auto'>
            <div className='w-full flex items-center h-full justify-center md:mt-0 mt-5'>
              <div className='w-full md:w-[300px] xl:w-[400px] mx-auto bg-yellow/10 rounded-xl p-6 text-white'>
                <h1 className='font-semibold text-2xl mb-1 font-overpass text-gray-500'>Your Order</h1>
                <hr className='border border-gray-600 mb-5' />
                <div className='flex justify-between border-b border-gray-300'>
                  <h1 className='font-semibold text-lg font-karla text-black/80'>Items</h1>
                  <p className='font-karla text-black/80'>{items} items, {pieces} pieces</p>
                </div>
                <div className='flex justify-between border-b border-gray-600 mt-3'>
                  <h1 className='font-semibold text-lg font-karla text-black/80'>Total</h1>
                  <p className='font-karla text-black/80'>Rs. {Number(total).toLocaleString('en-LK')}</p>
                </div>
                <button 
                  className='w-full bg-black py-2 rounded-xl font-karla mt-7 hover:bg-blue-600 duration-200 text-white font-semibold'
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
