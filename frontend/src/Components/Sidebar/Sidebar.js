import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import { closeDetails } from '../Redux/Slices/MusicSlice';

function Sidebar() {
  const dispatch = useDispatch()

  const music = useSelector(state => state.music.data)
  

  return (
    <div className='w-96 bg-zinc-950 fixed right-0 h-screen top-0  px-4 py-6 pt-14'>
      <button onClick={()=> dispatch(closeDetails())} className=' absolute top-5 opacity-50 hover:opacity-100 transition-all right-4'> <IoClose size={30} /> </button>
        
      <div>
        <div style={{ backgroundImage: `url(${music.musicImage})` }} className='w-full h-72 mb-4 BGImage rounded-md'></div>
        <div className='px-4'>
          <h1 className='text-2xl font-bold'> {music.musicName} </h1>
          <h2 className='opacity-80'> {music.artists.name} </h2>
        </div>
      </div>

      <button className='mt-6 flex items-center space-x-4 hover:bg-slate-300 opacity-60 hover:opacity-100 hover:bg-opacity-20 rounded-md w-full px-2 py-1 transition-all'>
        <div style={{ backgroundImage: `url(${music.artists.image})` }} className='w-14 h-14 BGImage rounded-full'></div>
        <h1 className=' text-md'> {music.artists.name} </h1>
      </button> 
    </div>
  )
}

export default Sidebar