import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { play } from '../Redux/Slices/MusicSlice';


function PlaylistBox() {
    const dispatch = useDispatch()

    const [display, setDisplay] = useState(false)

  return (
    <button 
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        onClick={()=> dispatch(play())} 
        className='hover:bg-zinc-900 p-2 pb-4 transition-all bg-transparent bg-opacity-80 rounded-sm pr-2 overflow-hidden items-center space-x-3  text-left'
    > 
        <div className=' relative mb-2'>
            <img src="../images/song.jpg" className='w-full h-52 rounded-sm' alt='song' />
            {display && <button className=' absolute bottom-3 shadow-md drop-shadow-lg  right-3 transition-all bg-purple-600 p-4 rounded-full' > <FaPlay size={16} /> </button>}
        </div>
        <p> Playlist name </p>
    </button>
  )
}

export default PlaylistBox