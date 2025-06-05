import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsCartPlus } from 'react-icons/bs';
import { MdFilterAltOff } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const AllProducts = () => {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [productImages, setProductImages] = useState({}); 
  const [brandName, setBrandName] = useState(''); // Store images by item IDs
  const [subCategories, setSubCategories] = useState([]); 
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { addToCart } = useCart(); 

  const [brandID, setBrandID] = useState('')
  const [modelID, setModelID] = useState('')
  const [yearID, setYearID] = useState('')
  const [partNo, setPartNo] = useState('')

  const clearFilters = () => {
    setBrandID('');
    setModelID('');
    setYearID('');
    setPartNo('');
  }

  const toggleCategory = (id) => {
    setExpandedCategory(prev => prev === id ? null : id);
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
          items.forEach(item => {
              fetchImageData(item.itemID);
          });
    },[items])

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/Item?BrandID=${brandID}&ModelID=${modelID}&YearID=${yearID}&KeyW=${partNo}`, {
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
    }, [brandID, modelID,yearID,partNo])

  const fetchCategories = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryMain`, {
            headers: {
                APIKey: process.env.REACT_APP_API_KEY
            }
        })
        setCategories(response.data.data);
      } catch (err) {
          console.log(err)
      }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/Brand`, {
              headers: {
                  APIKey: process.env.REACT_APP_API_KEY
              }
          })
          setBrands(response.data.data);
        } catch (err) {
            console.log(err)
        }
    };  
    fetchBrands();
  }, [])

  useEffect(() => {
    const fetchModels = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/Model`, {
              headers: {
                  APIKey: process.env.REACT_APP_API_KEY
              }
          })
          setModels(response.data.data);
        } catch (err) {
            console.log(err)
        }
    };  
    fetchModels();
  }, [])
  
  useEffect(() => {
    const fetchYears = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/Year`, {
              headers: {
                  APIKey: process.env.REACT_APP_API_KEY
              }
          })
          setYears(response.data.data);
        } catch (err) {
            console.log(err)
        }
    };  
    fetchYears();
  }, [])

  const fetchCategoryProducts = async (categoryMainID) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/Item?CategoryMainID=${categoryMainID}`,
            { headers: { APIKey: process.env.REACT_APP_API_KEY } }
        );
        const sortedData = response.data.data.sort((a, b) =>
          a.stockAvailable === 'A' ? -1 : b.stockAvailable === 'A' ? 1 : 0
        );
        setItems(sortedData);
      } catch (err) {
          console.log(err);
      }
  };

  const fetchSubCategoryProducts = async (categorySubID) => {
      try {
          // Fetch subcategory products
          const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/Item?CategorySubID=${categorySubID}`,
              { headers: { APIKey: process.env.REACT_APP_API_KEY } }
          );
          const sortedData = response.data.data.sort((a, b) =>
            a.stockAvailable === 'A' ? -1 : b.stockAvailable === 'A' ? 1 : 0
          );
          setItems(sortedData);
      } catch (err) {
          console.log(err);
      }
  };

  const fetchSubCategories = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/CategorySub`, {
            headers: {
                APIKey: process.env.REACT_APP_API_KEY
            }
        })
        setSubCategories(response.data.data)
    } catch (err) {
        console.log(err)
    }
  };

  /*const fetchBrandProducts = async (BrandID) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Item?BrandID=${BrandID}`, {
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

    
  const fetchYearProducts = async (YearID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Item?YearID=${YearID}`, {
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

    const fetchModelProducts = async (ModelID) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Item?ModelID=${ModelID}`, {
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
    };*/


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
    fetchCategories();
    fetchSubCategories();
  }, [])

  return (
    <div className='w-full min-h-screen md:pt-[80px]'>
            <div className='w-full mx-auto h-[200px] md:h-[300px] flex flex-col justify-center'>
              <img src="https://di-uploads-pod4.s3.amazonaws.com/titanautomotivegroup/uploads/2015/11/Car-Parts-2.jpg" className='w-full h-full object-cover' alt="" />
            </div>
            
            <div className='w-[90%] 2xl:w-[85%] mx-auto my-10 lg:flex items-center justify-between'>
              {brandName ? (
                <h1 className='text-3xl font-roboto font-semibold'><span className='text-gray-600'>{brandName}</span> Products</h1>
                ) : (
                <h1 className='text-3xl font-roboto font-semibold'><span className='text-gray-600'>All</span> Products</h1>
              )}
              <div className='gap-3 flex mt-3 lg:mt-0 flex-wrap'>
                <select onChange={(e) => setBrandID(e.target.value)} className='w-[200px] mt-3 md:mt-0 md:py-2 border font-karla p-1 md:px-2 cursor-pointer outline-none' name="subCats" id="subCats">
                  <option value="">---filter by brands---</option>
                  {brands?.map((brand) => (
                    <option key={brand.brandID} value={brand.brandID}>{brand.brandName}</option>
                  ))}
                </select>
                <select onChange={(e) => setModelID(e.target.value)} className='w-[200px] mt-3 md:mt-0 md:py-2 border font-karla p-1 md:px-2 cursor-pointer outline-none' name="subCats" id="subCats">
                  <option value="">---filter by models---</option>
                  {models?.map((model) => (
                    <option key={model.brandID} value={model.modelID}>{model.modelName}</option>
                  ))}
                </select>
                <select onChange={(e) => setYearID(e.target.value)} className='w-[200px] mt-3 md:mt-0 md:py-2 border font-karla p-1 md:px-2 cursor-pointer outline-none' name="subCats" id="subCats">
                  <option value="">---filter by year---</option>
                  {years?.map((year) => (
                    <option key={year.yearID} value={year.yearID}>{year.yearName}</option>
                  ))}
                </select>
                <input onChange={(e) => setPartNo(e.target.value)} placeholder='Part Number...' className='w-[200px] mt-3 md:mt-0 md:py-2 border font-karla p-1 md:px-2 cursor-pointer outline-none' name="subCats" id="subCats" />
              </div>
            </div>

            <div className='w-[90%] 2xl:w-[85%] mx-auto md:flex justify-between pb-10'>
              <div className='w-[90%] mx-auto md:mx-0 md:w-[200px] lg:w-[200px] 2xl:w-[230px] mb-10 md:mb-0'>
                <div className='w-full flex items-center justify-between'>
                  <h1 className='text-gray-700 font-semibold text-lg mb-2 font-karla'>Categories</h1>
                  {brandName && (
                    <MdFilterAltOff className='cursor-pointer hover:text-red-500 size-5' title='Clear filters' onClick={() => {clearFilters(); setBrandName('')}} />
                  )}
                  </div>
                <hr />
                {categories.map((category) => (
                  <div key={category.categoryMainID} className='w-full mt-2 text-lg text-gray-800 font-light'>
                    <div
                      className='flex gap-2 cursor-pointer justify-between items-center'
                      onClick={() => {
                        toggleCategory(category.categoryMainID);
                        fetchCategoryProducts(category.categoryMainID);
                        setBrandName(category.categoryMainName);
                      }}
                    >
                      <p className='font-karla'>{category.categoryMainName}</p>
                      <span>{expandedCategory === category.categoryMainID ? '−' : '+'}</span>
                    </div>

                    {/* Collapsible Subcategory */}
                      <ul className={`pl-4 mb-2 border-l transition-all duration-500 ease-in-out overflow-hidden ${expandedCategory === category.categoryMainID ? 'max-h-[999px]' : 'max-h-0'}`}>
                        {subCategories
                          .filter(subCategory => subCategory.categoryMainID === category.categoryMainID)
                          .map(subCategory => (
                            <div key={subCategory.categorySubID} className='flex gap-2'>
                              <p
                                onClick={() => {
                                  fetchSubCategoryProducts(subCategory.categorySubID);
                                  setBrandName(subCategory.categorySubName);
                                }}
                                className='text-gray-700 text-[16px] cursor-pointer'
                              >
                                • {subCategory.categorySubName}
                              </p>
                            </div>
                          ))}
                      </ul>
                  </div>
                ))}
              </div>
            
              <div className='w-full md:w-[70%] lg:w-[80%] mx-auto md:mx-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 pb-10'>
                {items.length > 0 ? 
                  items.map((item, index) => (
                    <div key={index} className='w-full h-[400px] border-orange-300 border mx-auto lg:h-[450px] flex flex-col items-center justify-center rounded-xl bg-white shadow hover:shadow-lg hover:scale-[102%] duration-300'>
                      <img src={productImages[item.itemID] || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='} className='h-[200px] lg:h-[250px] mx-auto object-contain p-2 xl:p-3' alt="" />
                      <h1 className='text-lg xl:text-2xl font-karla font-semibold mb-1 text-center w-[95%] mx-auto line-clamp-2' title={item.itemName}>{item.itemName}</h1>
                      <p className='font-semibold mt-1 font-karla text-[16px] lg:text-lg text-orange-600'>
                        Rs. {Number(item.retailPrice).toLocaleString('en-LK')}
                      </p>

                      <div className='flex items-center h-[50px] justify-center gap-5 mt-2'>
                          <Link to={`/items/${item.itemID}`}>
                            <button className='px-4 lg:px-6 py-1 lg:py-2 border rounded-full bg-orange-500 text-white hover:bg-orange-500/90 font-karla'>Learn More</button>
                          </Link>      
                      </div>
                       
                      {/* 
                      {item.stockAvailable === 'A' ? (
                        <div className='flex items-center h-[50px] justify-center gap-5 mt-2'>
                          <Link to={`/items/${item.itemID}`}>
                            <button className='px-4 lg:px-6 py-1 lg:py-2 border rounded-full bg-orange-500 text-white hover:bg-orange-500/90 font-karla'>Learn More</button>
                          </Link>
                            <BsCartPlus
                                onClick={(e) => {
                                  e.preventDefault(); // Prevents navigation
                                  e.stopPropagation(); // Stops event bubbling to the Link
                                  handleAddToCart(item);
                                }}
                              className='text-orange-500 text-2xl hover:text-orange-700' title='add to cart' />
                            </div>
                        </div>
                      ) : (
                        <div className='flex items-center h-[50px] justify-center gap-5 mt-2'>
                          <Link to={`/items/${item.itemID}`}>
                            <button className='px-4 lg:px-6 py-1 lg:py-2 border rounded-full bg-orange-500 text-white hover:bg-orange-500/90 font-karla'>Learn More</button>
                          </Link>
                          <button className='px-4 lg:px-6 py-1 lg:py-2 rounded-full text-red-500 font-karla cursor-not-allowed'>Out of Stock</button>
                        </div>
                      )}
                          */}
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

export default AllProducts