import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Artist({data}) {
    const [display, setDisplay] = useState(false)

  return (
    <Link 
        to={"/artists/120"}
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        className='hover:bg-zinc-800 p-2 pb-4 rounded-md transition-all bg-transparent bg-opacity-80 pr-2 overflow-hidden items-center space-x-3  text-left'
    >
        {data?.image 
          ?
            <div style={{ backgroundImage: `url('../images/singer.jpg')` }} className='w-40 relative h-40 mx-auto BGImage rounded-full'>
                {display && <button className=' absolute bottom-3 shadow-md drop-shadow-lg  right-3 transition-all bg-purple-600 p-4 rounded-full' > <FaPlay size={16} /> </button>}
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