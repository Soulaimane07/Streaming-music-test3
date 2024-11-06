import React from 'react'
import PlaylistHome from '../../../Components/Playlist/PlaylistHome'

function Box1() {
    const playlists = [1,2,3,4,5,6,7,8]

  return (
    <div className='h-80 bg-gradient-to-b from-purple-900 to-black pt-20 px-10'>
        <h1 className='text-3xl font-medium mb-6'> Good evening </h1>
        <div className=' grid grid-cols-4 gap-3'>
            {playlists.map((item, key)=> (
                <PlaylistHome key={key} />
            ))}
        </div>
    </div>
  )
}

export default Box1