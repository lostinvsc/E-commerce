import React, { useEffect, useState,useContext } from 'react'
import Item from './Item.jsx'
import '../Css/Related.css'
import Context from '../Context/Context.js'

const RelatedProducts = ({ category }) => {

let value=useContext(Context)


    return (

        <div  id='rhead' className="  m-auto flex flex-col items-center ">
        <h1 id='rpheading' className='text-[5rem] font-bold border-black flex flex-col items-center gap-[10px]'>
            <span>RELATED PRODUCTS</span>
            <div className='w-[200px] bg-black h-[5px] '></div>
        </h1>

        <div id='ritem' className='flex justify-between  w-[100%] mt-[5vw]'>

            {value.all_product.filter((e)=>e.category==category).length>0 &&
                value.all_product.filter((e)=>e.category==category).map((value, index) => {
                    return (

                        <Item key={index} value={value} />
                    )
                })
            }

        </div>
    </div>
    )
}

export default RelatedProducts