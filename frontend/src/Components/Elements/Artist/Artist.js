import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Artist({data}) {
    const [display, setDisplay] = useState(false)

  return (
    <Link 
        to={`/artists/${data?.id}`}
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        className='hover:bg-zinc-800 p-2 pb-4 rounded-md transition-all bg-transparent bg-opacity-80 pr-2 overflow-hidden items-center space-x-3  text-left'
    >
        {data?.imageCard 
          ?
            <div style={{ backgroundImage: `url(${data?.imageCard})` }} className='w-40 shadow-lg shadow-zinc-950 relative h-40 mx-auto BGImage rounded-full'>
                <i className={`bg-purple-600 p-4 rounded-full absolute right-3 transition-all duration-300 ease-in-out transform ${display ? "opacity-100 translate-y-28" : "opacity-0 translate-y-32"}`}>
                  <FaPlay size={18} />
                </i>
            </div>
          :  
            <div className='w-40 relative h-40 mx-auto BGImage rounded-full items-center justify-center flex bg-gradient-to-tr from-purple-700 to-purple-300'>
              <FaUser size={40} />
            </div>
        }
        <p className=' text-center mt-2 font-medium'> {data?.name ?? "Artist name"} </p>
    </Link>
  )
}

export default Artist