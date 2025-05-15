import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch order data from API
    const fetchOrders = async () => {
      const api = `${process.env.REACT_APP_API_URL}/Order?CustomerID=${customerId}`;
      
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(api,  {
          method: 'GET',
          headers: {
            'APIKey': apiKey,
          },});
        const result = await response.json();
        
        if (response.ok && result.success) {
          setOrders(result.data);
        } else {
          console.error('Error fetching orders:', result.errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, [customerId]);

  if (orders.length === 0) {
    return <div className='bg-white h-[85vh] w-full mx-auto pt-[100px] font-karla'>
      <h1 className='font-semibold mt-5 text-center'>You Don't Have Orders Yet!!!</h1>
    </div>
  }

  return (
    <div className='w-full md:min-h-[700px] lg:min-h-[650px] xl:min-h-[700px] 2xl:min-h-[800px] mx-auto px-4 py-8 mb-5 pt-[100px] bg-white'>
    <div className='w-[85%] mx-auto h-[100px] md:h-[140px] flex flex-col justify-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-roboto font-semibold md:w-[700px]'>
            Your Orders.
        </h1>
    </div>

      <div className='overflow-x-auto w-[95%] md:w-[85%] mx-auto'>
        <table className='min-w-full text-black/60 border border-black/60'>
          <thead>
            <tr>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Order ID</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Address</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Date</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Total</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Status</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Paid Status</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-karla'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td className='px-4 py-2 border-b border-black/60 font-karla'>{order.orderID}</td>
                <td className='px-4 py-2 border-b border-black/60 font-karla'>{order.addressDisplay}</td>
                <td className='px-4 py-2 border-b border-black/60 font-karla'>{order.orderDateDisplay}</td>
                <td className='px-4 py-2 border-b border-black/60 font-karla'>Rs. {order.itemTotalDisplay}</td>
                <td className={`px-4 py-2 border-b border-black/60 font-karla ${order.orderStatusClass === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {order.orderStatusText}
                </td>
                <td className={`px-4 font-karla py-2 border-b border-black/60 ${order.paidStatusClass === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {order.paidStatusText}
                </td>
                <td className='px-4 font-karla py-2 border-b border-black/60'>
                  <Link to={`/orders/${order.orderID}`}>
                      <button className='bg-blue-500 font-karla text-white px-4 py-2 hover:bg-blue-600 duration-200'>
                          View
                      </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;