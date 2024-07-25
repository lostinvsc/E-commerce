import React, { useState, useEffect, useContext } from 'react'
import '../Css/Desc.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const Description = (props) => {

    const [change, setChange] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        data.id = props.our_id;

        const res = await axios.post(`http://localhost:3000/sendreview`, data, {
            withCredentials: true,
        });

        alert(res.data.message)
    
    }



    return (
        <div id='dhead' className="desc mx-auto text-[1.4rem]">
            <div id='heading12' className="heading flex items-center">
                <button id='h1' onClick={() => { setChange(false) }} className={`border border-gray-300 px-[30px] py-[10px] ${change ? 'text-gray-400' : ''}`}>Description</button>
                <button id='h2' onClick={() => { setChange(true) }} className={`border border-gray-300 px-[35px] py-[10px] ${change ? '' : 'text-gray-400'}`}>Reviews</button>
            </div>
            {!change ?
                <div id='dmain' className='text-gray-600 border border-gray-300 px-[40px] py-[30px]'>
                    <p>
                        An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                    </p>
                    <br />
                    <p>
                        E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                    </p>
                </div>
                :
                <div className='w-[100%]'>
                    <ol className='allreviews w-[100%] mb-[50px] border border-gray-600 max-h-[200px] overflow-y-auto'>
                        {
                            props.review.slice(0,10).map((value, index) => {
                                return (
                                    <li key={index} className='mb-[15px]'>
                                       &bull; By: {value.by}
                                        <p className='text-gray-600 w-[100%] pl-[20px]'>
                                            {value.content}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ol>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-[100%]'>
                        <textarea required {...register("review")} className='border border-gray-500 w-[100%] ' placeholder='Write a review' name="review" id="review"></textarea>

                        <input className='px-[10px] py-[5px] bg-blue-600 rounded-lg text-white mt-[20px] cursor-pointer' type="submit" value="Post" />
                    </form>
                </div>
            }
        </div>
    )
}

export default Description