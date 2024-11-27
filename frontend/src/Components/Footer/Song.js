import React from 'react'
import { FaHeart } from "react-icons/fa6";

function Song({music}) {
  return (
    <div className='flex items-center space-x-20 w-full'>
      <div className='flex items-center space-x-3'>
        <img src={music.musicImage} alt='song' className='w-14 rounded-md' />

        <div>
            <h1 className='mb-0.5 opacity-80 text-md font-medium'> {music.musicName} </h1>
            <h2 className=' opacity-50 text-xs'> {music.artists.name} </h2>
        </div>
      </div>

      <button className='hover:text-red-600 transition-all'> <FaHeart size={20} /> </button>
    </div>
  )
}

export default Song