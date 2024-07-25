import React, { useState, useEffect } from 'react'
import '../Css/Cart.css'
import axios from 'axios'
import Context from '../Context/Context.js'
import { useContext } from 'react'
import { MdFindReplace } from "react-icons/md";
import { TbZoomCancel } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'
const Order = () => {
    let value = useContext(Context);
    const [orderp, setOrderp] = useState([])
    const [all_product, setAll_product] = useState([])
let navigate=useNavigate();
    useEffect(() => {
        setAll_product(value.all_product)
    }, [value.all_product])



    const getorder = async () => {
        const res = await axios.get(`http://localhost:3000/getorder`, {
            withCredentials: true,
        });
        setOrderp(res.data.reverse())

    }
    const cancelorder = async (id) => {
        let data = { order_id: id }
        const res = await axios.put(`http://localhost:3000/cancelorder`, data, {
            withCredentials: true,
        });

        alert(res.data.message)
        getorder()

    }

    useEffect(() => {
        getorder();
    }, [])

    const gtpro = (id) => {
        navigate(`/product/${id}`)
      }


    return (
        <>

            <div id='chead' style={{ marginTop: '2vw' }} className=' mx-auto'>


                <div id='headings' className=' w-[100%] text-[2rem] font-semibold  flex justify-between border-b-2 border-gray-500 pb-[15px] '>
                    <span className='w-[10%] mr-[5px]'>Products</span>
                    <span className='w-[25%] '>Title</span>
                    <span className='w-[5%] '>Size</span>
                    <span className='w-[10%] '>Price</span>
                    <span className='w-[10%] '>Quantity</span>
                    <span className='w-[10%] '>Total</span>
                    <span className='w-[10%] '>Status</span>
                    <span className='w-[8%] '></span>



                </div>

                {
                    orderp.length >= 0 && all_product.length > 0 ?
                        orderp.map((value, index) => {
                            let finalp = all_product.find((e) => e.id == value.product_id)
                            let ac = value.count * finalp.new_price;
                            return (
                                <>
                                    <div key={index} id='prodetail' className=' w-[100%] text-[1.4rem] text-gray-700 font-semibold flex justify-between py-[15px] border-b-2 border-gray-500 items-center'>
                                        <span className='w-[10%]  '><img id='prodimg' className='w-[70%]  border cursor-pointer' onClick={() => { gtpro(value.product_id) }} src={finalp.image} alt="" /></span>
                                        <span className='w-[27%]  '>{finalp.name}</span>
                                        <span className='w-[5%]  '>{value.size}</span>
                                        <span className='w-[10%]  '>${finalp.new_price}</span>
                                        <span className='w-[10%]  flex pl-[20px]'> {value.count} </span>
                                        <span className='w-[10%] '>${ac - ac * value.discount / 100}</span>
                                        <span className='w-[12%] '>{value.status ? "Delivered" : "onWay"}</span>
                                        {
                                            !value.status ?
                                                <>
                                                    <button id='cancel' onClick={() => { cancelorder(value._id) }} className='bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[0.69vw] py-[5px] px-[10px]'>Cancel</button>
                                                    <TbZoomCancel size={25} className='hide' />
                                                </>
                                                :
                                                <>
                                                    <button id='replace' className='bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[0.79vw] py-[5px] px-[10px]'>Replace</button>
                                                    <MdFindReplace size={25} className='hide' />
                                                </>
                                        }
                                    </div>

                                    <div id='occard' className='flex justify-center gap-[25px] w-full mx-auto mb-[10px] border p-[5px]'>
                                        <div>
                                            <img src={finalp.image} onClick={() => { gtpro(value.product_id) }} className='w-[140px]' alt="" />

                                        </div>
                                        <div className='text-[1.5rem] flex flex-col '>
                                            <p className='font-bold mb-[5px]'>{finalp.name}</p>
                                            <p className='flex items-center justify-between grow'>
                                                <span>
                                                    <span className='font-semibold'>
                                                        Size
                                                    </span>
                                                    :{value.size}
                                                </span>
                                                <span>
                                                    <span className='font-semibold'>
                                                    Quantity
                                                    </span>
                                                    :{value.count}
                                                </span>
                                            </p>

                                            <p className='flex items-center justify-between grow'>
                                                <span className='font-semibold'>
                                                    ${ac - ac * value.discount / 100}
                                                </span>
                                                <span className='font-semibold'>
                                                    {value.status ? "Delivered" : "onWay"}
                                                </span>
                                            </p>
                                            {
                                                !value.status ?
                                                    <div className='grow text-center'>
                                                        <button id='' onClick={() => { cancelorder(value._id) }} className='bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[1rem] py-[2px] px-[10px] '>Cancel</button>
                                                    </div>
                                                    :
                                                    <div className='grow text-center'>
                                                        <button id='' className='bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[1rem] py-[2px] px-[10px]'>Replace</button>
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                </>

                            )
                        })

                        : <h1 className='font-bold text-[20px] w-fit mx-auto mt-[20px]'>No Orders  </h1>

                }

            </div>
        </>
    )
}

export default Order