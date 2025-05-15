import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryMain`, {
            headers: { 
                'APIKey' : process.env.REACT_APP_API_KEY
            }
        })

        setCategories(response.data.data.slice(0, 6))
      }
      fetchCategories();
    }, [])
    

  return (
    <div className='w-full pt-5 pb-10 bg-gray-50'>
        <h1 className='text-4xl text-center font-overpass font-semibold mt-4'>Our <span className='text-orange-500'>Categories</span></h1>
        <div className='mt-4 w-[95%] sm:w-[90%] lg:w-[80%] 2xl:w-[60%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-7'>
            {categories.map((cat, index) => (
                <div className={`w-full border-2 h-[200px] sm:h-[250px] border-orange-700 lg:h-[300px] flex flex-col items-center justify-center  cursor-pointer hover:scale-105 duration-300 ${index % 2 !== 0 ? 'bg-orange-700' : ''}`}>
                    <img src="https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-car-engine-combustion-chamber-details-png-image_13071708.png" className='w-[100px] sm:w-[150px] h-[100px] sm:h-[150px] object-cover' alt="" />
                    <h1 className={`text-xl sm:text-2xl mt-4 font-semibold font-overpass ${index % 2 === 0 ? 'text-orange-700' : 'text-white'}`}>{cat.categoryMainName}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Categories