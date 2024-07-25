import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer.jsx'
import Description from './Description.jsx'
import RelatedProducts from './RelatedProducts.jsx'
import axios from 'axios'
import '../Css/Product.css'
import Context from '../Context/Context.js'

const Product = () => {
    const [size, setSize] = useState('')
    let our_id = parseInt(useParams().id)
    const value = useContext(Context)
    const [our_product, setOur_product] = useState({});
    const [review, setReview] = useState('')
    let navigate = useNavigate()

    

    useEffect(() => {
        let x = value.all_product.filter((e) => e.id == our_id)
        setOur_product(x[0])

    },)


    const addtocart = async (url, id) => {
        if (size) {
            if (url == 'ordernow') {
                if (!value.user.address.flat) {
                    navigate('/profile')
                    return alert("No address added")
                }
            }
            let data = { id: id, size: size }
            const response = await axios.post(`http://localhost:3000/${url}`, data, {
                withCredentials: true,
            });
            alert(response.data.message)
        } else {
            alert("Add size")
        }

        if (url == 'addtocart') {
            const res2 = await axios.get(`http://localhost:3000/getcart`, {
                withCredentials: true,
            });
            value.setCount(res2.data.length)
        }
    }

    return (
        <div className='flex flex-col items-center gap-[70px]'>

            {

                our_product &&
                <div id='phead' className='flex flex-col mx-auto items-center border'>

                    <div id='direction' className='flex text-[1.3rem] flex-wrap gap-[5px] items-center w-[100%] mx-auto py-[50px]'>
                        <span>Home </span>
                        <img className='h-[12px]' src="../Frontend_Assets/breadcrum_arrow.png" alt="" />
                        <span>Shop </span>
                        <img className='h-[12px]' src="../Frontend_Assets/breadcrum_arrow.png" alt="" />
                        <span>   {our_product.category} </span>
                        <img className='h-[12px]' src="../Frontend_Assets/breadcrum_arrow.png" alt="" />
                        <span>{our_product.name} </span>
                    </div>

                    <div id='pinfo' className='flex justify-between w-[100%] flex-wrap border'>
                        <div id='image' className="image w-[48%]  flex justify-between">
                            <div id='mainleftimg' className='flex flex-col justify-between w-[18%]'>
                                <img className='hover:scale-[1.08] transition-scale duration-500' src={our_product.image} alt="" />
                                <img className='hover:scale-[1.08] transition-scale duration-500' src={our_product.image} alt="" />
                                <img className='hover:scale-[1.08] transition-scale duration-500' src={our_product.image} alt="" />
                                <img className='hover:scale-[1.08] transition-scale duration-500' src={our_product.image} alt="" />
                            </div>

                            <div id='mainimg' className='w-[79%] hover:scale-[1.01] transition-scale duration-500'>
                                <img className='w-[100%]' src={our_product.image} alt="" />
                            </div>
                        </div>
                        <div id='context' className="context w-[48%] flex flex-col justify-between">
                            <p id='pname' className='text-[3.6rem] font-semibold '>
                                {
                                    our_product.name
                                }
                            </p>
                            <div className='flex items-center'>
                                <img className='star' src="../../public/Frontend_Assets/star_icon.png" alt="" />
                                <img className='star' src="../../public/Frontend_Assets/star_icon.png" alt="" />
                                <img className='star' src="../../public/Frontend_Assets/star_icon.png" alt="" />
                                <img className='star' src="../../public/Frontend_Assets/star_icon.png" alt="" />
                                <img className='star' src="../../public/Frontend_Assets/star_dull_icon.png" alt="" />
                            </div>
                            <div id='price' className=' flex gap-[15px] text-[1.6rem]'>
                                <span className='line-through'>${our_product.old_price}</span>
                                <span className='text-red-500'>${our_product.new_price}</span>
                            </div>
                            <p id='detail' className='text-[1.5rem] '>
                                A light weight,usually knitted, pullover shirt, close-fitting and with round neckline and short sleeve, worn as undershirt or outer garment
                            </p>
                            <div id='size' className="">
                                <div className='text-[1.7rem] font-semibold text-gray-500 mb-[10px]'>Select Size</div>
                                <div className='flex items-center gap-[8px]'>
                                    <button id='sizes' onClick={() => { setSize("S") }} className={`border w-[40px] h-[40px] flex items-center justify-center   ${size == "S" ? 'bg-red-400' : 'hover:bg-slate-200'}`}>S</button>
                                    <button id='sizel' onClick={() => { setSize("M") }} className={`border w-[40px] h-[40px] flex items-center justify-center  ${size == "M" ? 'bg-red-400' : 'hover:bg-slate-200'}`}>M</button>
                                    <button id='sizexl' onClick={() => { setSize("L") }} className={`border w-[40px] h-[40px] flex items-center justify-center  ${size == "L" ? 'bg-red-400' : 'hover:bg-slate-200'}`}>L</button>
                                    <button id='sizexxl' onClick={() => { setSize("XL") }} className={`border w-[40px] h-[40px] flex items-center justify-center ${size == "XL" ? 'bg-red-400' : 'hover:bg-slate-200'}`}>XL</button>
                                </div>
                            </div>

                            <div id='btns' className='flex items-center gap-[40px]'>
                                <button id='btns1' onClick={() => { addtocart('addtocart', our_id) }} className=' bg-red-500 w-[150px] py-[13px] rounded-lg text-white text-[1.5rem] hover:bg-red-600 '>Add to cart</button>
                                <button id='btns2' onClick={() => { addtocart('ordernow', our_id) }} className=' bg-red-500 w-[150px] py-[13px] rounded-lg text-white text-[1.5rem] hover:bg-red-600 '>Buy Now</button>

                            </div>
                            <div id='tags' className='flex flex-col text-[1.3rem] gap-[5px]'>
                                <div>
                                    Category: <span>{our_product.category}</span>
                                </div>
                                <div>
                                    Tags: <span>Modern, Latest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                our_product &&
                <Description our_id={our_id} review={our_product.reviews} />
            }
            {
                our_product &&
                <RelatedProducts category={our_product.category} />
            }
            <Footer />

        </div>
    )
}

export default Product