import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext'; // Adjust the path as needed
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { FaTrash } from 'react-icons/fa';

const CartIndex = () => {

  const navigate = useNavigate();
  const { cartItems, updateQuantity, calculateTotal, removeFromCart } = useCart();
  const [productImages, setProductImages] = useState({}); // Store images by item IDs

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price) => parseFloat(price).toFixed(2);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Quotation', 14, 28);
    //doc.addImage(logo, "PNG", 5, 5, 45, 0); // Add your company logo

    const tableColumn = ['Product', 'Quantity', 'Price', 'Total'];
    const tableRows = [];

    cartItems.forEach(item => {
      // Ensure that each item has necessary properties
      if (item.itemName && item.retailPrice && item.quantity) {
        const itemData = [
          item.itemName,
          item.quantity,
          `Rs.${formatPrice(item.retailPrice)}`,
          `Rs.${(parseFloat(item.retailPrice) * item.quantity).toFixed(2)}`
        ];
        tableRows.push(itemData);
      }
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });

    const total = calculateTotal();
    doc.text(`Total: Rs.${formatPrice(total)}`, 14, doc.previousAutoTable.finalY + 10);

    doc.save('Extreme_Quotation.pdf');
  };

      // Function to check if the user is logged in
      const isLoggedIn = () => {
        const customerDetails = Cookies.get('customerId') || sessionStorage.getItem('customerId');
        return !!customerDetails;
      };

  const handleCheckout = () => {
    if (isLoggedIn()) {
      navigate('/checkout');
    } else {
      navigate('/sign-in');
    }
  };

    const fetchImageData = async (itemID) => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ImageData/${itemID}`, {
            headers: {
                'APIKey': apiKey,
            },
            });
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                setProductImages(prevImages => ({
                    ...prevImages,
                    [itemID]: `${process.env.REACT_APP_IMG_URL}/${data.data[0].imageID}.png`
                }));
            }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        useEffect(() => {
            cartItems.forEach(cartItem => {
                fetchImageData(cartItem.itemID);
            });
    },[cartItems])

  return (
    <div className="w-full pt-[50px] min-h-screen">
        <div className='w-[90%] xl:w-[85%] mx-auto h-[200px] md:h-[200px] flex flex-col justify-center'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-roboto font-semibold md:w-[700px]'>
                Shoping Cart. <span className='text-gray-500'>Your Selections.</span>
            </h1>
        </div>
      {cartItems.length === 0 ? (
        <p className='text-black/70 ml-10 md:ml-40 text-sm md:text-xl font-overpass'>Your cart is empty.</p>
      ) : (
        <div>
          <ul className='w-[90%] xl:w-[85%] mx-auto'>
            {cartItems.map((item) => (
              <li key={item.itemID} className="flex justify-between mb-4 py-4 border-b">
                <div className="flex items-center w-[85%]">
                  <img src={productImages[item.itemID] || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='} alt={item.itemName} className="w-16 h-16 object-cover mr-4" />
                  <div className='md:flex items-center justify-between w-full'>
                    <div>
                      <h2 className="text-sm sm:text-xl text-blue-700 font-semibold font-overpass">{item.itemName}</h2>
                      <p className="text-black/70 font-overpass text-xs sm:text-[16px]">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <button
                        onClick={() => updateQuantity(item.itemID, -1)}
                        className="bg-gray-600 flex items-center justify-center text-white py-1 px-2 rounded font-overpass text-xs sm:text-[16px]"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 text-black/70 font-overpass text-sm sm:text-[16px]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemID, 1)}
                        className="bg-gray-600 flex items-center justify-center text-white py-1 px-2 rounded font-overpass text-xs sm:text-[16px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right flex justify-center items-center ml-3">
                  <p className="text-sm sm:text-lg text-black/70 font-semibold font-overpass">Rs. {Number(formatPrice(item.retailPrice)).toLocaleString('en-LK')}</p>
                </div>
                <div className="text-right ml-4 flex items-center">
                  <button
                    onClick={() => removeFromCart(item.itemID)}
                    className="bg-red-500 text-white rounded "
                  >
                    <FaTrash className='size-5 p-1' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-[90%] xl:w-[85%] mx-auto flex items-center justify-end mt-4">
            <p className="text-lg sm:text-xl text-black/70 font-semibold font-overpass">Total: Rs. {Number(formatPrice(calculateTotal())).toLocaleString('en-LK')}</p>
          </div>
          <div onClick={handleCheckout} className="w-[90%] xl:w-[85%] mx-auto pb-5 gap-4 flex items-center justify-end mt-4">
            <button className="bg-green-500 text-white py-2 px-4 rounded font-overpass">Check Out</button>
            <button onClick={generatePDF} className="bg-amber-400 text-white py-2 px-4 rounded font-overpass">Download Quotation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIndex;
