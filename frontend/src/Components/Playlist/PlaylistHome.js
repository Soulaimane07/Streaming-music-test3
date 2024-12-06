import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';


function PlaylistHome({data}) {
    const [display, setDisplay] = useState(false)

  return (
    <Link 
        to={data?.icon ? "/playlists/favorite-songs" : `/playlists/${data?.id}`} 
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        className='bg-zinc-900 hover:bg-zinc-800 relative transition-all bg-opacity-80 rounded-sm pr-2 overflow-hidden flex items-center space-x-3  text-left'
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

        <i className={`bg-purple-600 p-3 rounded-full absolute right-3 transition-all duration-300 ease-in-out transform ${display ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <FaPlay size={16} />
        </i>
    </Link>
  )
}

export default PlaylistHome