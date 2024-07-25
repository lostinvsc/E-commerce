import React, { useState, useEffect, useRef } from 'react'
import Item from '../Cards/Item';
import Footer from './Footer.jsx'
import '../Css/Shop.css'
import axios from 'axios';

const Shop = () => {

    const [new_collections, setNew_collections] = useState([])
    const [data_product, setData_product] = useState([])
    const [list, setList] = useState([]);

    const getlist = async () => {
        let res = await axios.get('http://localhost:3000/getlist')

        setList(res.data)

    }

    useEffect(() => {
        getlist()
    }, [])

    useEffect(() => {

        if (list.length > 0) {
            let newc = list.filter((e) => e.tag[1] == "new" || e.tag[2] == "new")
            setNew_collections(newc)
            let data_p = list.filter((e) => e.tag[1] == "famous" || e.tag[2] == "famous")
            setData_product(data_p)
            
        }

    }, [list])

    return (
        <div id='head' className='flex flex-col'>
            <div id='page1' className='page1 bg-gradient-to-t from-white to-purple-400 flex justify-between pl-[8vw] pr-[2vw] pt-[3vw] relative'>
                <div className=' border-red-600 pt-[14vw] ' >
                    <h6 className='text-[1.4vw] font-sans '>NEW ARRIVALS ONLY</h6>
                    <div className='text-[5.5vw] font-semibold font-mono relative z-20'>
                        <h1 className='flex items-center'>new <img className='w-[5.5vw]' src="../Frontend_Assets/hand_icon.png" alt="" /></h1>
                        <h1>collections</h1>
                        <h1>for everyone</h1>
                    </div>
                    <div id='latestc' className="latestc mt-[4vw] rounded-full px-[30px] py-[15px] cursor-pointer bg-red-600 text-white w-fit text-[1.3rem] flex items-center" >
                        Latest Collection <img className='w-[1.5rem] ml-[1vw]' src="../Frontend_Assets/arrow.png" alt="" />
                    </div>
                </div>

                <div>

                    <img id='homegirl' className=' border-red-600 w-[36vw]' src="../Frontend_Assets/hero_image.png" alt="" />
                </div>
            </div>
            <div id='page2' className="page2  flex flex-col items-center gap-[100px] mt-[150px] ">
                <div className=" w-[100%] m-auto flex flex-col items-center ">
                    <h1 id='wfamous' className='text-[5rem] font-bold border-black flex flex-col items-center gap-[10px]'>
                        <span>FAMOUS In WOMEN</span>
                        <div className='w-[200px] bg-black h-[5px] '></div>
                    </h1>

                    <div id='citem' className='flex justify-between w-[100%] mt-[5vw]'>

                        {  data_product.length>0 &&
                            data_product.map((value, index) => {
                                return (

                                    <Item key={index} value={value} />
                                )
                            })
                        }

                    </div>
                </div>

                <div id='woffer' className="woffer w-[100%] border-black mx-auto bg-gradient-to-t from-white to-purple-300 rounded-md flex justify-between px-[5vw] pt-[70px]">
                    <div id='eofy' className='text-[7rem] py-[50px] '>
                        <div className='exclusivetxt'>

                            EXclusive <br /> Offers For You
                        </div>
                        <p id='oobsp' className='text-[2rem] my-[20px]'>ONLY ON BEST SELLERS PRODUCTS</p>
                        <div id='cn' className='rounded-full bg-red-600 text-white text-[1.4rem] w-fit px-[30px] py-[15px]'>
                            Check now
                        </div>
                    </div>

                    <div id='exclusiveimg' className='w-[40%]'>
                        <img className='w-[100%] ' src="../Frontend_Assets/exclusive_image.png" alt="" />
                    </div>
                </div>
            </div>
            <div id='page2' className="page3  flex flex-col w-[100vw] items-center gap-[100px] mt-[200px]">
                <div className=" w-[100%] m-auto flex flex-col items-center ">
                    <h1 id='wfamous' className='text-[5rem] font-bold border-black flex flex-col items-center gap-[10px]'>
                        <span>NEW COLLECTIONS</span>
                        <div className='w-[200px] bg-black h-[5px] '></div>
                    </h1>
                    <div id='citem' className='flex flex-wrap justify-between w-[100%] mt-[5vw]'>

                        {
                            new_collections.length>0 &&
                            new_collections.map((value, index) => {
                                return (

                                    <Item key={index} value={value} />
                                )
                            })
                        }

                    </div>
                </div>
                <div id='subscribe' className="  w-[100%] mx-auto bg-gradient-to-t from-white to-purple-300 rounded-md flex flex-col items-center py-[50px] h-[400px]">

                    <p className='text-[4rem] font-bold '>Get Exclusive Offers on Your Email</p>
                    <p className='text-[1.7rem]  my-[30px]'>Subscribe to our newsletter and stay updated</p>

                    <div className='rounded-full w-[50rem] flex justify-center text-[2rem] font-light border border-gray-600'>
                        <input placeholder='your email id' className='w-[40rem] rounded-l-full pl-[15px] outline-none text-[1.6rem] bg-transparent' type="email" />
                        <span className='rounded-full cursor-pointer px-[20px] py-[10px] bg-black text-white'>Subscribe</span>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Shop