import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const Edit = (props) => {


    const ref = useRef()
    const add = useRef()
    const [image, setImage] = useState()
    const [file, setFile] = useState()
    const [url, setUrl] = useState()
    const [data, setData] = useState({})
    const [category, setCategory] = useState('kid')
    const [tag1, setTag1] = useState('')
    const [tag2, setTag2] = useState('')
    const [proid,setProid]=useState('')



    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()


    const onSubmit = async (data) => {
        if (!data.name) {
            data.name = props.value.name
        }
        if (!data.old_price) {
            data.old_price = props.value.old_price
        }
        if (!data.new_price) {
            data.new_price = props.value.new_price
        }
   


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
           setUrl(props.value.image)
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
            setData(data.url = url)
            setData(data.pro_id = props.value['_id'])
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


    const senddata = async (data) => {
        let sdata = data

        let res = await axios.put('http://localhost:3000/updateproduct', sdata, {
            withCredentials: true,
        });
        if (res.data.status) {
            alert(res.data.message)

        } else {
            alert("Something went wrong")
        }
    }

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

    return (
        <div className='fixed z-[50] top-[100px] w-[70vw] bg-gray-300 left-[15vw] h-[600px]'>
            <button onClick={() => { props.setEditpop(-1) }} className='absolute top-[-5px] right-[-5px] bg-black rounded-full p-[5px]'>
                <svg className="w-[15px] h-[15px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>


            <form style={{ width: '100%', backgroundColor: 'transparent' }} ref={ref} onSubmit={handleSubmit(onSubmit)}>
                <div className='fill'>
                    <span>Name</span>
                    <input {...register('name')} placeholder={`${props.value.name}`} type="text" name="name" id="name" />
                </div>
                <div className='prices'>
                    <div className='fill'>
                        <span>Old Price</span>
                        <input {...register('old_price')} placeholder={`${props.value.old_price}`} type="text" name="old_price" id="oldprice" />
                    </div>
                    <div className='fill'>
                        <span>New Price</span>
                        <input {...register('new_price')} placeholder={`${props.value.new_price}`} type="text" name="new_price" id="newprice" />
                    </div>
                </div>
                <div className='fill'>
                    <label htmlFor="image"><img id='prodimage' src={`${image ? image : `${props.value.image}`}`} alt="" /></label>
                    <input onChange={(e) => { handleImageChange(e) }} type="file" name="image" id="image" style={{ display: 'none' }} />
                </div>

                <div className='flex items-center gap-[100px]'>
                    <div className='flex items-center gap-[10px]'>

                        <div><span className='font-bold'>Category:</span> {props.value.category}</div>
                        
                    </div>

                    <div className='flex gap-[10px] items-center'>

                        <select onChange={(e) => { setTag1(e.target.value) }} name="tag" id="tag1">
                            <option value="">--</option>
                            <option value="new">New collection</option>
                            <option value="famous">Famous in women</option>
                        </select>

                        <select onChange={(e) => { setTag2(e.target.value) }} name="tag" id="tag2">
                            <option value="">--</option>
                            <option value="new">New collection</option>
                            <option value="famous">Famous in women</option>

                        </select>
                        <div>{props.value.tag[1]}, {props.value.tag[2]} </div>
                    </div>
                </div>
                <div className='flex gap-[40px] mt-[30px]'>

                    <input style={{ backgroundColor: 'transparent' }} ref={add} disabled={isSubmitting} id='add' type="submit" value="Add" />
                    <button style={{ backgroundColor: 'transparent' }} onClick={() => { props.setEditpop(-1) }} id='cancel' >Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default Edit