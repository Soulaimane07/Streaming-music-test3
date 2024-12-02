import { useState } from "react"
import { FaPlay } from "react-icons/fa"

import { IoMusicalNotes } from "react-icons/io5";
import { Link } from "react-router-dom";


export const PlaylistTrack = ({data, setHover, hover, id}) => {
    return (
        <button 
            id={id} 
            onMouseEnter={()=> setHover(id)}
            onMouseLeave={()=> setHover(false)}
            className="flex items-center w-full space-x-4 hover:bg-zinc-800 rounded-md py-2"
        >
            <div className='px-6 py-4  text-right w-14 flex items-center'>
              {hover !== id 
                ? <span className='opacity-70 absolute transition-all duration-200'> {id + 1} </span> 
                : <span className='opacity-100 absolute transition-all duration-200'> <FaPlay size={12} /> </span>
              }
            </div>
            <div className='flex space-x-2 px-1 items-center w-full'>
              {data?.image 
                ? <img src={data?.image} className="w-12 rounded-sm" /> 
                : <div className='bg-gradient-to-br from-violet-600 to-violet-200 w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center'> <IoMusicalNotes /> </div>
              }
              <div>
                <p className='font-medium'> {data?.title ?? "Track name"} </p>
                <Link to={`/artists/${data?.artist?.name}`} className=' hover:opacity-100 opacity-60 text-sm hover:underline transition-all'> {data?.artist?.name ?? "Artist name"} </Link>
              </div>
            </div>
            <div className="px-6 py-4 w-2/6 text-left hover:underline transition-all">
              <Link to={`/albums/${data?.album}`} className='hover:underline transition-all opacity-70 hover:opacity-100'> {data?.album ?? "Album name"} </Link>
            </div>
            <div className="px-6 py-4 w-2/12 text-center">
              <p className='opacity-70'> {data?.duration ?? "00:00"} </p>
            </div>
        </button>
    )
}

export const ProfileTrack = ({hover, setHover, data, id}) => {
  return (
    <button
      onMouseEnter={()=> setHover(id)}  
      onMouseLeave={()=> setHover(false)}  
      className='flex items-center w-full space-x-4 hover:bg-zinc-800 px-4 rounded-md py-2'
    >
      <div className='flex items-center justify-center cursor-pointer p-2 rounded transition-colors'>
        {hover !== id 
          ? <span className='opacity-70 absolute transition-all duration-200'> {id + 1} </span> 
          : <span className='opacity-100 absolute transition-all duration-200'> <FaPlay size={12} /> </span>
        }
      </div>


      <div className='flex space-x-2 w-full justify-between items-center '>
        <div className='flex space-x-2 items-center'>
          {data?.image 
            ? <img src={data?.image} className="w-12 rounded-sm" /> 
            : <div className='bg-gradient-to-br from-violet-600 to-violet-200 w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center'> <IoMusicalNotes /> </div>
          }
          <div>
            <p className='font-medium'> {data?.title ?? "Track name"} </p>
            <Link to={`/artists/${data?.artist?.name}`} className=' hover:opacity-100 opacity-60 text-sm hover:underline transition-all'> {data?.artist?.name ?? "Artist name"} </Link>
          </div>
        </div>

        <div>
          <Link to={`/albums/${data?.album}`} className='hover:underline transition-all opacity-70 hover:opacity-100'> {data?.album ?? "Album name"} </Link>
        </div>
        <div>
          <p className='opacity-70'> {data?.duration ?? "00:00"} </p>
        </div>
      </div>
    </button>
  )
}
