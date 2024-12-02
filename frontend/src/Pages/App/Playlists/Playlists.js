import React, { useEffect, useRef, useState } from 'react';
import { playlist, tracks } from '../../../Components/Functions';
import { FaHeart } from 'react-icons/fa';
import { TbPlaylist } from 'react-icons/tb';
import { FiClock } from 'react-icons/fi';
import { FaPlay } from "react-icons/fa";
import { PlaylistTrack } from '../../../Components/Elements/Tracks/Tracks';
import TracksTable from '../../../Components/Elements/Tracks/TracksTable';

function Playlists() {
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

    return (
        <div className='pb-80'>
            <div className=' relative'>
                <div className='bg-gradient-to-b from-gray-500 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                    <div className='flex items-center space-x-4'>
                        <div className='bg-gradient-to-tr from-purple-700 to-white rounded-sm overflow-hidden'> 
                            {playlist?.image 
                                ? 
                                    <img src={playlist?.image ?? "../images/song.jpg"} className='w-40 h-40 rounded-sm' alt="song" />
                                : 
                                    <div className='w-40 h-40 flex items-center justify-center'>
                                        <TbPlaylist size={40} />
                                    </div>
                            }
                        </div>

                        <div>
                            <h2 className='text-sm'> Playlist </h2>
                            <h1 className='text-6xl font-bold mt-4' > {playlist?.title ?? "Playlist title"} </h1>
                            <h2 className=' mt-3 text-ms'> 100 Songs </h2>
                        </div>
                    </div>
                    <div className='flex items-center mb-8 space-x-2'>
                        <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                    </div>
                </div>
                <div ref={nameDivRef} className=' opacity-0 absolute bottom-16'> 0 </div>
            </div>

            <div aria-hidden={!showName} className={`sticky -mt-10 px-12 w-full top-0 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-all flex items-center justify-between ${showName ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className='text-2xl font-bold'> {playlist?.title} </h1>
                
                <div className='flex items-center space-x-2'>
                    <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
                </div>
            </div>


            <TracksTable showName={showName} nameDivRef={nameDivRef} />

            <div className="min-h-screen">
                <ul className='px-12'>
                    {tracks.map((item, key) => (
                        <PlaylistTrack hover={hover} setHover={setHover} data={item} id={key} key={key} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Playlists;
