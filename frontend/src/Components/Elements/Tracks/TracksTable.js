import React from 'react'
import { FiClock } from 'react-icons/fi'

function TracksTable({showName, type}) {
  return (
    <div 
        aria-hidden={!showName} 
        className={`sticky top-16  z-40  mb-2 text-xs text-gray-400 uppercase border-b bg-zinc-900 border-zinc-600 flex items-stretch transition-colors duration-300 ${
            showName ? 'bg-zinc-800 px-12' : 'bg-transparent mx-12'
        }`}
    >
        <div scope="col" className="px-5 py-3">
            #
        </div>
        <div scope="col" className="py-3 w-full text-left">
            Title
        </div>
        <div scope="col" className={`${type === "album" ? "w-1/3 text-left" : "w-1/4 text-right justify-end"} flex items-center  px-2 `}>
            {type === "album" ? "Album" : "Plays"}
        </div>
        <div scope="col" className="flex w-1/3">
        </div>
        <div scope="col" className="  py-3 w-56 flex justify-center">
            <FiClock size={20} />
        </div>
    </div>
  )
}

export default TracksTable