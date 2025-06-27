import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { GetTop, PageTitle } from '../../../Components/Functions'
import Artist from '../../../Components/Elements/Artist/Artist'
import PlaylistBox from '../../../Components/Playlist/PlaylistBox'
import { ProfileTrack } from '../../../Components/Elements/Tracks/Tracks';
import { getAlbums } from '../../../Components/Redux/Slices/AlbumsSlice';
import { ArtistAlbum } from '../../../Components/Elements/Albums/Album';
import Footer2 from '../../../Components/Footer2/Footer2';



function Search() {
    useEffect(()=> {
        GetTop()
    }, [])
    PageTitle(`Search`)

    const [showName, setShowName] = useState(false);
    const nameDivRef = useRef(null);
    const dispatch = useDispatch()

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


    useEffect(()=> {
        dispatch(getAlbums())
    }, [])

    const searchText = useSelector(state => state.searchBox.searchText)
    const searchData = useSelector(state => state.searchBox.data)
    const genres = useSelector((state)=> state.genres.data)

    const [option, setOption] = useState("All")
    const [hover, setHover] = useState(null)


    console.log(searchData);
    


  return (
    <div className='flex-1 relative '>
        <div className='pb-40 py-2 min-h-screen'>
            <Header title={searchText?.toUpperCase()} bg={false} showName={showName} />

            <div>
                <div className={`px-12 mb-10 z-40 -mt-12 transition-all duration-300  ${showName && "sticky top-20 bg-zinc-900 pt-0 pb-2 "}`}>
                    <ul className=' space-x-3'>
                        {genres?.map((item,key)=>(
                            <button 
                                key={key}
                                onClick={()=> setOption(item?.id)}
                                className={`${option === item?.id ? " bg-white text-black hover:bg-zinc-200 " : "bg-zinc-700 hover:bg-zinc-600 "} bg-transparent rounded-2xl px-5 py-1.5 text-sm font-medium transition-all `}
                            > 
                                {item?.name} 
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
                                {searchData &&
                                    searchData
                                        .filter((item) => item.type === "Song") // Filter only songs
                                        .slice(0, 5) // Select the first 5 songs
                                        .map((item, index) => (
                                        <ProfileTrack
                                            data={item.data}
                                            hover={hover}
                                            setHover={setHover}
                                            id={index} // Use index for unique key
                                            key={index}
                                        />
                                        ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className='px-12 mt-20'>
                        <div className='mb-3 mt-6 flex justify-between items-baseline'>
                            <button onClick={()=>setOption("Artists")} className='text-2xl font-bold hover:underline'> Artists </button>
                        </div>
                        <div className=' grid grid-cols-6 gap-6'>
                            {searchData &&
                                searchData
                                    .filter((item) => item.type === "Artist") // Filter only songs
                                    .slice(0, 6) // Select the first 5 songs
                                    .map((item, index) => (
                                        <Artist
                                            data={item.data}
                                            key={index}
                                        />
                                    ))
                            }
                        </div>
                    </div>

                    <div className='px-12 mt-20'>
                        <div className='mb-3 mt-6 flex justify-between items-baseline'>
                            <button onClick={()=>setOption("Albums")} className='text-2xl font-bold hover:underline'> Albums </button>
                        </div>
                        <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                            {searchData &&
                                searchData
                                    .filter((item) => item.type === "Album") // Filter only songs
                                    .slice(0, 6) // Select the first 5 songs
                                    .map((item, index) => (
                                    <ArtistAlbum
                                        data={item.data}
                                        key={index}
                                    />
                                    ))
                            }
                        </div>
                    </div>

                    <div className='px-12 mt-20'>
                        <div className='mb-3 mt-6 flex justify-between items-baseline'>
                            <button onClick={()=>setOption("Playlists")} className='text-2xl font-bold hover:underline'> Playlists </button>
                        </div>
                        <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                            {searchData &&
                                searchData
                                    .filter((item) => item.type === "Playlist") // Filter only songs
                                    .slice(0, 6) // Select the first 5 songs
                                    .map((item, index) => (
                                        <PlaylistBox
                                            data={item.data}
                                            key={index}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer2 />
    </div>
  )
}

export default Search