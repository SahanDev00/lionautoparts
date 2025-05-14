import React, { useEffect, useState } from 'react'
import logo from '../../images/logo.jpeg'
import { FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { LuMenu } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

const Navbar = () => {

    const [isMenu, setIsMenu] = useState(false);
    const [isBrand, setIsBrand] = useState(false);
    const [brandNames, setBrandNames] = useState([]);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };
    
    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }

    const toggleBrand = () => {
        setIsBrand(!isBrand);
    }

    useEffect(() => {
      const fetchBrands = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Brand`, {
            headers: {
                'APIKey' : process.env.REACT_APP_API_KEY
            } 
        })

        setBrandNames(response.data.data);
      }

      fetchBrands();
    }, [])

    const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');
    

  return (
    <div className='w-full h-[60px] md:h-[80px] fixed z-40 bg-white backdrop-blur-sm shadow'>
        <div className='w-[90%] lg:w-[70%] hidden md:flex mx-auto h-full items-center justify-between'>
            <div className='w-[400px] h-full'>
                <img src={logo} className='w-[80px] p-2 h-full rounded-full cursor-pointer' alt="" />
            </div>
            <div className='w-full h-full'>
                <div className='w-full h-[45px] flex items-center justify-end gap-4'>
                    {!customerId ? (
                        <Link to='/sign-up'>
                            <FaUser className={`size-5 cursor-pointer hover:text-orange-400 ${isActive('/login') && 'text-orange-600'}`} />
                        </Link>
                    ) : (
                        <Link to='/account'>
                            <FaUser className={`size-5 cursor-pointer hover:text-orange-400 ${isActive('/login') && 'text-orange-600'}`} />
                        </Link>
                    )}
                    <Link to='/cart'>
                        <FaCartShopping className={`size-5 cursor-pointer hover:text-orange-400 ${isActive('/cart') ? 'text-orange-600' : ''}`} />
                    </Link>
                </div>
                <div className='w-full h-[30px] flex items-center justify-end gap-16'>
                    <Link to='/' className='h-full'>
                        <p className={`font-overpass h-full cursor-pointer hover:text-orange-400 ${isActive('/') ? 'text-orange-600 ' : ''}`}>Home</p>
                    </Link>
                    <Link to='/store' className=' h-full'>
                        <p className={`font-overpass cursor-pointer hover:text-orange-400 ${isActive('/store') ? 'text-orange-600' : ''}`}>Store</p>
                    </Link>
                    {/* <div className='group relative h-full'>
                        <p className='font-overpass cursor-pointer hover:text-orange-400 flex items-center gap-2 group-hover:text-orange-600'>Brands <IoIosArrowDown className='group-hover:rotate-180 duration-300' /></p>
                        <div className='absolute border-orange-500 group-hover:border top-7 w-[200px] bg-white max-h-[0px] group-hover:max-h-[999px] shadow-lg duration-300 overflow-hidden group-hover:p-3'>
                            {brandNames.map((brand) => (
                                <Link to={`/brands/${brand.brandID}`}>
                                    <p className='cursor-pointer font-overpass mb-1 hover:text-orange-400'>{brand.brandName}</p>
                                </Link>
                            ))}
                        </div>
                    </div> */}
                    <Link to='/about' className=' h-full'>
                        <p className={`font-overpass h-full cursor-pointer  hover:text-orange-400 ${isActive('/about') ? 'text-orange-600' : ''}`}>About</p>
                    </Link>
                    <Link to='/contact' className=' h-full'>
                        <p className={`font-overpass h-full cursor-pointer  hover:text-orange-400 ${isActive('/contact') ? 'text-orange-600' : ''}`}>Contact</p>
                    </Link>
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
                    <FaUser className='size-5 cursor-pointer hover:text-orange-400' />
                    <FaCartShopping className='size-5 cursor-pointer hover:text-orange-400' /> 
                    <LuMenu onClick={toggleMenu} className='size-6 cursor-pointer' /> 
                </div>
            </div>
        </div>

        <div className={`w-screen h-screen px-6 flex flex-col md:hidden justify-center bg-white z-50 fixed top-0 duration-300 ${!isMenu ? '-left-[800px]' : 'left-0'}`}>
            <IoClose onClick={toggleMenu} className='size-7 cursor-pointer absolute top-3 right-3' />
            <Link to='/'>
                <p className={`font-overpass cursor-pointer text-xl mb-5 ${isActive('/') ? 'text-orange-600' : ''}`}>Home</p>
            </Link>
            <Link to='/store'>
                <p className={`font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 ${isActive('/store') ? 'text-orange-600' : ''}`}>Store</p>
            </Link>
            <p className='font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 flex items-center gap-2' onClick={toggleBrand}>Brands <IoIosArrowDown className={`duration-300 ${isBrand && 'rotate-180'}`} /></p>
            <div className={`w-[300px] duration-300 overflow-hidden  ${isBrand ? 'max-h-[999px] mb-5' : 'max-h-[0px]'}`}>
                {brandNames.map((brand) => (
                    <Link to={`/brands/${brand.brandID}`} onClick={() => setIsMenu(false)}>
                        <p className='cursor-pointer font-overpass mb-1 hover:text-orange-400 ml-5'>{brand.brandName}</p>
                    </Link>
                ))}
            </div>
            <Link to='about'>
                <p className={`font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 ${isActive('/about') ? 'text-orange-600' : ''}`}>About</p>
            </Link>
            <Link to='contact'>
                <p className={`font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 ${isActive('/contact') ? 'text-orange-600' : ''}`}>Contact</p>
            </Link>
        </div>
    </div>
  )
}

export default Navbar