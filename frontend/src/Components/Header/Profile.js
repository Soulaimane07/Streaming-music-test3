import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Slices/UserSlice'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
    const user = useSelector(state => state.user.data)

    const [open, setOpen] = useState(false)

    const Close = () => {
      setTimeout(() => {
        setOpen(false)
      }, 1000);
    }



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Logout = () => {
      dispatch(logout())
      navigate("/login")
    }

  return (
    <div className=' relative'>
      <button 
        onClick={()=> setOpen(!open)}
        className='flex items-center bg-purple-600 h-12 w-12 justify-center ml-4 hover:bg-opacity-80 rounded-full'
      >
          <h1 className='text-2xl flex items-center font-medium'>{user?.email.charAt(0)}</h1>
      </button>

      {open &&
        <div 
          onMouseLeave={Close}
          className=' absolute rounded-md right-0 bg-zinc-800 mt-2 transition-all overflow-hidden w-52 flex flex-col text-left '
        >
          <Link to={"/profile"} className='hover:bg-zinc-700 transition-all py-3 text-left px-6'> Profile </Link>
          <button className='hover:bg-zinc-700 transition-all py-3 text-left px-6'> Settings </button>
          <hr className=' opacity-40'></hr>
          <button 
            onClick={Logout}
            className='hover:bg-zinc-700 transition-all py-3 text-left px-6'
          > 
            Log out 
          </button>
        </div>
      }
    </div>
  )
}

export default Profile