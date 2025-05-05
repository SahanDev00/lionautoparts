import React from 'react'
import Hero from '../../components/home/Hero'
import SearchComponent from '../../components/home/SearchComponent'
import Categories from '../../components/home/Categories'
import Featured from '../../components/home/Featured'
import WhyUs from '../../components/home/WhyUs'
import CTA from '../../components/home/CTA'

const Home = () => {
  return (
    <div className='3xl:w-[99.2vw] overflow-hidden'>
        <Hero />
        <Categories />
        <SearchComponent />
        <Featured />
        <WhyUs />
        <CTA />
    </div>
  )
}

export default Home