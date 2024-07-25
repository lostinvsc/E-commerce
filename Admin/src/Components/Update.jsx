import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Css/Update.css'
import Edit from './Edit.jsx'
import { CiEdit } from "react-icons/ci";
const Update = () => {
  const [list, setList] = useState([]);
  const [editpop, setEditpop] = useState(-1)

  const getlist = async () => {
    let res = await axios.get('http://localhost:3000/getlist')
    setList(res.data)

  }

  useEffect(() => {
    getlist()
  }, [editpop])

  const editproduct = async (id) => {





  }
  const removeproduct = async (id) => {
    let c = confirm("Do yo really want to remove product")
    if (c) {
      let data = { id: id }
      let res = await axios.put('http://localhost:3000/removeproduct', data, {
        withCredentials: true,
      })

      alert(res.data.message)
      getlist()
    }
  }

  return (
    <>

      <div id='uhead' style={{ height: 'calc(100vh - 100px)' }} className={`relative mx-auto px-[10px] bg-white w-[90%] mt-[20px] overflow-y-auto`}>
        <div id='uheadings' className={`w-[100%] text-[2rem] font-semibold  flex justify-between border-b-2 border-gray-500 py-[5px] `}>
          <span className='w-[12%]  border-gray-800'>Products</span>
          <span className='w-[33%]  border-gray-800'>Title</span>
          <span className='w-[13%]  border-gray-800'>Old_price</span>
          <span className='w-[14.7%]  border-gray-800'>New_price</span>
          <span className='w-[12%]  border-gray-800'>Category</span>
          <span className='w-[12%]  border-gray-800'>Tag</span>
          <span className='w-[12%]  border-gray-800 '>Edit</span>
          <span className='w-[13%]  border-gray-800 '>Remove</span>
        </div>
        {
          list.length > 0 ?
            list.map((value, index) => {

             
              return (
                <div id='prodetail' key={index} className='w-[100%] text-[1.4rem] text-gray-700 font-semibold flex justify-between py-[15px] border-b-2 border-gray-500 items-center'>
                  <span className='w-[12%]   border-gray-800'><img id='prodimg' className='w-[70%] ' src={value.image} alt="" /></span>
                  <span className='w-[35%]   border-gray-800'>{value.name}</span>
                  <span className='w-[13%]   border-gray-800 '>${value.old_price}</span>
                  <span className='w-[14.7%]   border-gray-800 '>${value.new_price}</span>
                  <span className='w-[12%]   border-gray-800 f'>{value.category}</span>
                  <span className='w-[12%]   border-gray-800 f'>{value.tag[0] && value.tag[0]} {value.tag[1] && `,${value.tag[1]}`} {value.tag[2] && `,${value.tag[2]}`} </span>
                  <span id='uedit' className='w-[12%]  uedit '><CiEdit size={25} onMouseEnter={() => { Array.from(document.querySelectorAll(".uedit")).forEach((a) => { a.style.cursor = "pointer" }) }} onClick={() => { editproduct(value.id); setEditpop(index) }} /></span>
                  <span id='remove' className='w-[12%]  cursor-pointer hover:text-blue-700 ' onClick={() => { removeproduct(value.id) }}>Remove</span>
                  {
                    editpop == index &&
                    <Edit value={value} editpop={editpop} setEditpop={setEditpop} />
                  }

                </div>
              )

            })
            :
            <h1 className='text-[2rem] w-fit mx-auto font-bold mt-[20px]'>No Product</h1>
        }


      </div>
    </>
  )
}

export default Update