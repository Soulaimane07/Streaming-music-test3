import React from 'react'

function Playlist() {
  return (
    <div className='p-2 pb-4 hover:bg-zinc-800 rounded-md'>
        <div className='w-48 h-48 bg-zinc-500 rounded-sm mb-2'></div>
        <p className='px-1 font-medium text-md hover:underline transition-all'> Playlist title </p>
    </div>
  )
}

export default Playlist