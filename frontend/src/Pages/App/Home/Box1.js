import React from 'react'
import PlaylistHome from '../../../Components/Playlist/PlaylistHome'
import { useSelector } from 'react-redux'

function Box1() {
    const songs = useSelector(state => state.songs.data)

  return (
    <div className='h-80 bg-gradient-to-b from-purple-900 to-black pt-20 px-10'>
        <h1 className='text-3xl font-medium mb-6'> Good evening </h1>
        <div className=' grid grid-cols-4 gap-3'>
            {songs.map((item, key)=> (
              key < 6 && <PlaylistHome data={item} key={key} />
            ))}
        </div>
    </div>
  )
}

export default Box1