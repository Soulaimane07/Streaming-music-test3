import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";

function Artist() {
    const [display, setDisplay] = useState(false)

  return (
    <button 
        onMouseEnter={()=> setDisplay(true)} 
        onMouseLeave={()=> setDisplay(false)}
        className='hover:bg-zinc-900 p-2 pb-4 rounded-md transition-all bg-transparent bg-opacity-80 pr-2 overflow-hidden items-center space-x-3  text-left'
    >
        <div style={{ backgroundImage: `url('../images/singer.jpg')` }} className='w-48 relative h-48 mx-auto BGImage rounded-full'>
            {display && <button className=' absolute bottom-3 shadow-md drop-shadow-lg  right-3 transition-all bg-purple-600 p-4 rounded-full' > <FaPlay size={16} /> </button>}
        </div>
        <p className=' text-center mt-2 font-medium'> Artist name </p>
    </button>
  )
}

export default Artist