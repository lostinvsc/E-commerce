import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import Context from '../Context/Context'
const Login = () => {
    let navigate = useNavigate();
    let value = useContext(Context)
   

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            
                let req = await axios.post('http://localhost:3000/login', data, {
                    withCredentials: true
                })
                alert(req.data.message)
                if (req.data.count) {
                    value.setCookie(Cookies.get("token"))
                    navigate('/')
               
            }


        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='bg-purple-200 w-[100vw]  min-h-[94vh] flex items-center justify-center'>

            <div style={{ width: 'min(450px , 95vw)', paddingLeft: 'min(36px,4vw)', paddingRight: 'min(36px,4vw)' }} className='flex flex-col pt-[40px] bg-white gap-[30px] rounded-md h-[410px]'>

                <h1 className='font-sans font-semibold text-[2rem]'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[20px] w-[100%] text-[1.8rem] font-light'>
                    <input required {...register('email')} placeholder='Email' type="email" name="email" id="email" className='outline-none border-gray-300  border w-[100%] py-[8px] pl-[10px]' />
                    <input required {...register('password')} placeholder='Password' type="password" name="password" id="password" className='outline-none border-gray-300  border w-[100%] py-[8px] pl-[10px]' />
                    <input required disabled={isSubmitting} type="submit" value="Continue" className='bg-red-600 w-[100%] py-[8px] text-white cursor-pointer' />

                </form>
                <div>
                    <p className='text-[1.3rem] text-gray-500'>Don't have an Account? <Link className='underline text-red-600' to='/signup'>SignUp</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Login