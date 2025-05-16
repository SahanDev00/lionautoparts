import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';

const SearchComponent = () => {

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [brandID, setBrandID] = useState([]);
  const [modelID, setModelID] = useState([]);
  const [yearID, setYearID] = useState([]);
  const [query, setQuery] = useState([]);
  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate(`/search/${modelID}/${brandID}/${yearID}/${query}`)
  }

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

  return (
    <div className='w-screen overflow-hidden h-[500px] sm:h-[350px] relative bg-black'>
      <img className='w-full h-full object-cover opacity-70' src="https://images.unsplash.com/photo-1635974069895-7a6d887f9106?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className='flex flex-col items-center justify-center h-full absolute z-20 inset-0'>
        <h1 className='text-3xl sm:text-4xl w-[95%] font-overpass text-white font-semibold text-center'>Search From Over 10,000,000 Auto Parts, & Get Shipped Directly To You</h1>
        <form onSubmit={(e) => {
              e.preventDefault();
              handleNavigate();
            }} className='w-full sm:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto sm:h-[200px] flex flex-col items-center justify-center mt-4 sm:mt-8 bg-black/60 py-4 sm:py-0'>
          <div className='sm:flex items-center justify-center w-[90%] mx-auto sm:h-[100px]'>
            {/* Brand Select */}
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto'>
              <label htmlFor="" className='text-white font-overpass'>Select Brand</label>
              <select
                required
                onChange={(e) => setBrandID(e.target.value)}
                className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'
              >
                <option value="">-----</option>
                {brands?.map((brand) => (
                  <option key={brand.brandID} value={brand.brandID}>{brand.brandName}</option>
                ))}
              </select>
            </div>
            
            {/* Model Select */}
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto mb-4 sm:mb-0'>
              <label htmlFor="" className='text-white font-overpass'>Select Model</label>
              <select
                required
                onChange={(e) => setModelID(e.target.value)}
                className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'
              >
                <option value="">-----</option>
                {models?.map((model) => (
                  <option key={model.modelID} value={model.modelID}>{model.modelName}</option>
                ))}
              </select>
            </div>

            {/* Year Select */}
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto mb-4 sm:mb-0'>
              <label htmlFor="" className='text-white font-overpass'>Select Year</label>
              <select
                required
                onChange={(e) => setYearID(e.target.value)}
                className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'
              >
                <option value="">-----</option>
                {years?.map((year) => (
                  <option key={year.yearID} value={year.yearID}>{year.yearName}</option>
                ))}
              </select>
            </div>

            {/* Part Select */}
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto mb-4 sm:mb-0'>
              <label htmlFor="" className='text-white font-overpass'>Part Number</label>
              <input
                required
                type='text'
                placeholder='Part No'
                onChange={(e) => setQuery(e.target.value)}
                className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'
              />
            </div>

          </div>
          <button type='submit' className='px-6 py-2 rounded-xl font-overpass border bg-orange-500 hover:bg-orange-600 duration-300 text-white mt-5 sm:mt-0'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default SearchComponent