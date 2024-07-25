import React, { useState, useEffect, useRef, useContext } from 'react'
import Footer from './Footer.jsx'
import Item from '../Cards/Item.jsx'
import '../Css/Gender.css'
import axios from 'axios';
import Context from '../Context/Context.js';
const Men = () => {

    let value = useContext(Context)

    const [all_product, setAll_product] = useState([])


    useEffect(() => {
        if (value.all_product) {
            setAll_product(value.all_product)
        }
    }, [value.all_product])

    return (
        <div id='ghead' className=' mx-auto flex flex-col items-center '>
            <img id='banner' className='w-[100%] border' src="../../public/Frontend_Assets/banner_mens.png" alt="" />

            <div id='sresults' className='flex w-[100%] mx-auto justify-between items-center my-[20px] '>
                <div className='text-[1.2rem]'>
                    Showing 1-12 <span className='text-gray-500'>out of 54 Products</span>
                </div>
                <div id='sort' className='flex items-center border border-black px-[11px] w-fit rounded-full py-[6px] text-[1.3rem] gap-[10px]'>
                    Sort by <img src="../../public/Frontend_Assets/dropdown_icon.png" alt="" />
                </div>
            </div>

            <div id='gproducts' className="main flex flex-wrap w-[100%] mx-auto justify-between  mb-[100px] ">
                {
                    all_product.length > 0 &&
                    all_product.map((value, index) => {
                        if (value.category == "men") {

                            return (
                                <Item key={index} value={value} />
                            )
                        }
                    })

                }
            </div>
            <Footer />
        </div>
    )
}

export default Men