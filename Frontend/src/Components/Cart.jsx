import React, { useState, useEffect, useRef } from 'react'

import '../Css/Cart.css'
import axios from 'axios'
import Context from '../Context/Context.js'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
const Cart = () => {
  const [count, setCount] = useState(0)
  const [cartp, setCartp] = useState([])
  let [totalamount, setTotalamount] = useState(0);
  const [coupon, setCoupon] = useState('')
  const [code, setCode] = useState([])
  const [dis, setDis] = useState(false)
  const [fc, setFc] = useState(0)
  let value = useContext(Context);
  const [all_product, setAll_product] = useState([])

  useEffect(() => {
    setAll_product(value.all_product)
  }, [value.all_product])


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  let navigate = useNavigate()

  const getcart = async () => {
    const res = await axios.get(`http://localhost:3000/getcart`, {
      withCredentials: true,
    });
    const resc = await axios.get(`http://localhost:3000/getcode`, {
      withCredentials: true,
    });
    setCode(resc.data)

    setCartp(res.data.reverse())
    value.setCount(res.data.length)

  }

  useEffect(() => {
    getcart();
  }, [])

  useEffect(() => {
    let price = []
    if (cartp.length) {
      for (let i = 0; i < cartp.length; i++) {

        let item = all_product.find((e) => e.id == cartp[i].product_id).new_price * cartp[i].count
        price.push(item)


        if (i == cartp.length - 1) {
          function sum(x, y) {
            return x + y;
          }
          setTotalamount(price.reduce(sum))
        }
      }

    }


  }, [cartp])


  const updatecount = async (uid, pid, count) => {
    let data = { userid: uid, productid: pid, count: count };

    const res = await axios.put(`http://localhost:3000/updatecount`, data, {
      withCredentials: true,
    });
    getcart()
  }

  const deletecart = async (uid, pid) => {
    let data = { userid: uid, productid: pid }
    const res = await axios.put(`http://localhost:3000/deletecart`, data, {
      withCredentials: true,
    });

    getcart()


  }
  const buyall = async () => {
    if (value.user.address.flat) {
      let data = { fc: fc }
      const res = await axios.put(`http://localhost:3000/buyall`, data, {
        withCredentials: true,
      });
      alert(res.data.message)
    } else {
      alert("Add address")
      navigate('/profile')

    }


  }

  const gtpro = (id) => {
    navigate(`/product/${id}`)
  }

  const onSubmit = async (data) => {
    let x = code.find((e) => e.name == data.offer)
    if (x) {
      let disc = x.discount
      setFc(disc)
      let dp = totalamount - (totalamount * disc) / 100
      //  console.log(dp)
      setTotalamount(dp)
      setDis(true)
      alert("Offer applied successfully")
    } else {
      alert("Invali offer")
    }



  }

  return (<>
    <h1 className='text-[24px] font-bold w-fit mx-auto mt-[20px]'>
      My Cart
    </h1>
    <div id='chead' className=' mx-auto text-center'>
      <div id='headings' className='w-[100%] text-[2rem] font-semibold  flex justify-between border-b-2 border-gray-500 pb-[15px]'>
        <span className='w-[10%]  '>Products</span>
        <span className='w-[25%]  '>Title</span>
        <span className='w-[10%]  '>Size</span>
        <span className='w-[10%]  '>Price</span>
        <span className='w-[10%] '>Quantity</span>
        <span className='w-[10%]  '>Total</span>
        <span className='w-[10%]  '>Remove</span>
      </div>

      {
        cartp.length > 0 && all_product.length > 0 ?
          cartp.map((value, index) => {
            let finalp = all_product.find((e) => e.id == value.product_id)


            return (<div key={index}>
              <>
                <div id='prodetail' className='w-[100%] text-[1.4rem] text-gray-700 font-semibold flex justify-between py-[15px] border-b-2 border-gray-500 items-center'>
                  <span className='w-[10%]'><img id='prodimg' onClick={() => { gtpro(value.product_id) }} className='w-[70%] cursor-pointer border' src={finalp.image} alt="" /></span>
                  <span className='w-[25%]  '>{finalp.name}</span>
                  <span className='w-[10%] ml-[20px] '>{value.size}</span>
                  <span className='w-[10%]  '>${finalp.new_price}</span>
                  <span className='w-[10%]  flex pl-[20px]'><span className='w-[30%] flex justify-center items-center'><button disabled={value.count < 2} className={`mr-[10px] border border-black flex items-center  px-[7px] rounded-full ${value.count < 2 ? 'text-gray-500 border-gray-500' : ''}`} onClick={() => { setCount(count - 1); updatecount(value.user_id, value.product_id, value.count - 1) }}>-</button>{value.count} <button className='ml-[10px] rounded-full border border-black flex items-center px-[6px]' onClick={() => { setCount(count + 1); updatecount(value.user_id, value.product_id, value.count + 1) }}>+</button></span></span>
                  <span className='w-[10%]  '>${finalp.new_price * (value.count)}</span>
                  <span id='remove' className='w-[10%] pl-[30px] cursor-pointer'><img onClick={() => { deletecart(value.user_id, value.product_id) }} className='w-[fit]' src="../../public/Frontend_Assets/cart_cross_icon.png" alt="" /></span>
                </div>
                <div id='occard' className='flex justify-center gap-[25px] w-full mx-auto mb-[10px] border p-[5px] pr-[10px]'>
                  <div>
                    <img src={finalp.image} onClick={() => { gtpro(value.product_id) }} className='w-[140px]' alt="" />
                  </div>
                  <div className='text-[1.5rem] flex flex-col '>
                    <p className='font-bold mb-[5px] text-start'>{finalp.name}</p>
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

                    <p className='flex items-center justify-between grow font-semibold'>
                      ${finalp.new_price * (value.count)}
                    </p>
                    <span id='remove' className=' cursor-pointer grow text-center font-semibold text-red-700'>
                     Remove
                    </span>
                  </div>
                </div>
              </>
            </div>
            )
          })

          : <h1 className='font-bold text-[20px] w-fit mx-auto mt-[20px]'>No item added to cart</h1>

      }



      <div id='totalhead' className="total  rounded-lg flex justify-between w-[100%] mt-[100px] z-10 bg-gradient-to-t from-white to-gray-100 px-[20px] py-[20px]">
        <div id='td1' className='w-[40%]  flex flex-col'>
          <h1 className='text-[2.5rem] font-bold mb-[50px]'>
            Cart Total
          </h1>
          <div className='w-[100%]'>
            <div className='w-[100%] flex items-center justify-between text-[1.5rem] text-gray-600'>
              <span>Subtotal</span>
              <span className=''>${totalamount}</span>
            </div>
          </div>
          <hr className='border border-gray-300 my-[10px]' />
          <div className='w-[100%]'>
            <div className='w-[100%] flex items-center justify-between text-[1.5rem] text-gray-600'>
              <span>Shipping Fee</span>
              <span className=''>Free</span>
            </div>
          </div>
          <hr className='border border-gray-300 my-[10px]' />
          <div className='w-[100%]'>
            <div className='w-[100%] flex items-center justify-between text-[1.6rem] '>
              <span>Total</span>
              <span className=''>${totalamount}</span>
            </div>
          </div>
        </div>
        <div id='td2' className='w-[45%] '>
          <p className='text-[1.4rem] text-gray-500 mb-[20px]'>
            If you have a promo code, Enter it here
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='flex w-[85%] text-[2rem] font-light border mx-auto border-gray-600'>
            <input required {...register("offer")} name="offer" placeholder='promo code' className='w-[70%] px-[10px] outline-none text-[1.6rem] bg-gray-200' type="text" />
            <input disabled={dis} className=' cursor-pointer w-[30%] flex items-center justify-center py-[10px] bg-black text-white' type="submit" value="Apply" name="submit" />
          </form>
          <button onClick={buyall} className=' cursor-pointer px-[10px] flex items-center mx-[25%] my-[50px] text-[20px] rounded-lg justify-center py-[5px] mx-auto bg-black text-white'>Buy Now</button>

        </div>
      </div>

    </div>
  </>
  )
}

export default Cart