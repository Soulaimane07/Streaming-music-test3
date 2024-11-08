import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { play } from '../Redux/Slices/MusicSlice';


function PlaylistHome() {
    const dispatch = useDispatch()

    const [display, setDisplay] = useState(false)

  return (
    <button 
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        onClick={()=> dispatch(play())} 
        className='bg-zinc-900 hover:bg-zinc-800 transition-all bg-opacity-80 rounded-sm pr-2 overflow-hidden flex items-center space-x-3  text-left'
    > 
        <div className='flex items-center flex-1 space-x-3'>
            <img src="../images/song.jpg" className='w-16 rounded-sm' alt="song" />
            <p> Playlist name </p>
        </div>

        {display && <button className=' transition-all bg-purple-600 p-3 rounded-full' > <FaPlay size={16} /> </button>}
    </button>
  )
}

export default PlaylistHome