import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'
const Order = () => {
  const [list, setList] = useState([]);


  const [list2, setList2] = useState([]);
  const [all_product, setAll_product] = useState([])

  const getlist2 = async () => {
    let res = await axios.get('http://localhost:3000/getlist')
    setList2(res.data)
  }


  useEffect(() => {

    if (list2.length > 0) {
      let all = list2.filter((e) => e.tag[0] == "all")
      setAll_product(all)

    }
  }, [list2])

  const getlist = async () => {
    let res = await axios.get('http://localhost:3000/adminorder')
    setList(res.data)

  }

  useEffect(() => {
    getlist() ;
    getlist2() ;

  }, [])

  const statuschange = async (id) => {
    let c = confirm("Are you sure, this item is delivered?")
    if (c) {
      let data = { order_id: id }
      let res = await axios.put("http://localhost:3000/statuschange", data, {
        withCredentials: true,
      })
      alert(res.data.message)
      getlist()
    }
  }

  return (
    <div id='ohead' className=' px-[10px] fixed overflow-scroll top-[80px] h-[90vh] w-[100vw] '>
      <div id='oheadings' className='w-[100%] text-[1.6rem] font-semibold  flex justify-between border-b-4 border-gray-500 py-[5px]'>
        <span className='w-[7%] border border-gray-800'>Product_id</span>
        <span className='w-[16%] border border-gray-800'>User_id</span>
        <span className='w-[4%] border border-gray-800'>Size</span>
        <span className='w-[50%] border border-gray-800'>Address</span>
        <span className='w-[4%] border border-gray-800'>Count</span>
        <span className='w-[6%] border border-gray-800'>T_amount</span>
        <span className='w-[6%] border border-gray-800'>Pay_type</span>
        <span className='w-[6%] border border-gray-800'>Status</span>
      </div>
      {
        list.length > 0 && all_product.length>0 ?
          list.map((value, index) => {
     

              let myp=all_product.find((e)=>e.id==value.order.product_id)
            
            return (

              <div id='odetail' key={index} className='w-[100%] text-[1.4rem] text-gray-700 font-semibold flex justify-between py-[15px] border-b-2 border-gray-500 items-center'>
                <span className='w-[7%]   border-gray-800'> {value.order.product_id} </span>
                <span className='w-[16%]   border-gray-800'>{value.order.user_id}</span>
                <span className='w-[4%]   border-gray-800 '>{value.order.size}</span>
                <span className='w-[50%]   border-gray-800 '>{value.address.flat}, {value.address.locality}, {value.address.city}, {value.address.state}, {value.address.pincode} </span>
                <span className='w-[4%]   border-gray-800 '>{value.order.count}</span>
                <span id='' className='w-[6%]  border-gray-800'> ${myp.new_price - myp.new_price*value.order.discount/100} </span>
                <span id='' className='w-[6%]  border-gray-800'> COD </span>
                <button id='' onClick={() => { statuschange(value.order._id) }} className='w-[6%] border-gray-800 bg-blue-700 text-white rounded-lg py-[5px]'> TBD </button>
              </div>
            )
          })
          :
          <h1 className='text-[2rem] font-bold mx-auto w-fit mt-[20px]'>No Orders</h1>
      }
    </div>
  )
}

export default Order