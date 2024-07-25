import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Code = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const [list, setList] = useState([])

    const getcoupon = async () => {
        let res = await axios.get('http://localhost:3000/getcoupon');
        setList(res.data)
    }

    //     const deletecoupon = async (id) => {
    //    let data={id:id}
    //         let res = await axios.put('http://localhost:3000/deletecoupon', data, {
    //             withCredentials: true,
    //         });
    //         alert(res.data.message)
    //     }

    useEffect(() => {
        getcoupon()
    }, [])


    const onSubmit = async (data) => {

        let res = await axios.post('http://localhost:3000/addcoupon', data, {
            withCredentials: true,
        });

        // alert(res.data.message)
        getcoupon()
    }

    const removecode = async (id) => {
        let data = { id: id }
        let res = await axios.put('http://localhost:3000/removecode', data, {
            withCredentials: true,
        });
        getcoupon()
    }
    return (
        <div className='flex items-center w-[90vw] mx-auto justify-between h-[500px]'>

            <ul className='bg-white text-[1.7rem] w-[50%] h-full border pl-[30px] py-[40px] overflow-y-scroll'>
                {
                    list.length > 0 &&
                    list.map((value, index) => {
                        return (


                            <li key={index} className='flex items-center justify-between border mb-[20px] pr-[20px]'>
                                <div className='flex items-center gap-[40px]' >
                                    <span>
                                        {index + 1}.Code: {value.name}
                                    </span>

                                    <span className=''>
                                        Discount: {value.discount} %
                                    </span>

                                </div>
                                <span onClick={() => { removecode(value._id) }} className='hover:text-blue-700 cursor-pointer text-[1.5rem]' >Remove</span>
                            </li>
                        )
                    })
                }
            </ul>

            <form onSubmit={handleSubmit(onSubmit)} className='border text-[1.5rem] w-[50%] h-full'>

                <input name='name' {...register("name")} required type="text" className='border border-gray-500 p-[7px] rounded-lg ' placeholder='Add Coupon Name' />
                <input name='discount' {...register("discount")} required type="text" className='border border-gray-500 p-[7px] rounded-lg ' placeholder='Set Discount in %' />
                <input type="submit" value="Add" className='w-fit bg-blue-300  px-[15px] py-[5px] rounded-lg' />
            </form>


        </div>
    )
}

export default Code