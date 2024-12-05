import React from 'react'
import { Link } from 'react-router-dom'
import Artist from '../../../Components/Elements/Artist/Artist'
import { useSelector } from 'react-redux'

function Box3() {
    const artists = useSelector(state => state.artists.data)

  return (
    <div className='px-10 mt-16'>
        <div className='mb-6 mt-6 flex justify-between items-baseline'>
            <Link to={"/artists/popular"} className='text-xl font-medium hover:underline'> Popular Artists </Link>
            <Link to={"/artists/popular"} className='hover:underline'> Show all </Link>
        </div>
        <div className=' grid grid-cols-6 gap-6'>
            {artists?.map((item, key)=> (
                key < 6 && <Artist data={item} key={key} />
            ))}
        </div>
    </div>
  )
}

export default Box3