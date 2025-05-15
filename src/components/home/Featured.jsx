import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCartPlus } from 'react-icons/fa6'
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Featured = () => {

    const [items, setItems] = useState([]);
    const [productImages, setProductImages] = useState({}); // Store images by item IDs
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/Item?IsFeatured=Y`, {
                headers: {
                'APIKey' : process.env.REACT_APP_API_KEY
                }
            })

            const sortedData = response.data.data.sort((a, b) =>
                a.stockAvailable === 'A' ? -1 : b.stockAvailable === 'A' ? 1 : 0
            );
            setItems(sortedData);
            
            } catch (err) {
            console.log(err);
            }
        };
        fetchProducts();
    }, []);

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
          items.forEach(item => {
              fetchImageData(item.itemID);
          });
    },[items])

    
      const handleAddToCart = (item) => {
        addToCart({
          ...item,
          quantity: 1,
        });
        toast.success(item.itemName + ' Added To The Cart!', {
          toastId: 1,
          position: "top-right",
          autoClose: 2000,
        });
      };
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className='w-full mt-5 mb-8 font-overpass flex flex-col items-center justify-center'>
        <h1 className='text-4xl text-center font-overpass font-semibold mt-4'>Featured <span className='text-orange-500'>Products</span></h1>
        <div className='w-[95%] md:w-[90%] 2xl:w-[70%] mx-auto mt-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8'>
            {items.map((item) => (
                <div className='w-full h-[300px] lg:h-[320px] p-2 hover:shadow-xl duration-300 drop-shadow-sm shadow flex flex-col items-center justify-center'>
                    <img className='w-full h-[180px] lg:h-[200px] object-contain' src={productImages[item.itemID] || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='} alt="" />
                    <h1 className='text-xl mt-2 line-clamp-1' title={item.itemName}>{item.itemName}</h1>
                    <h1 className='mt-1'>Rs. {item.retailPrice}</h1>
                    <div className='flex mt-1 items-center justify-center gap-4'>
                        <Link to={`/items/${item.itemID}`}>
                            <FaSearch className='text-xl text-orange-500 cursor-pointer' title='more details'/>
                        </Link>
                        <FaCartPlus 
                            onClick={(e) => {
                              e.preventDefault(); // Prevents navigation
                              e.stopPropagation(); // Stops event bubbling to the Link
                              handleAddToCart(item);
                            }}
                        className='text-xl text-orange-500 cursor-pointer' title='add to cart'/>
                    </div>
                </div>
            ))}
        </div>
        <Link to='/store'>
            <button className='mx-auto mt-8 border px-6 py-2 rounded-sm border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 hover:rounded-full'>See More</button>
        </Link>
    </div>
  )
}

export default Featured