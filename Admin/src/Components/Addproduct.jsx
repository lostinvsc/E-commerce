import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import '../Css/Addproduct.css'
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
const Addproduct = () => {
    const ref = useRef()
    const add = useRef()
    const [image, setImage] = useState()
    const [file, setFile] = useState()
    const [url, setUrl] = useState()
    const [data, setData] = useState({})
    const [category, setCategory] = useState('kid')
    let [tag1, setTag1] = useState('')
    let [tag2, setTag2] = useState('')
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState()


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        setData(data)

        if (file) {
            const data = new FormData();
            data.append("file", file)
            data.append("upload_preset", "instagram")
            data.append("cloud_name", "tuntun")

            let res = await axios.post(`https://api.cloudinary.com/v1_1/tuntun/image/upload/`, data, {
            })
            setUrl(res.data.url)

        } else {
            alert('No image selected')
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);


            };
            reader.readAsDataURL(file);
        } else {
            seterror('Please select a valid image file');
        }

    };

    useEffect(() => {
        if (url) {
            setData(data.category = category)
            setData(data.url = url)

            setData(data.tag1 = tag1)
            setData(data.tag2 = tag2)

            if (data) {
                senddata(data)
            }
            else {
                alert('No data found')
            }
        }
    }, [url])


    useEffect(() => {
        if (isSubmitting) {
            ref.current.style.cursor = 'progress'
            add.current.style.cursor = 'progress'
        }
        else {
            ref.current.style.cursor = 'default'
            add.current.style.cursor = 'default'
        }
    }, [isSubmitting])

    const senddata = async (data) => {
        let sdata = data
        console.log(sdata)
        let res = await axios.post('http://localhost:3000/addproduct', sdata, {
            withCredentials: true,
        });
        if (res.data.status) {
            alert(res.data.message)

        } else {
            alert("Something went wrong")
        }
    }


    return (
        <div className='flex bg-gray-400'>
            <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
                <div className='fill'>
                    <span>Name</span>
                    <input {...register('name')} type="text" name="name" id="name" />
                </div>
                <div className='prices'>
                    <div className='fill'>
                        <span>Old Price</span>
                        <input {...register('old_price')} type="text" name="old_price" id="oldprice" />
                    </div>
                    <div className='fill'>
                        <span>New Price</span>
                        <input {...register('new_price')} type="text" name="new_price" id="newprice" />
                    </div>
                </div>
                <div className='fill'>
                    <label htmlFor="image"><img id='prodimage' src={`${image ? image : '../../Admin_Assets/upload_area.svg'}`} alt="" /></label>
                    <input onChange={(e) => { handleImageChange(e) }} type="file" name="image" id="image" style={{ display: 'none' }} />
                </div>

                <div className='flex items-center gap-[30px]'>

                    <select onChange={(e) => { setCategory(e.target.value) }} name="category" id="category">
                        <option value="kid">Kid</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>

                    </select>

                    <select onChange={(e) => { setTag1(e.target.value) }} name="tag" id="tag1">
                        <option value="">All</option>
                        <option value="new">New collection</option>
                        <option value="famous">Famous in women</option>
                    </select>

                    <select onChange={(e) => { setTag2(e.target.value) }} name="tag" id="tag2">
                        <option value="">All</option>
                        <option value="new">New collection</option>
                        <option value="famous">Famous in women</option>

                    </select>
                </div>

                <input ref={add} disabled={isSubmitting} id='add' type="submit" value="Add" />

            </form>

          
          


        </div>
    )
}

export default Addproduct