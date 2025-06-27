import React from 'react'
import { FaPlay } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { FiSearch } from 'react-icons/fi';

function PlaylisControlls({data}) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
          <button title={`Play ${data?.title}`} className='bg-violet-500 p-6 rounded-full hover:scale-105 transition-all'> <FaPlay size={22} /> </button>
          <button title={`Shuffle for ${data?.title}`} className='text-zinc-400 hover:text-white px-3 py-4 rounded-full hover:scale-105 transition-all'> <BiShuffle size={30} /> </button>
          <button title={`Download`} className='text-zinc-400 hover:text-white px-3 py-4 rounded-full hover:scale-105 transition-all'> <BsDownload size={30} /> </button>
      </div>

      <div className="bg-zinc-800 w-1/5 rounded-md overflow-hidden flex">
        <button className="px-2 opacity-60 py-2">
          <FiSearch size={16} />
        </button>
        <input
          className="bg-transparent w-full px-1 text-sm outline-none"
          type="search"
          placeholder="Search in playlist"
        />
      </div> 
    </div>
  )
}

export default PlaylisControlls