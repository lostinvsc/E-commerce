import React,{useEffect,useRef, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../Css/Footer.css'
const Footer = () => {
    const ref=useRef();
    const navigate=useNavigate();
    const toHome=()=>{
        navigate('/')
        window.scrollTo(0,0)
    }
    return (
        <div className='w-[100vw] flex flex-col items-center gap-[30px] '>
            <a id='icon' ref={ref} onClick={toHome}  className='flex items-center justify-center cursor-pointer '>
                <img src="../../public/Frontend_Assets/logo_big.png" alt="" />
                <h1 className='text-[3.6rem] font-semibold'>SHOPPER</h1>
            </a>
            <div id='cpoac' className=''>
                <ul className='flex justify-between w-[100%] text-[1.5rem]  text-gray-600 '>
                    <li className='cursor-pointer'>Company</li>
                    <li className='cursor-pointer'>Products</li>
                    <li className='cursor-pointer'>Offices</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>
            </div>

            <div className='w-[100%]'>
                <ul id='sm' className='flex justify-around w-[50%] mx-auto text-[1.5rem] text-gray-600 '>
                    <li><img className='w-[23px]' src="../Frontend_Assets/instagram_icon.png" alt="" /></li>
                    <li><img className='w-[23px]' src="../Frontend_Assets/pintester_icon.png" alt="" /></li>
                    <li><img className='w-[23px]' src="../Frontend_Assets/whatsapp_icon.png" alt="" /></li>
                </ul>
            </div>
           
            <footer className='border-t-[2px] w-[100%]  text-center py-[20px] text-[1.2rem]'>
                Copyright &copy; 2024 - All Rights Reserved
            </footer>

        </div>
    )
}

export default Footer