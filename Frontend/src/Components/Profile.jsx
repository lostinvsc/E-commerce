import React from 'react'
import { useContext, useState, useEffect } from 'react'
import Context from '../Context/Context.js'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../Css/Profile.css'
const Profile = () => {
    let value = useContext(Context)
    const [edit, setEdit] = useState(true)
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        const regex = /^[1-9][0-9]{5}$/;
        if (regex.test(data.pincode)) {

            let res = await axios.post("http://localhost:3000/address", data, {
                withCredentials: true
            })
            alert(res.data.message)
            let bdet = value.user;
            bdet.address = data
            value.setUser(bdet)
            setEdit(true)
        } else {
            alert("Pincode in invalid")
        }
    }


    return (
        <div id='prohead' className="relative flex h-screen text-[1.6rem] border bg-gray-200 mx-auto w-[80vw]  gap-[1.5vw]">

            <div id='hello' className="w-[28%] max-w[420px] border flex flex-col">
                <div className='bg-white h-fit w-full flex items-center  p-[10px]'>
                    <div className='w-[18%] rounded-full bg-blue-500 p-[5px] mr-[15px]'>
                        <img className='w-[100%]' src="/Frontend_Assets/user.gif" alt="" />
                    </div>
                    <div className='leading-[18px]'>
                        <p className='text-[1.2rem]'>hello,</p>
                        <p className='text-[1.8rem]'>{value.user.username}</p>
                    </div>
                </div>
                <ul id='empty'  className='bg-white mt-[1.5vw] grow'>

                </ul>
            </div>

            <div id='usdata' className="w-[70%] max-w-[1050px] bg-white p-8 border">
            <div id='animeh' className='bg-white h-fit  w-full flex items-center  p-[10px]'>
                    <div className='w-[50px] rounded-full bg-blue-500 p-[5px] mr-[15px]'>
                        <img className='w-[100%]' src="/Frontend_Assets/user.gif" alt="" />
                    </div>
                    <div className='leading-[18px]'>
                        <p className='text-[1.2rem]'>hello,</p>
                        <p className='text-[1.8rem]'>{value.user.username}</p>
                    </div>
                </div>
                <h2 className="font-bold text-[25px]">User Information</h2>
                <div className="flex items-center mt-[30px] flex-wrap">
                    <label className="block text-gray-500 text-[20px] font-semibold ">Username: &nbsp;</label>
                    <span className="text-[19px]">{value.user.username}</span>
                </div>
                <div className="flex items-center flex-wrap mt-[10px]">
                    <label className="block text-gray-500 text-[20px] font-semibold ">Email: &nbsp;</label>
                    <span className="text-[19px]">{value.user.email}</span>
                </div>
                <div className=" mt-[20px] w-full ">

                    <label className="block text-gray-500 text-[20px] font-semibold ">Address: </label>

                    {
                        value.user.address && edit ?


                            value.user.address.flat ?
                                <ul className='flex flex-col mb-[30px]'>
                                    <li className='flex items-center gap-[10px] font-bold flex-wrap'>Locality :
                                        <span className='font-light'>{value.user.address.locality}</span>
                                    </li>
                                    <li className='flex items-center gap-[10px] font-bold'>Flat No :
                                        <p className='font-light'>{value.user.address.flat}</p>
                                    </li>
                                    <li className='flex items-center gap-[10px] font-bold'>State :
                                        <p className='font-light'>{value.user.address.state}</p>
                                    </li>
                                    <li className='flex items-center gap-[10px] font-bold'>City :
                                        <p className='font-light'>{value.user.address.city}</p>
                                    </li>
                                    <li className='flex items-center gap-[10px] font-bold'>Pincode :
                                        <p className='font-light'>{value.user.address.pincode}</p>
                                    </li>
                                </ul>
                                : <p className='mb-[10px]'>No Address</p>



                            :

                            <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit(onSubmit)}>

                                <input required placeholder="Locality Name" {...register("locality")} className='border rounded-lg p-[5px]' type="text" />
                                <div className='flex gap-[40px]'>
                                    <input required placeholder="Flat no." {...register("flat")} className='border rounded-lg p-[5px]' type="text" />
                                    <input required placeholder="State" {...register("state")} className='border rounded-lg p-[5px]' type="text" />
                                    <input required placeholder="Pincode" {...register("pincode")} className='border rounded-lg p-[5px]' type="text" />
                                </div>
                                <input required placeholder="City" {...register("city")} className='border rounded-lg p-[5px]' type="text" />
                                <div className='flex gap-[30px] mx-auto'>
                                    <input type="submit" value="Save" className='bg-blue-600 w-fit text-white hover:bg-blue-700 py-[5px] px-[10px] rounded-lg cursor-pointer' />

                                    {
                                        !edit &&
                                        <button onClick={() => { setEdit(true) }} className='bg-blue-600 w-fit   text-white hover:bg-blue-700 py-[5px] px-[10px] rounded-lg cursor-pointer h-fit'>Cancel</button>
                                    }
                                </div>

                            </form>
                    }
                    {
                        edit &&
                        <button onClick={() => { setEdit(false) }} className='bg-blue-600 w-fit mx-auto  text-white hover:bg-blue-700 py-[5px] px-[10px] rounded-lg cursor-pointer h-fit'>Edit</button>
                    }

                </div>

            </div>

        </div>
    )
}

export default Profile