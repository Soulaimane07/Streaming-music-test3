import React from 'react'
import { Link } from 'react-router-dom'
import PlaylistBox from '../../../Components/Playlist/PlaylistBox'

function Box2({playlists}) {
  return (
    <div className='px-10 -mt-6'>
        <div className='mb-6 mt-6 flex justify-between items-baseline'>
            <Link className='text-xl font-medium hover:underline'> Made for you </Link>
            <Link className='hover:underline'> Show all </Link>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {playlists?.map((item, key)=> (
                key < 6 && <PlaylistBox data={item} key={key} />
            ))}
        </div>
    </div>
  )
}

export default Box2