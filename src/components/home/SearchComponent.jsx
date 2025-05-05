import React from 'react'

const SearchComponent = () => {
  return (
    <div className='w-screen overflow-hidden h-[500px] sm:h-[350px] relative bg-black'>
      <img className='w-full h-full object-cover opacity-70' src="https://images.unsplash.com/photo-1635974069895-7a6d887f9106?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className='flex flex-col items-center justify-center h-full absolute z-20 inset-0'>
        <h1 className='text-3xl sm:text-4xl w-[95%] font-overpass text-white font-semibold text-center'>Search From Over 10,000,000 Auto Parts, & Get Shipped Directly To You</h1>
        <div className='w-full sm:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto sm:h-[200px] flex flex-col items-center justify-center mt-4 sm:mt-8 bg-black/60 py-4 sm:py-0'>
          <div className='sm:flex items-center justify-center w-[90%] mx-auto sm:h-[100px]'>
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto mb-4 sm:mb-0'>
              <label htmlFor="" className='text-white font-overpass'>Select Model</label>
              <select name="" id="" className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'>
                <option value="">-----</option>
                <option value="">test</option>
              </select>
            </div>
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto mb-4 sm:mb-0'>
              <label htmlFor="" className='text-white font-overpass'>Select Year</label>
              <select name="" id="" className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'>
                <option value="">-----</option>
                <option value="">test</option>
              </select>
            </div>
            <div className='flex flex-col w-full sm:w-[30%] 2xl:w-[20%] mx-auto '>
              <label htmlFor="" className='text-white font-overpass'>Select Brand</label>
              <select name="" id="" className='w-full mx-auto font-overpass border px-2 py-2 rounded-md cursor-pointer border-amber-500 font-light'>
                <option value="">-----</option>
                <option value="">test</option>
              </select>
            </div>
          </div>
          <button className='px-6 py-2 rounded-xl font-overpass border bg-orange-500 hover:bg-orange-600 duration-300 text-white mt-5 sm:mt-0'>Search</button>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent