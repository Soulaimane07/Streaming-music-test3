import React from 'react'
import { Link } from 'react-router-dom'
import Artist from '../../../Components/Artist/Artist'

function Box3() {
    const playlists = [1,2,3,4,5]

  return (
    <div className='px-10 mt-16'>
        <div className='mb-6 mt-6 flex justify-between items-baseline'>
            <Link className='text-xl font-medium hover:underline'> Popular Artists </Link>
            <Link className='hover:underline'> Show all </Link>
        </div>
        <div className=' grid grid-cols-5 gap-6'>
            {playlists.map((item, key)=> (
                <Artist key={key} />
            ))}
        </div>
    </div>
  )
}

export default Box3