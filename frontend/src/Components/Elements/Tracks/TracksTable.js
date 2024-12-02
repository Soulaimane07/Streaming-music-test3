import React from 'react'
import { FiClock } from 'react-icons/fi'

function TracksTable({showName}) {
  return (
    <div 
        aria-hidden={!showName} 
        className={`sticky top-20  z-40  mb-2 text-xs text-gray-400 uppercase border-b bg-zinc-900 border-zinc-600 flex items-center transition-colors duration-300 ${
            showName ? 'bg-zinc-800 px-12' : 'bg-transparent mx-12'
        }`}
    >
        <th scope="col" className="px-6 py-3 w-10">
            #
        </th>
        <th scope="col" className="px-6 py-3 w-full text-left">
            Title
        </th>
        <th scope="col" className="px-6 py-3  w-2/6 text-left">
            Album
        </th>
        <th scope="col" className="px-6 py-3  w-2/12 text-center flex justify-center items-center">
            <FiClock size={20} />
        </th>
    </div>
  )
}

export default TracksTable