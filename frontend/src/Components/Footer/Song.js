import React from 'react'
import { FaHeart } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { openDetails } from '../Redux/Slices/MusicSlice';

function Song({music}) {
  const dispatch = useDispatch()

  return (
    <div className=' w-full'>
      <div className='w-1/2 flex items-center space-x-5'>
      <button onClick={()=> dispatch(openDetails())} className='flex relative rounded-md overflow-hidden transition-all items-center space-x-3  w-full hover:bg-opacity-20 hover:bg-zinc-300'>
        <img src={music?.imageUrl} alt='song' className='w-14 rounded-md' />

        <div>
            <h1 className='mb-0.5 opacity-80 text-md font-medium'> {music?.name} </h1>
            <h2 className=' opacity-50 text-xs'> {music?.artists?.name} </h2>
        </div>
      </button>

      <button className='hover:text-red-600 transition-all'> <FaHeart size={20} /> </button>
      </div>
    </div>
  )
}

export default Song