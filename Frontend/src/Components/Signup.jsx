import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import Context from '../Context/Context'
import Policy from '../Cards/Policy.jsx'
const Signup = () => {
    let navigate = useNavigate();
    let value = useContext(Context)
    const [check, setCheck] = useState(false)
    const [policy, setPolicy] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        try {

            if (check) {

                let req = await axios.post('http://localhost:3000/signup', data, {
                    withCredentials: true
                })

                alert(req.data.message)
                if (req.data.count) {
                    value.setCookie(Cookies.get("token"))
                    navigate('/')
                }
            } else {
                alert("To Sign Up, accept our terms and policy")
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (

        <div className='bg-purple-200 w-[100vw]  min-h-[94vh] flex items-center justify-center'>

            <div style={{ width: 'min(450px , 95vw)', paddingLeft: 'min(36px,4vw)', paddingRight: 'min(36px,4vw)' }} className='flex flex-col relative pt-[30px] bg-white gap-[30px] rounded-md h-[470px]'>

                <h1 className='font-sans font-semibold text-[2rem]'>SignUp</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[20px] w-[100%] text-[1.8rem] font-light'>
                    <input required {...register('username', { required: true })} placeholder='Username' type="text" name="username" id="username" className='outline-none border-gray-300  border w-[100%] py-[8px] pl-[10px]' />
                    <input required {...register('email', { required: true })} placeholder='Email' type="email" name="email" id="email" className='outline-none border-gray-300  border w-[100%] py-[8px] pl-[10px]' />
                    <input required {...register('password', { required: true, minLength: { value: 5, message: 'Minimum password length is 5' } })} placeholder='Password' type="password" name="password" id="password" className='outline-none border-gray-300  border w-[100%] py-[8px] pl-[10px]' />
                    {errors.password && <div className='text-[1rem]'>{errors.password.message}</div>}
                    <input disabled={isSubmitting} type="submit" value="Continue" className='bg-red-600 w-[100%] py-[8px] text-white cursor-pointer' />
                </form>
                <div>
                    <p className='text-[1.3rem] text-gray-500'>Already have an Account? <Link className='underline text-red-600' to='/login'>LogIn</Link></p>
                    <p className='text-[1.3rem] text-gray-500 mt-[15px]'><input onChange={() => { setCheck(!check) }} type="checkbox" name="check" id="check" className='mr-[10px]' /> By Continuing, I agree to <span onClick={() => { setPolicy(true) }} className='text-blue-700 cursor-pointer'>terms</span> of use & <span onClick={() => { setPolicy(true) }} className='text-blue-700 cursor-pointer'>privacy policy</span> </p>
                </div>
                {
                    policy &&
                    <Policy policy={policy} setPolicy={setPolicy} />
                }
            </div>

        </div>
    )
}

export default Signup