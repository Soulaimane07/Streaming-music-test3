import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { TbPlaylist } from 'react-icons/tb'
import { Link } from 'react-router-dom'

export const ArtistAlbum = ({data}) => {
  const [display, setDisplay] = useState(false)

  return (
    <Link
        to={`/albums/${data.title}`}
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        className='p-2 pb-4 hover:bg-zinc-800 rounded-md transition-all bg-transparent bg-opacity-80 pr-2 overflow-hidden items-center space-x-3  text-left'
    > 
        <div className=' relative mb-2'>
            {data?.image 
              ? <img src={data?.image} className='w-40 h-40 rounded-sm' alt="song" />
              : <div className='w-40 h-40 flex items-center justify-center bg-gradient-to-tr from-purple-700 to-white rounded-sm'>
                  <TbPlaylist size={40} />
                </div>
            }
            <i className={`bg-purple-600 p-4 rounded-full absolute right-3 transition-all duration-300 ease-in-out transform ${display ? "opacity-100 -translate-y-14" : "opacity-0 -translate-y-8"}`}>
              <FaPlay size={18} />
            </i>
        </div>
        <p> {data?.title ?? "Playlist title"} </p>
    </Link>
  )
}