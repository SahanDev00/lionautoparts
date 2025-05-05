import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCartPlus } from 'react-icons/fa6'

const Featured = () => {

    const items = [
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://static.vecteezy.com/system/resources/thumbnails/045/912/728/small_2x/complex-black-and-blue-engine-cut-out-stock-png.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://png.pngtree.com/png-vector/20240730/ourmid/pngtree-premium-file-of-car-engine-against-on-transparent-background-png-image_13303652.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://png.pngtree.com/png-vector/20240730/ourmid/pngtree-premium-file-of-car-engine-against-on-transparent-background-png-image_13303652.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://png.pngtree.com/png-clipart/20241003/original/pngtree-detailed-3d-model-of-car-engine-with-camshaft-crankshaft-and-pistons-png-image_16185945.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://png.pngtree.com/png-clipart/20231016/original/pngtree-engine-car-turbo-png-image_13325602.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://static.vecteezy.com/system/resources/previews/045/912/749/non_2x/complex-black-engine-cut-out-stock-png.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://static.vecteezy.com/system/resources/thumbnails/045/912/728/small_2x/complex-black-and-blue-engine-cut-out-stock-png.png'
        },
        {
            name: 'Test Item Name',
            retailPrice: '20,200',
            img: 'https://png.pngtree.com/png-clipart/20231016/original/pngtree-engine-car-turbo-png-image_13325597.png'
        },
    ]

  return (
    <div className='w-full mt-5 mb-8 font-overpass flex flex-col items-center justify-center'>
        <h1 className='text-4xl text-center font-overpass font-semibold mt-4'>Featured <span className='text-orange-500'>Products</span></h1>
        <div className='w-[95%] md:w-[90%] 2xl:w-[70%] mx-auto mt-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8'>
            {items.map((item) => (
                <div className='w-full h-[300px] lg:h-[320px] p-2 hover:shadow-xl duration-300 drop-shadow-sm shadow flex flex-col items-center justify-center'>
                    <img className='w-full h-[180px] lg:h-[200px] object-contain' src={item.img} alt="" />
                    <h1 className='text-xl mt-2 line-clamp-1' title={item.name}>{item.name}</h1>
                    <h1 className='mt-1'>Rs. {item.retailPrice}</h1>
                    <div className='flex mt-1 items-center justify-center gap-4'>
                        <FaSearch className='text-xl text-orange-500 cursor-pointer' title='more details'/>
                        <FaCartPlus className='text-xl text-orange-500 cursor-pointer' title='add to cart'/>
                    </div>
                </div>
            ))}
        </div>
        <button className='mx-auto mt-8 border px-6 py-2 rounded-sm border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 hover:rounded-full'>See More</button>
    </div>
  )
}

export default Featured