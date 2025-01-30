import React, { useEffect, useRef, useState } from 'react'
import Footer2 from '../Footer2/Footer2'
import { TbPlaylist } from 'react-icons/tb'
import { GetTop, tracks } from '../Functions'
import { GoDotFill } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { CreatePlaylistTrack, PlaylistTrack } from '../Elements/Tracks/Tracks'

function CreatePlaylist() {
    useEffect(()=> {
        GetTop()
    }, [])

    const [showName, setShowName] = useState(false);
    const nameDivRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowName(!entry.isIntersecting); // Show the sticky name when the target div is out of view
            },
            { threshold: 0.8 } // Slightly more responsive
        );

        if (nameDivRef.current) {
            observer.observe(nameDivRef.current);
        }

        return () => {
            if (nameDivRef.current) {
                observer.unobserve(nameDivRef.current);
            }
        };
    }, []);

    const [showRecommended, setShowRecommended] = useState(false);

    const user = useSelector(state => state.user.data)
    const songs = useSelector(state => state.songs.data)
    const music = useSelector(state => state.music)
    const [hover, setHover] = useState(null)
    
    
  return (
    <div className='flex-1 relative '>
        <div className='pb-40 min-h-screen'>
            <div className=' relative'>
                <div className='bg-gradient-to-b from-gray-500 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                    <div className='flex items-center space-x-4'>
                        <div className='bg-gradient-to-tr from-purple-700 to-white rounded-sm overflow-hidden'> 
                            <div className='w-40 h-40 flex items-center justify-center'>
                                <TbPlaylist size={40} />
                            </div>
                        </div>
                        <div>
                            <h2 className='text-sm font-medium'> Playlist </h2>
                            <h1 className='text-6xl font-bold mt-4' > Playlist Title </h1>
                            <h2 className=' mt-4 opacity-90 text-sm font-medium flex items-baseline space-x-2'> 
                                <p>{user?.name}</p> 
                                <GoDotFill size={10} /> 
                                <p className=' opacity-70'> 0 Songs </p>
                            </h2>
                        </div>
                    </div>
                    <div className='flex items-center mb-8 space-x-2'>
                    </div>
                </div>
                <div ref={nameDivRef} className=' opacity-0  absolute bottom-2'> </div>
            </div>

            <div aria-hidden={!showName} className={`sticky -mt-16 px-12 w-full -top-1 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-opacity duration-300 flex items-center justify-between ${showName ? 'opacity-100 visiblee' : 'opacity-0 hiddenn'}`}>
                <div className='flex items-center space-x-2'>
                    <h1 className='text-2xl font-bold'> Playlist </h1>
                </div>
            </div>



            <div className='flex justify-end mt-6 items-end px-12'>
                <button className='hover:underline  transition-all' onClick={()=> setShowRecommended(!showRecommended)}> Recommended songs </button>
            </div>

            <div className='min-h-screenn px-12 -mt-4'>
                {!showRecommended && (
                    <div className=' flex-1'>
                        <p className=' font-medium text-2xl mb-4'>Let's find something for your playlist</p>
                        <div className="bg-zinc-800 w-2/5 rounded-md overflow-hidden flex">
                            <button className="px-3 opacity-60 py-3">
                                <FiSearch size={16} />
                            </button>
                            <input
                                className="bg-transparent w-full px-1 text-sm outline-none"
                                type="search"
                                placeholder="Search for songs"
                            />
                        </div> 
                    </div>
                )}

                {showRecommended && (
                    <>
                        <div className=''>
                            <h2 className='font-medium text-2xl mb-0'> Recommanded </h2>
                            <p className=' opacity-55 text-sm'> Based on your listening </p>
                        </div>
                        <div className="relative">
                            <ul className='mt-6 space-y-2'>
                                {songs?.map((item, key) => (
                                    <CreatePlaylistTrack data={item} id={key} key={key} hover={hover} setHover={setHover} music={music} />
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
        <Footer2 />
    </div>
  )
}

export default CreatePlaylist