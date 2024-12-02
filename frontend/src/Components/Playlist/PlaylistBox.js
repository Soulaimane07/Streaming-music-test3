import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { play } from '../Redux/Slices/MusicSlice';
import { TbPlaylist } from "react-icons/tb";
import { Link } from 'react-router-dom';


function PlaylistBox({data}) {
    const dispatch = useDispatch()

    const [display, setDisplay] = useState(false)


  return (
    <Link 
        to={`/playlists/${data.title}`}
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        onClick={()=> dispatch(play())} 
        className='p-2 pb-4 hover:bg-zinc-800 rounded-md transition-all bg-transparent bg-opacity-80 pr-2 overflow-hidden items-center space-x-3  text-left'
    > 
        <div className=' relative mb-2'>
            {data?.image 
              ? <img src={data?.image} className='w-40 h-40 rounded-sm' alt="song" />
              : <div className='w-40 h-40 flex items-center justify-center bg-gradient-to-tr from-purple-700 to-white rounded-sm'>
                  <TbPlaylist size={40} />
                </div>
            }
            {display && <i className=' absolute bottom-3 shadow-md drop-shadow-lg  right-3 transition-all bg-purple-600 p-4 rounded-full' > <FaPlay size={16} /> </i>}
        </div>
        <p> {data?.title ?? "Playlist title"} </p>
    </Link>
  )
}

export default PlaylistBox