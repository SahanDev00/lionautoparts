import { useState } from 'react'
import logo from '../../images/logo.jpeg'
import { FaSearch, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { LuMenu } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Navbar = () => {

    const [isMenu, setIsMenu] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const location = useLocation();
    const Navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');

    const isActive = (path) => {
        return location.pathname === path;
    };
    
    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }

    const toggleSearch = () => {
        setIsSearch(!isSearch);
    }


      const handleSearch = () => {
        if (searchQuery.trim()) {
            Navigate(`/search/${searchQuery.trim()}`);
            setSearchQuery('')
            setIsSearch(false);
        }
    };
    

  return (
    <div className='w-full h-[60px] md:h-[80px] fixed z-40 bg-white backdrop-blur-sm shadow'>
        <div className='w-[90%] lg:w-[70%] hidden md:flex mx-auto h-full items-center justify-between'>
            <div className='w-[400px] h-full'>
                <Link to='/'>
                    <img src={logo} className='w-[80px] p-2 h-full rounded-full cursor-pointer' alt="" />
                </Link>
            </div>
            <div className='w-full h-full'>
                <div className='w-full h-[45px] flex items-center justify-end gap-4'>
                    {!customerId ? (
                        <Link to='/sign-up'>
                            <FaUser className={`size-5 cursor-pointer hover:text-orange-400 ${isActive('/login') || isActive('/sign-up') || isActive('/account') ? 'text-orange-600' : ''}`} />
                        </Link>
                    ) : (
                        <Link to='/account'>
                            <FaUser className={`size-5 cursor-pointer hover:text-orange-400 ${isActive('/login') || isActive('/sign-up') || isActive('/account') ? 'text-orange-600' : ''}`} />
                        </Link>
                    )}
                    <Link to='/cart'>
                        <FaCartShopping className={`size-5 cursor-pointer hover:text-orange-400 ${isActive('/cart') ? 'text-orange-600' : ''}`} />
                    </Link>
                    <FaSearch onClick={toggleSearch} className={`size-5 cursor-pointer hover:text-orange-400 ${isSearch ? 'text-orange-600' : ''}`}/>
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

        {/* Searchbar */}
        {isSearch && (
            <form className={`w-[90%] sm:w-[80%] lg:w-[60%] xl:w-[50%] top-[70px] fixed left-0 right-0 inset-0 md:top-[90px] h-[50px] flex items-center justify-center z-50 mx-auto shadow-md rounded-lg overflow-hidden translate-y-4 transform float-up`}>
                <input 
                value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                  type="text" placeholder='Search...' className='w-[90%] h-full pl-4 bg-white border-orange-500' />
                <button onClick={handleSearch} type='submit' className='w-[10%] h-full bg-orange-500 text-white flex items-center justify-center'><FaSearch /></button>
            </form>
        )}

        {/* mobile nav */}
        <div className='w-[90%] md:hidden flex mx-auto h-full items-center justify-between'>
            <div className='w-[100px] h-full'>
                <Link to='/'>
                    <img src={logo} className='w-[60px] p-2 sm:p-1 h-full rounded-full cursor-pointer' alt="" />
                </Link>
            </div>
            <div className='w-full h-full'>
                <div className='w-full h-full flex items-center justify-end gap-4'>
                    <FaUser className='size-5 cursor-pointer hover:text-orange-400' />
                    <FaCartShopping className='size-5 cursor-pointer hover:text-orange-400' /> 
                    <FaSearch onClick={toggleSearch} className={`size-5 cursor-pointer md:hover:text-orange-400 ${isSearch ? 'text-orange-600' : ''}`}/>
                    <LuMenu onClick={toggleMenu} className='size-6 cursor-pointer' /> 
                </div>
            </div>
        </div>

        <div className={`w-screen h-screen px-6 flex flex-col md:hidden justify-center bg-white z-50 fixed top-0 duration-300 ${!isMenu ? '-left-[800px]' : 'left-0'}`}>
            <IoClose onClick={toggleMenu} className='size-7 cursor-pointer absolute top-3 right-3' />
            <Link to='/' onClick={toggleMenu}>
                <p className={`font-overpass cursor-pointer text-xl mb-5 ${isActive('/') ? 'text-orange-600' : ''}`}>Home</p>
            </Link>
            <Link to='/store' onClick={toggleMenu}>
                <p className={`font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 ${isActive('/store') ? 'text-orange-600' : ''}`}>Store</p>
            </Link>
            <Link to='about' onClick={toggleMenu}>
                <p className={`font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 ${isActive('/about') ? 'text-orange-600' : ''}`}>About</p>
            </Link>
            <Link to='contact' onClick={toggleMenu}>
                <p className={`font-overpass cursor-pointer hover:text-orange-400 text-xl mb-5 ${isActive('/contact') ? 'text-orange-600' : ''}`}>Contact</p>
            </Link>
        </div>
    </div>
  )
}

export default Navbar