import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { playlist, tracks } from '../../../Components/Functions';
import { TbPlaylist } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';
import PlaylisControlls from '../../../Components/Elements/Playlists/PlaylisControlls';
import TracksTable from '../../../Components/Elements/Tracks/TracksTable';
import { ArtistTrack, PlaylistTrack } from '../../../Components/Elements/Tracks/Tracks';
import { FaHeart, FaPlay } from 'react-icons/fa';

function Albums() {
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

    const [hover, setHover] = useState(false);



    const {id} = useParams()
    const user = useSelector(state => state.user.data)


    return (
        <div className='pb-80 '>
            <div className=' relative'>
                <div className='bg-gradient-to-b from-gray-500 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                    <div className='flex items-center space-x-4'>
                        <div className='bg-gradient-to-tr from-purple-700 to-white rounded-sm overflow-hidden'> 
                            {playlist?.image 
                                ? 
                                    <img src={playlist?.image ?? "../images/song.jpg"} className='w-44 h-44 rounded-sm' alt="song" />
                                : 
                                    <div className='w-40 h-40 flex items-center justify-center'>
                                        <TbPlaylist size={40} />
                                    </div>
                            }
                        </div>

                        <div>
                            <h2 className='text-sm font-medium'> Album </h2>
                            <h1 className='text-6xl font-bold mt-4' > {id ?? "Playlist title"} </h1>
                            <h2 className=' mt-4 opacity-90 text-sm font-medium flex items-baseline space-x-2'> 
                                <Link to={`/artists/${playlist?.user}`} className='hover:underline transition-all'>{playlist?.user ?? user?.name}</Link> 
                                <GoDotFill size={10} className=' opacity-70' /> 
                                <p className=' opacity-70'> 2024 </p>
                                <GoDotFill size={10} className=' opacity-70' /> 
                                <p className=' opacity-70'> 100 Songs </p>
                            </h2>
                        </div>

                    </div>
                    <div className='flex items-center mb-8 space-x-2'>
                        <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                    </div>
                </div>
                <div className='bg-red-6000 mb-10 px-12 w-full'>
                    <PlaylisControlls data={playlist} />
                </div>
                <div ref={nameDivRef} className=' opacity-0  absolute bottom-2 '> 0 </div>
            </div>

            <div aria-hidden={!showName} className={`sticky -mt-16 px-12 w-full top-0 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-opacity duration-300 flex items-center justify-between ${showName ? 'opacity-100 visiblee' : 'opacity-0 hiddenn'}`}>
                <div className='flex items-center space-x-2'>
                    <button title={`Play ${playlist?.title}`} className='bg-violet-500 p-4 rounded-full hover:scale-105 transition-all'> <FaPlay size={13} /> </button>
                    <h1 className='text-2xl font-bold'> {playlist?.title} </h1>
                </div>
                
                <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
            </div>


            <TracksTable showName={showName} nameDivRef={nameDivRef} type={"plays"} />

            <div className="min-h-screen relative">
                <ul className='px-12'>
                    {tracks.map((item, key) => (
                        <ArtistTrack hover={hover} setHover={setHover} data={item} id={key} key={key} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Albums