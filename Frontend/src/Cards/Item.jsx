import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Css/Item.css'
const Item = ({ value }) => {
    const ref = useRef();
    let navigate = useNavigate();
    const cpage = () => {
        navigate(`/product/${+value.id}`)
        window.scrollTo(0,0);
    }
    return (
        <div id='item' ref={ref} onClick={cpage} className='w-[24rem]  cursor-pointer text-[1.3rem] hover:scale-[1.05] transition-scale duration-300 mb-[30px]'>
            <div className="image">
                <img className='w-[100%] rounded-md' src={value.image} alt="" />
            </div>
            <p className='my-[10px]'>
                {value.name}
            </p>

            <div className="price flex gap-[10px]">
                <span className="new">
                    ${value.new_price}
                </span>
                <span className="old line-through">
                    ${value.old_price}
                </span>
            </div>
        </div>
    )
}

export default Item