import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header'
import { useSelector } from 'react-redux';
import { artists, genres, playlists, tracks } from '../../../Components/Functions'
import Artist from '../../../Components/Artist/Artist'
import PlaylistBox from '../../../Components/Playlist/PlaylistBox'
import { ProfileTrack } from '../../../Components/Elements/Tracks/Tracks';



function Search() {
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

    const searchText = useSelector(state => state.searchBox.data)




    

    const [option, setOption] = useState("All")


  return (
    <div className='flex-1 relative pb-60'>
        <Header title={searchText?.toUpperCase()} bg={false} showName={showName} />

        <div>
            <div className={`px-12 mb-10 z-40 -mt-12 transition-all duration-300  ${showName && "sticky top-20 bg-zinc-900 pt-0 pb-2 "}`}>
                <ul className=' space-x-3'>
                    {genres?.map((item,key)=>(
                        <button 
                            key={key}
                            onClick={()=> setOption(item.title)}
                            className={`${option == item.title ? " bg-white text-black hover:bg-zinc-200 " : "bg-zinc-700 hover:bg-zinc-600 "} bg-transparent rounded-2xl px-5 py-1.5 text-sm font-medium transition-all `}
                        > 
                            {item.title} 
                        </button>
                    ))}
                </ul>
            </div>
            
            <div  className='min-h-screen pb-40'>
                <div ref={nameDivRef} className='flex space-x-6 px-12 mt-16 items-stretch'>
                    <div className='w-1/2 overflow-hidden'>
                        <h2 className='text-2xl font-bold mb-4'> Top Result </h2>
                        <div className='bg-zinc-800 w-full h-full rounded-md'>

                        </div>
                    </div>
                    <div className='w-full'>
                        <button onClick={()=>setOption("Songs")} className='text-2xl font-bold mb-4 hover:underline transition-all'> Songs </button>
                        <ul className='space-y-2'>
                            {tracks?.map((item,key)=>(
                                key < 5 && <ProfileTrack data={item} id={key} key={key} />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='px-12 mt-20'>
                    <div className='mb-3 mt-6 flex justify-between items-baseline'>
                        <button onClick={()=>setOption("Artists")} className='text-2xl font-bold hover:underline'> Artists </button>
                    </div>
                    <div className=' grid grid-cols-6 gap-6'>
                        {artists.map((item, key)=> (
                            key < 6 && <Artist data={item} key={key} />
                        ))}
                    </div>
                </div>

                <div className='px-12 mt-20'>
                    <div className='mb-3 mt-6 flex justify-between items-baseline'>
                        <button onClick={()=>setOption("Albums")} className='text-2xl font-bold hover:underline'> Albums </button>
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {playlists.map((item, key)=> (
                            key < 6 && <PlaylistBox data={item} key={key} />
                        ))}
                    </div>
                </div>

                <div className='px-12 mt-20'>
                    <div className='mb-3 mt-6 flex justify-between items-baseline'>
                        <button onClick={()=>setOption("Playlists")} className='text-2xl font-bold hover:underline'> Playlists </button>
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {playlists.map((item, key)=> (
                            key < 6 && <PlaylistBox data={item} key={key} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search