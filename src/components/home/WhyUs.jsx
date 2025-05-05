import React from 'react'
import { FaHandHoldingHeart, FaHandshake, FaLock, FaMedal } from 'react-icons/fa'
import { GoShieldCheck } from 'react-icons/go'
import { MdAttachMoney } from 'react-icons/md'

const WhyUs = () => {
  return (
    <div className='w-full h-full py-8 font-overpass bg-gray-100'>
        <h1 className='text-4xl text-center font-overpass font-semibold'>Key <span className='text-orange-500'>Benefits</span></h1>
        <div className='w-[95%] xl:w-[90%] 2xl:w-[70%] 3xl:w-[90%] 3xl:w-[70%] md:flex mx-auto mt-4'>
            <div className='md:w-[300px] lg:w-[330px] xl:w-[380px] mx-auto py-5 md:h-[300px] lg:h-[260px] xl:h-[300px] shadow-sm flex flex-col items-center justify-center bg-white group'>
                <FaLock className='size-10 text-orange-600'/>
                <h1 className='text-2xl my-3 font-semibold group-hover:text-orange-500 duration-300'>Security</h1>
                <p className='text-center text-gray-600 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque incidunt magnam quam repudiandae inventore blanditiis deleniti alias ut aperiam obcaecati!</p>
            </div>
            <div className='md:w-[300px] lg:w-[330px] xl:w-[380px] mx-auto py-5 mt-2 md:mt-0 md:h-[300px] lg:h-[260px] xl:h-[300px] shadow-sm flex flex-col items-center justify-center bg-white group'>
                <FaMedal className='size-10 text-orange-600'/>
                <h1 className='text-2xl my-3 font-semibold group-hover:text-orange-500 duration-300'>Warranty</h1>
                <p className='text-center text-gray-600 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque incidunt magnam quam repudiandae inventore blanditiis deleniti alias ut aperiam obcaecati!</p>
            </div>
            <div className='md:w-[300px] lg:w-[330px] xl:w-[380px] mx-auto py-5 mt-2 md:mt-0 md:h-[300px] lg:h-[260px] xl:h-[300px] shadow-sm flex flex-col items-center justify-center bg-white group'>
                <FaHandshake className='size-10 text-orange-600'/>
                <h1 className='text-2xl my-3 font-semibold group-hover:text-orange-500 duration-300'>Reliability</h1>
                <p className='text-center text-gray-600 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque incidunt magnam quam repudiandae inventore blanditiis deleniti alias ut aperiam obcaecati!</p>
            </div>
        </div>  
        <div className='w-[95%] xl:w-[90%] 2xl:w-[70%] 3xl:w-[90%] 3xl:w-[70%] md:flex mx-auto mt-2 md:mt-5 lg:mt-10'>
            <div className='md:w-[300px] lg:w-[330px] xl:w-[380px] mx-auto py-5 md:h-[300px] lg:h-[260px] xl:h-[300px] shadow-sm flex flex-col items-center justify-center bg-white group'>
                <MdAttachMoney className='size-10 text-orange-600'/>
                <h1 className='text-2xl my-3 font-semibold group-hover:text-orange-500 duration-300'>Best Prices</h1>
                <p className='text-center text-gray-600 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque incidunt magnam quam repudiandae inventore blanditiis deleniti alias ut aperiam obcaecati!</p>
            </div>
            <div className='md:w-[300px] lg:w-[330px] xl:w-[380px] mx-auto py-5 mt-2 md:mt-0 md:h-[300px] lg:h-[260px] xl:h-[300px] shadow-sm flex flex-col items-center justify-center bg-white group'>
                <GoShieldCheck className='size-10 text-orange-600'/>
                <h1 className='text-2xl my-3 font-semibold group-hover:text-orange-500 duration-300'>Quality Items</h1>
                <p className='text-center text-gray-600 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque incidunt magnam quam repudiandae inventore blanditiis deleniti alias ut aperiam obcaecati!</p>
            </div>
            <div className='md:w-[300px] lg:w-[330px] xl:w-[380px] mx-auto py-5 mt-2 md:mt-0 md:h-[300px] lg:h-[260px] xl:h-[300px] shadow-sm flex flex-col items-center justify-center bg-white group'>
                <FaHandHoldingHeart className='size-10 text-orange-600'/>
                <h1 className='text-2xl my-3 font-semibold group-hover:text-orange-500 duration-300'>Customer Satisfaction</h1>
                <p className='text-center text-gray-600 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque incidunt magnam quam repudiandae inventore blanditiis deleniti alias ut aperiam obcaecati!</p>
            </div>
        </div>  
    </div>
  )
}

export default WhyUs