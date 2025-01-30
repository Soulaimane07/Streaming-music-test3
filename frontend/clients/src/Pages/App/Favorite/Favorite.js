import React, { useEffect, useRef, useState } from 'react';
import { GetTop, PageTitle, tracks } from '../../../Components/Functions';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { PlaylistTrack } from '../../../Components/Elements/Tracks/Tracks';
import TracksTable from '../../../Components/Elements/Tracks/TracksTable';

import { GoDotFill } from "react-icons/go";
import PlaylisControlls from '../../../Components/Elements/Playlists/PlaylisControlls';
import { useSelector } from 'react-redux';
import Footer2 from '../../../Components/Footer2/Footer2';


function Favorite() {
    useEffect(()=> {
        GetTop()
    }, [])
    PageTitle(`Favorite songs`)


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



    const user = useSelector(state => state.user.data)
    


    return (
        <div className='flex-1 relative '>
            <div className='pb-40 min-h-screen'>
                <div className=' relative'>
                    <div className='bg-gradient-to-b from-gray-500 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-gradient-to-tr from-purple-700 to-white rounded-sm overflow-hidden'> 
                                <div className='w-40 h-40 flex items-center justify-center'>
                                    <FaHeart size={60} />
                                </div>
                            </div>

                            <div>
                                <h2 className='text-sm font-medium'> Playlist </h2>
                                <h1 className='text-6xl font-bold mt-4' > Favorite Songs </h1>
                                <h2 className=' mt-4 opacity-90 text-sm font-medium flex items-baseline space-x-2'> 
                                    <p>{user?.name ?? "Owner"}</p> 
                                    <GoDotFill size={10} /> 
                                    <p className=' opacity-70'> 0 Songs </p>
                                </h2>
                            </div>

                        </div>
                        <div className='flex items-center mb-8 space-x-2'>
                            <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                        </div>
                    </div>
                    <div className='bg-red-6000 mb-10 px-12 w-full'>
                        <PlaylisControlls data={null} />
                    </div>
                    <div ref={nameDivRef} className=' opacity-0  absolute bottom-2 '> 0 </div>
                </div>

                <div aria-hidden={!showName} className={`sticky -mt-16 px-12 w-full -top-1 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-opacity duration-300 flex items-center justify-between ${showName ? 'opacity-100 visiblee' : 'opacity-0 hiddenn'}`}>
                    <div className='flex items-center space-x-2'>
                        <button title={`Play Favorite Songs`} className='bg-violet-500 p-4 rounded-full hover:scale-105 transition-all'> <FaPlay size={13} /> </button>
                        <h1 className='text-2xl font-bold'> Favorite Songs </h1>
                    </div>
                    
                    <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
                </div>


                <TracksTable showName={showName} nameDivRef={nameDivRef} type="album" />

                <div className="relative">
                    <ul className='px-12'>
                        {tracks.map((item, key) => (
                            <PlaylistTrack hover={hover} setHover={setHover} data={item} id={key} key={key} />
                        ))}
                    </ul>
                </div>
            </div>
            <Footer2 />
        </div>
    );
}

export default Favorite;
