import React from 'react'
import Context from '../Context/Context.js'
import { useContext, useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import '../Css/Navbar.css'
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BsMinecartLoaded } from "react-icons/bs";

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    let value = useContext(Context)
    let navigate = useNavigate();
    const [count, setCount] = useState(0)
    const [dropdown, setDropdown] = useState(false)
    const [username, setUsername] = useState("")
    let ref = useRef()


    function changedd() {
        if (dropdown == false) {
            setDropdown(true)
        } else if (dropdown == true) {
            setDropdown(false)
        }
    }




    const getcart = async () => {
        const res2 = await axios.get(`http://localhost:3000/getcart`, {
            withCredentials: true,
        });
        value.setCount(res2.data.length)
        getdetail()
    }

    useEffect(() => {
        getcart()

    },)

    const logout = async () => {
        let x = confirm("Are you sure you want to logout")

        if (x) {
            const req = await axios.get("http://localhost:3000/logout", {
                withCredentials: true
            })
            value.setCookie(Cookies.get("token"))
            alert(req.data)
            goHome()
        }
    }
    const goHome = () => {
        navigate('/')
    }

    useEffect(() => {
        getdetail()
    }, [])

    const getdetail = async () => {
        const res = await axios.get("http://localhost:3000/userdetail", {
            withCredentials: true
        })

        if(res.data.username){

            value.setUser(res.data)
        }

    }



    return (
        <nav id='navbar' className=' relative flex justify-between items-center py-[1rem] border pl-[10vw] pr-[10vw]'>
            <div id='shopper' onClick={goHome} className='flex items-center cursor-pointer '>
                <img className='w-[5rem]' src="../Frontend_Assets/logo.png" alt="" />
                <h2 className='text-[3rem]'>SHOPPER</h2>
            </div>
            <div className='unshow'>
                <ul className='flex items-center gap-[2rem] text-[1.5rem] font-light font-sans'>

                    <NavLink className={(e) => { return e.isActive ? 'underline decoration-4 underline-offset-8 decoration-red-500 list-none' : 'list-none hover:text-orange-400' }} to="/" >Shop</NavLink>
                    <NavLink className={(e) => { return e.isActive ? 'underline decoration-4 underline-offset-8 decoration-red-500' : 'hover:text-orange-400' }} to="/kids">Kids</NavLink>
                    <NavLink className={(e) => { return e.isActive ? 'underline decoration-4 underline-offset-8 decoration-red-500' : 'hover:text-orange-400' }} to="/men">Men</NavLink>
                    <NavLink className={(e) => { return e.isActive ? 'underline decoration-4 underline-offset-8 decoration-red-500' : 'hover:text-orange-400' }} to="/women">Women</NavLink>
                </ul>
            </div>
            <div className='unshow'>
                <ul className='flex items-center gap-[4rem]'>


                    {
                        value.cookie &&

                        <div onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='relative '>
                            <button id="dropdownHoverButton" ref={ref} className={`text-black  hover:bg-gray-100 focus:ring-4  focus:outline-none focus:ring-blue-300 
                               text-[15px] rounded-lg px-5 py-2.5 text-center inline-flex place-items-center border border-black `} >
                                {value.user.username? <div>{value.user.username}</div>:'You' }
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div id="dropdownHover" className={`top-[100%]  text-black absolute z-30  rounded-lg shadow w-44 dark:bg-gray-200  ${dropdown ? '' : 'hidden'}`}>
                                <ul className="text-[16px] ">

                                    <NavLink to="/profile" className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
                                        Profile
                                    </NavLink>
                                    <NavLink to="/order" className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
                                        Orders
                                    </NavLink>
                                    <span onClick={logout} className="w-full block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white ">Logout</span>
                                </ul>
                            </div>
                        </div>

                    }

                    {
                        !value.cookie &&
                        <NavLink to="/login" className='list-none text-[2rem] font-thin font-sans border border-gray-500 rounded-full px-[1.3rem] py-[0.3rem] hover:text-orange-400'>Login</NavLink>

                    }



                    <NavLink to="/cart" className='relative '>
                        <img className='w-[3rem]' src="../Frontend_Assets/cart_icon.png" alt="" />
                        <div className="counter absolute top-0 bg-red-600 text-white right-0 rounded-full w-[15px] text-center h-[15px]">

                            {
                                value.count&&value.cookie ?
                                    value.count
                                    : '0'
                            }

                        </div>
                    </NavLink>

                </ul>
            </div>

            <div onClick={() => { setToggle(!toggle) }} className='show'>
                <button> {

                    !toggle ? <AiOutlineMenuFold className='menubtn' size={30} /> :
                        <AiOutlineMenuUnfold className='menubtn' size={30} />

                } </button>
            </div>

            {
                toggle &&
                <div id='dropmenu' className='absolute right-0 top-[61px]  w-[100vw] h-[95vh] bg-white  z-50 flex flex-col border border-white '>

                    <ul onClick={()=>{setToggle(false)}} className='flex text-black flex-col items-center gap-[1.9rem] text-[2.4rem] font-light font-sans py-[20px]'>

                        <NavLink className={(e) => { return e.isActive ? ' underline decoration-4 underline-offset-8 decoration-red-500  w-full text-end pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/" >Shop</NavLink>
                        <NavLink className={(e) => { return e.isActive ? ' underline decoration-4 underline-offset-8 decoration-red-500  w-full text-end pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/kids">Kids</NavLink>
                        <NavLink className={(e) => { return e.isActive ? ' underline decoration-4 underline-offset-8 decoration-red-500  w-full text-end pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/men">Men</NavLink>
                        <NavLink className={(e) => { return e.isActive ? ' underline decoration-4 underline-offset-8 decoration-red-500  w-full text-end pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/women">Women</NavLink>
                        <NavLink className={(e) => { return e.isActive ? ' underline decoration-4 underline-offset-8 decoration-red-500  w-full text-end pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/profile">Profile</NavLink>
                        <NavLink className={(e) => { return e.isActive ? ' underline decoration-4 underline-offset-8 decoration-red-500  w-full text-end pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/order">Orders</NavLink>

                        {
                            !value.cookie ?
                                <NavLink className={(e) => { return e.isActive ? 'underline decoration-4 underline-offset-8 decoration-red-500  w-full  pr-[50px]' : ' w-full text-end pr-[50px]' }} to="/login">Login</NavLink>

                                :
                                <button onClick={logout} className=' w-full text-end pr-[50px]'>Logout</button>
                        }
                        <NavLink to="/cart" className='relative mt-[10px]  w-full flex justify-end pr-[50px]'>
                            <img className='w-[3.3rem]' src="../Frontend_Assets/cart_icon.png" alt="" />
                        
                        </NavLink>
                    </ul>

                </div>

            }

        </nav>
    )
}

export default Navbar