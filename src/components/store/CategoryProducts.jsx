import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsCartPlus } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const CategoryProducts = () => {

  const [items, setItems] = useState([]);
  const [productImages, setProductImages] = useState({}); 
  const { addToCart } = useCart(); 
  const {CategoryID} = useParams();


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
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Item?CategoryMainID=${CategoryID}`, {
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
  }, [CategoryID])


  return (
    <div className='w-full min-h-screen pt-[50px]'>
            <div className='w-full mx-auto h-[200px] md:h-[300px] flex flex-col justify-center'>
              <img src="https://di-uploads-pod4.s3.amazonaws.com/titanautomotivegroup/uploads/2015/11/Car-Parts-2.jpg" className='w-full h-full object-cover' alt="" />
            </div>

            <div className='w-[90%] 2xl:w-[85%] mx-auto md:flex justify-between pb-10 mt-10'>      
              <div className='w-full mx-auto md:mx-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 pb-10'>
                {items.length > 0 ? 
                  items.map((item, index) => (
                    <div key={index} className='w-full h-[400px] border-orange-300 border mx-auto lg:h-[450px] flex flex-col items-center justify-center rounded-xl bg-white shadow hover:shadow-lg hover:scale-[102%] duration-300'>
                      <img src={productImages[item.itemID] || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='} className='h-[200px] lg:h-[250px] mx-auto object-contain p-2 xl:p-3' alt="" />
                      <h1 className='text-lg xl:text-2xl font-karla font-semibold mb-1 text-center w-[95%] mx-auto line-clamp-2' title={item.itemName}>{item.itemName}</h1>
                      <p className='font-semibold mt-1 font-karla text-[16px] lg:text-lg text-orange-600'>
                        Rs. {Number(item.retailPrice).toLocaleString('en-LK')}
                      </p>
                      {item.stockAvailable === 'A' ? (
                        <div className='flex items-center h-[50px] justify-center gap-5 mt-2'>
                          <Link to={`/items/${item.itemID}`}>
                            <button className='px-4 lg:px-6 py-1 lg:py-2 border rounded-full bg-orange-500 text-white hover:bg-orange-500/90 font-karla'>Learn More</button>
                          </Link>
                                                   {/* 
                            <BsCartPlus
                                onClick={(e) => {
                                  e.preventDefault(); // Prevents navigation
                                  e.stopPropagation(); // Stops event bubbling to the Link
                                  handleAddToCart(item);
                                }}
                              className='text-orange-500 text-2xl hover:text-orange-700' title='add to cart' />
                            </div>
                          */}
                        </div>
                      ) : (
                        <div className='flex items-center h-[50px] justify-center gap-5 mt-2'>
                          <Link to={`/items/${item.itemID}`}>
                            <button className='px-4 lg:px-6 py-1 lg:py-2 border rounded-full bg-orange-500 text-white hover:bg-orange-500/90 font-karla'>Learn More</button>
                          </Link>
                          <button className='px-4 lg:px-6 py-1 lg:py-2 rounded-full text-red-500 font-karla cursor-not-allowed'>Out of Stock</button>
                        </div>
                      )}
                    </div>
                  )) : (
                    <p className='text-gray-700 font-karla'>No Items Available</p>
                  )
              }
              </div>
            </div>
    </div>
  )
}

export default CategoryProducts