import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { play } from '../Redux/Slices/MusicSlice';


function PlaylistHome({data}) {
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
            <div className='bg-gradient-to-tr from-purple-700 to-white'> 
              {!data?.icon 
                ? <img src={data?.image ?? "../images/song.jpg"} className='w-16 h-16 rounded-sm' alt="song" />
                : <div className='w-16 h-16 flex items-center justify-center'>
                    {data?.icon}
                  </div>
              }
            </div>
            <p> {data?.title  ?? "Playlist name"} </p>
        </div>

        {display && <i className=' transition-all bg-purple-600 p-3 rounded-full' > <FaPlay size={16} /> </i>}
    </button>
  )
}

export default PlaylistHome