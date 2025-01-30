import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../Components/Redux/Slices/UserSlice'
import { UserServiceUrl } from '../../Components/Functions'
import Spinner from '../../Components/Spinner/Spinner'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")

    const newUser = {
        "userId": 0,
        "email": email,
        "password": password,
        "name": fullName,
        "profilePictureUrl": ""    
    }


    const [spinner, setSpinner] = useState(false)
    
    const SignupFunction = async (event) => {
        event.preventDefault();
        setSpinner(true)

        axios.post(`${UserServiceUrl}/users`, newUser)
            .then((res)=> {
                if(res.status === 201){
                    console.log(res.data)
                    dispatch(login(res.data))
                    navigate('/')
                    setSpinner(false)
                }
            })
            .catch((err)=> {
                console.error(err);
                setSpinner(false)
            })
    }
    

  return (
    <div className='bg-purple-600 py-20 h-screen flex items-center text-white bg-gradient-to-r from-indigo-400 '>
        <div className='bg-black py-6 pb-12 w-2/5 mx-auto rounded-md'>
            <h1 className='text-center text-4xl font-bold mt-6'> Sign up to <br></br> start listening </h1>

            <form onSubmit={SignupFunction} className='px-32 mt-10 mx-auto text-left'>
                <div className='flex flex-col mb-6'>
                    <label> Email address </label>
                    <input name='email' onChange={(e)=> setEmail(e.target.value)} className='bg-transparent border rounded-md py-2 px-4 mt-1' type="email" />
                </div>
                <div className='flex flex-col mb-6'>
                    <label> Full name </label>
                    <input name='full name' onChange={(e)=> setFullName(e.target.value)} className='bg-transparent border rounded-md py-2 px-4 mt-1' type="text" />
                </div>
                <div className='flex flex-col mb-6'>
                    <label> Passowrd </label>
                    <input name='password' onChange={(e)=> setPassword(e.target.value)} className='bg-transparent border rounded-md py-2 px-4 mt-1' type="password" />
                </div>

                <button className='bg-purple-500 hover:bg-purple-600 transition-all hover:scale-105 hover:shadow-purple-300 w-full mt-4 rounded-full py-3 font-medium'> 
                    {spinner 
                        ?   <Spinner />
                        :   <p> Sign up </p>
                    }
                </button>
            </form>

            <div className='flex items-center justify-center space-x-2 mt-10'>
                <p className='opacity-80'> Already have an account? </p>
                <Link to="/login" className=' underline opacity-80 hover:opacity-100 transition-all'> Log in here </Link>
            </div>
        </div>
    </div>
  )
}

export default Signup