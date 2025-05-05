import React, { useState } from 'react'
import logo from '../../images/logo.jpeg'
import { FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { LuMenu } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5'

const Navbar = () => {

    const [isMenu, setIsMenu] = useState(false);
    const [isBrand, setIsBrand] = useState(false);

    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }

    const toggleBrand = () => {
        setIsBrand(!isBrand);
    }

  return (
    <div className='w-full h-[60px] md:h-[80px] fixed z-40 bg-blue-900'>
        <div className='w-[90%] lg:w-[70%] hidden md:flex mx-auto h-full items-center justify-between'>
            <div className='w-[400px] h-full'>
                <img src={logo} className='w-[80px] p-2 h-full rounded-full cursor-pointer' alt="" />
            </div>
            <div className='w-full h-full'>
                <div className='w-full h-[45px] flex items-center justify-end gap-4'>
                    <FaUser className='text-white size-5 cursor-pointer hover:text-orange-400' />
                    <FaCartShopping className='text-white size-5 cursor-pointer hover:text-orange-400' />
                </div>
                <div className='w-full h-[30px] flex items-center justify-end gap-16'>
                    <p className='text-orange-600 font-overpass h-full cursor-pointer hover:text-orange-400'>Home</p>
                    <p className='text-white font-overpass h-full cursor-pointer hover:text-orange-400'>Store</p>
                    <div className='group relative h-full'>
                        <p className='text-white font-overpass cursor-pointer hover:text-orange-400 flex items-center gap-2 group-hover:text-orange-600'>Brands <IoIosArrowDown className='group-hover:rotate-180 duration-300' /></p>
                        <div className='absolute top-7 w-[200px] bg-black h-[0px] group-hover:h-[400px] shadow duration-300 overflow-hidden'>

                        </div>
                    </div>
                    <p className='text-white font-overpass h-full cursor-pointer hover:text-orange-400'>About</p>
                    <p className='text-white font-overpass h-full cursor-pointer hover:text-orange-400'>Contact</p>
                </div>
            </div>
        </div>

        {/* mobile nav */}
        <div className='w-[90%] md:hidden flex mx-auto h-full items-center justify-between'>
            <div className='w-[100px] h-full'>
                <img src={logo} className='w-[60px] p-2 sm:p-1 h-full rounded-full cursor-pointer' alt="" />
            </div>
            <div className='w-full h-full'>
                <div className='w-full h-full flex items-center justify-end gap-4'>
                    <FaUser className='text-white size-5 cursor-pointer hover:text-orange-400' />
                    <FaCartShopping className='text-white size-5 cursor-pointer hover:text-orange-400' /> 
                    <LuMenu onClick={toggleMenu} className='text-white size-6 cursor-pointer' /> 
                </div>
            </div>
        </div>

        <div className={`w-screen h-screen px-6 flex flex-col md:hidden justify-center bg-white z-50 fixed top-0 duration-300 ${!isMenu ? '-left-[800px]' : 'left-0'}`}>
            <IoClose onClick={toggleMenu} className='size-7 cursor-pointer absolute top-3 right-3' />
            <p className='text-orange-600 font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5'>Home</p>
            <p className='font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5'>Store</p>
            <p className='font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 flex items-center gap-2' onClick={toggleBrand}>Brands <IoIosArrowDown className={`duration-300 ${isBrand && 'rotate-180'}`} /></p>
            <div className={`w-[300px] duration-300 overflow-hidden ${isBrand ? 'h-[300px]' : 'h-[0px]'}`}>

            </div>
            <p className='font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5'>About</p>
            <p className='font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5'>Contact</p>
        </div>
    </div>
  )
}

export default Navbar