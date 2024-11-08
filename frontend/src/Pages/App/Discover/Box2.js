import React from 'react'
import { Link } from 'react-router-dom'
import PlaylistBox from '../../../Components/Playlist/PlaylistBox'

function Box2() {
    const playlists = [1,2,3,4,5,6]

  return (
    <div className=' mt-16'>
        <div className='mb-6 mt-6 flex justify-between items-baseline'>
            <Link className='text-xl font-medium hover:underline'> Made for you </Link>
            <Link className='hover:underline'> Show all </Link>
        </div>
        <div className=' grid grid-cols-6 gap-3'>
            {playlists.map((item, key)=> (
                <PlaylistBox key={key} />
            ))}
        </div>
    </div>
  )
}

export default Box2