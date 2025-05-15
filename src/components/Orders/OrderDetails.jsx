import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const OrderDetails = () => {

    const [orderItem, setOrderItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {orderID} = useParams();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/OrderItem?OrderID=${orderID}`, {
                    headers: {
                        'APIKey': apiKey
                    }
                });

                if (response.status === 200 && response.data.success) {
                    // Since the response contains an array inside "data", we extract the first item
                    setOrderItem(response.data.data);
                } else {
                    setError('Failed to fetch order details');
                }
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('An error occurred while fetching order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderID]);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center pt-[100px]">
        <div className="w-[70%] bg-white p-5 relative">
          <h1 className="text-2xl text-center my-8 font-bold text-red-500">{error}</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center pt-[100px]">
        <div className="w-[70%] bg-white p-5 relative">
          <h1 className="text-2xl text-center my-8 font-bold text-black/70 font-poppins">Loading Order Details...</h1>
        </div>
      </div>
    );
  }

  return (
        <div className="min-h-screen flex justify-center pt-[100px]">
        <div className='w-[90%] md:w-[70%] bg-white p-5 relative'>
            <h1 className='text-2xl text-center my-8 font-bold text-black/70 font-karla'>Order Details : {orderID}</h1>
            <div className='overflow-x-auto container mx-auto'>
                <table className='min-w-full bg-yellow/50 text-black/60 border border-gray'>
                    <thead>
                        <tr>
                        <th className='px-4 py-2 border-b text-left font-karla'>Product</th>
                        <th className='px-4 py-2 border-b text-center font-karla'>Quantity</th>
                        <th className='px-4 py-2 border-b text-center font-karla'>Price</th>
                        <th className='px-4 py-2 border-b text-center font-karla'>Discount</th>
                        <th className='px-4 py-2 border-b text-center font-karla'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Check if orderItem is defined */}
                    {orderItem ? (
                      orderItem.map((orderItem) => (
                        <tr key={orderItem.orderItemID}>
                            <td className='px-4 py-2 border-b border-gray font-karla'>
                            <img className='w-[60px] inline-block mr-5' src={`${process.env.REACT_APP_IMG_URL}/${orderItem.itemID}.png` || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='} alt='' />
                            {orderItem.itemName}
                            </td>
                            <td className='px-4 py-2 border-b text-center'>{orderItem.itemQty}</td>
                            <td className='px-4 py-2 border-b text-center'>Rs. {orderItem.itemPriceDisplay}</td>
                            <td className='px-4 py-2 border-b text-center'>{orderItem.itemDiscountDisplay}</td>
                            <td className='px-4 py-2 border-b text-center'>Rs. {orderItem.lineTotalDisplay}</td>
                        </tr>
                      ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center px-4 py-2 text-red-500">No order items available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default OrderDetails