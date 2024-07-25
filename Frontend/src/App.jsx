import React from 'react'
import Context from './Context/Context'
import Navbar from './Components/Navbar'
import { useState,useEffect,useRef } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Men from './Components/Men'
import Women from './Components/Women'
import Kids from './Components/Kids'
import Cart from './Components/Cart'
import Login from './Components/Login'
import Shop from './Components/Shop'
import Signup from './Components/Signup'
import Cookies from 'js-cookie'
import Product from './Cards/Product.jsx'
import Order from './Components/Order.jsx'
import Profile from './Components/Profile.jsx'
import axios, { all } from 'axios';
const App = () => {
const [count, setCount] = useState()
const [cookie, setCookie] = useState('')
const [user,setUser]=useState({});
const [address,setAddress]=useState({});


  const router=createBrowserRouter([
    {
path:'/men',
element:<>  <Navbar/><Men/></>
    },
    {
path:'/women',
element:<>  <Navbar/><Women/></>
    },
    {
path:'/kids',
element:<>  <Navbar/><Kids/></>
    },
    {
path:'/cart',
element:<>  <Navbar/><Cart/></>
    },
    {
path:'/order',
element:<>  <Navbar/><Order/></>
    },
    {
path:'/login',
element:<>  <Navbar/><Login/></>
    },
    {
path:'/',
element:<>  <Navbar/><Shop/></>
    },
    {
path:'/signup',
element:<>  <Navbar/><Signup/></>
    },
    {
path:'/profile',
element:<>  <Navbar/><Profile/></>
    },
    {
path:'/product/:id',
element:<>  <Navbar/><Product/></>
    },
  ])


  useEffect(() => {
  const value=Cookies.get("token")
  setCookie(value)
  getlist()
  }, [])



  const [list, setList] = useState([]);
  const [all_product, setAll_product] = useState([])

  const getlist = async () => {
      let res = await axios.get('http://localhost:3000/getlist')
      setList(res.data)
      
  }
  useEffect(() => {

      if (list.length > 0) {
          let all = list.filter((e) => e.tag[0] == "all")
          setAll_product(all)
      }

  }, [list])
  

  return (

 <Context.Provider value={{cookie:cookie , setCookie:setCookie,count:count,setCount:setCount,user:user,setUser:setUser,address:address,setAddress:setAddress,all_product}} >

        <RouterProvider router={router} />

 </Context.Provider>

  )
}

export default App