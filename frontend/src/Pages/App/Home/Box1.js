import React from 'react'
import PlaylistHome from '../../../Components/Playlist/PlaylistHome'
import { playlists } from '../../../Components/Functions'
import { FaHeart } from "react-icons/fa6";

function Box1({nameDivRef}) {
  return (
    <div className='min-h-40 pt-40 -mt-20 pb-20 bg-gradient-to-b from-purple-900 to-zinc-900  px-10'>
        <h1 ref={nameDivRef} className='text-3xl font-medium mb-6'> Good evening </h1>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
            {playlists.map((item, key)=> (
              key < 7 &&  <PlaylistHome data={item} key={key} />
            ))}
            <PlaylistHome data={{title: "Favorite songs", icon: <FaHeart size={24} />}} />
        </div>
    </div>
  )
}

export default Box1