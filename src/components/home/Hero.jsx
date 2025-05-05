import React, { useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const Hero = () => {

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/SlideBanner`, {
                headers: {
                    'APIKey': process.env.REACT_APP_API_KEY
                }
            })
            setBanners(response.data.data);
            console.log(response.data.data)
        }
        fetchBanners();
    }, [])
    

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4500,
        pauseOnHover: false,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

  return (
    <div className='pt-[60px] md:pt-[80px] w-screen h-screen font-overpass '>
        <Slider {...settings}>
            {banners.map((banner) =>(
                <div className='w-full h-screen md:h-[90vh] bg-black relative'>
                    {/* Background element */}
                    <Parallax speed={-30}>
                        <img src={`${process.env.REACT_APP_IMG_URL}/${banner.slideBannerID}.jpg`} alt="bg" className="w-full h-screen md:h-[91vh] object-cover opacity-75" />
                    </Parallax>

                    {/* Foreground content */}
                    <div className='w-[90%] mx-auto h-screen md:h-[100vh] absolute flex items-center inset-0 z-50'>
                        <Parallax speed={20}>
                            <h1 className="text-white text-4xl md:text-5xl font-bold z-10 lg:w-[800px] leading-tight">{banner.title}</h1>
                            <p className='text-white text-lg md:text-xl z-10 lg:w-[900px] mt-4 leading-normal'>{banner.description}</p>
                            <button className='px-4 py-3 rounded-2xl border-2 text-white mt-4 hover:border-orange-500 hover:text-orange-500 hover:backdrop-blur-md'>{banner.buttonName}</button>
                        </Parallax>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
  )
}

export default Hero