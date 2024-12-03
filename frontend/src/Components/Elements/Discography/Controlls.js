import React from 'react'
import { BiShuffle } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'

function Controlls({data}) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
          <button title={`Play ${data?.title}`} className='bg-violet-500 p-4 rounded-full hover:scale-105 transition-all'> <FaPlay size={12} /> </button>
          <button title={`Shuffle for ${data?.title}`} className='text-zinc-400 hover:text-white p-1 rounded-full hover:scale-105 transition-all'> <BiShuffle size={24} /> </button>
          <button title={`Download`} className='text-zinc-400 hover:text-white p-1 rounded-full hover:scale-105 transition-all'> <BsDownload size={24} /> </button>
      </div>
    </div>
  )
}

export default Controlls