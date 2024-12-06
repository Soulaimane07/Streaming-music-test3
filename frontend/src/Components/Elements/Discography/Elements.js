import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { TbPlaylist } from 'react-icons/tb'
import Controlls from './Controlls'
import TracksTable from '../Tracks/TracksTable'
import { tracks } from '../../Functions'
import { DiscographyTrack } from '../Tracks/Tracks'
import { Link } from 'react-router-dom'

function Elements({data}) {
    const [hover, setHover] = useState(false)

  return (
        <div className=' relative'>
            <div className='bg-gradient-to-b from-gray-500 rounded-md to-zinc-900 w-full py-6  flex items-end pb-14 justify-between px-6'>
                <div className='flex items-stretch space-x-4'>
                    <div className='bg-gradient-to-tr from-purple-700 to-white rounded-sm overflow-hidden'> 
                        {data?.image 
                            ? 
                                <img src={data?.image ?? "../images/song.jpg"} className='w-36 h-36 rounded-sm' alt="song" />
                            : 
                                <div className='w-36 h-36 flex items-center justify-center'>
                                    <TbPlaylist size={40} />
                                </div>
                        }
                    </div>

                    <div className=' flex flex-col justify-between'>
                        <div>
                            <Link to={`/albums/${data?.id}`} className='text-4xl hover:underline transition-all font-bold '> {data?.title ?? "Playlist title"} </Link>
                            <h2 className=' mt-2 opacity-70 text-sm font-medium flex items-baseline space-x-2'> 
                                <p className=' '> Album </p>
                                <GoDotFill size={10} /> 
                                <p className=' '> {data?.year} </p>
                                <GoDotFill size={10} /> 
                                <p className=' '> {data?.songs} Songs </p>
                            </h2>
                        </div>
                        <div>
                            <Controlls data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TracksTable showName={null} type="plays" />
                <ul className='mt-2 px-12 space-y-2'>
                    {tracks?.map((item,key)=>(
                        <DiscographyTrack data={item} hover={hover} setHover={setHover} id={key} key={key} />
                    ))}
                </ul>
            </div>
        </div>
  )
}

export default Elements