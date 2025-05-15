import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const ProductView = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState(null); // Changed from [] to null
  const [mainImage, setMainImage] = useState(""); // State for main image
  const [images, setImages] = useState([]);
  const { addToCart } = useCart(); 
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/Item/${itemID}`, {
          headers: { APIKey: apiKey },
        });
        setItem(response.data.data);
      } catch (err) {
        console.log("Error fetching product data", err);
      }
    };
    fetchItems();
  }, [itemID]);

  useEffect(() => {
    const fetchSpecifications = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/Specification?ItemID=${itemID}`, {
                headers: {
                    APIKey: process.env.REACT_APP_API_KEY
                }
            });
            setSpecifications(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    fetchSpecifications();
}, [itemID]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/ImageData/${itemID}`,
          { headers: { APIKey: apiKey } }
        );
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setImages(data.data);
          setMainImage(
            `${process.env.REACT_APP_IMG_URL}/${data.data[0].imageID}.png`
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchImageData();
  }, [itemID]);

  
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

  if (!item) {
    return <div className="text-center text-gray h-screen pt-40">Loading...</div>;
  }

  return (
    <div className='w-full pt-[50px] pb-10'>
        <div className='w-[85%] mx-auto py-5 sm:py-0 sm:h-[200px] md:h-[200px] flex flex-col justify-center'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-roboto font-semibold '>
                {item.itemName}
            </h1>
        </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[90%] xl:w-[85%] mx-auto">
        {/* Main Image */}
        <div>
          <img
            src={mainImage || "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="}
            alt="Product"
            className="w-[500px] mx-auto h-auto"
          />
          {/* Sub Images */}
          <div className="flex gap-2 mt-4">
            {images.map((image) => (
              <img
                key={image.imageID}
                src={`${process.env.REACT_APP_IMG_URL}/${image.imageID}.png` || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='}
                alt="Sub"
                className="w-28 h-20 object-contain rounded-md cursor-pointer"
                onClick={() =>
                  setMainImage(
                    `${process.env.REACT_APP_IMG_URL}/${image.imageID}.png` || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4 font-karla">
          <p className="text-gray-700 font-poppins">{item.itemDescription || 'No Description Available'}</p>
            <div className='border p-3 border-black'>
                {/* Specifications */}
                {specifications.length > 0 ? (
                    specifications.map((spec) => (
                        <div key={spec.id} className='mb-2'>
                            <p className='font-bold'>{spec.caption}</p>
                            <p className='font-light text-gray-700'>{spec.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No specifications available.</p>
                )}
            </div>
          <p className="text-lg font-semibold text-gray-500 font-karla">
            <span className="text-gray-700">Part No:</span> {item.partNo}
          </p>
          <p className="text-2xl font-semibold text-green-500 font-karla">
            Rs. {Number(item.retailPrice).toLocaleString('en-LK')}
          </p>
          {/* Stock Availability */}
          <p
            className={`font-roboto ${
              item.stockAvailable === 'A' ? "" : "text-red-500"
            }`}
          >
            {item.stockAvailable === 'A' ? "" : "Out of Stock"}
          </p>

          {item.stockAvailable === 'A' && (
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevents navigation
                e.stopPropagation(); // Stops event bubbling to the Link
                handleAddToCart(item);
              }}
              className="flex items-center gap-2 px-6 py-2 bg-blue-400 text-white hover:text-white font-medium rounded-tr-2xl rounded-bl-2xl shadow-md hover:bg-blue-500 transition">
              <FaShoppingCart />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
