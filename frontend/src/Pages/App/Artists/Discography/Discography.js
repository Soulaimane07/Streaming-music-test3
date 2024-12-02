import React, { useEffect, useRef, useState } from 'react'
import { CiClock2 } from "react-icons/ci";
import { artist, tracks } from '../../../../Components/Functions';
import { FaHeart, FaUserAlt } from 'react-icons/fa';
import { ProfileTrack } from '../../../../Components/Elements/Tracks/Tracks';

function Discography() {
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

  return (
    <div className='pb-80'>
        <div className=' relative'>
            <div className='bg-gradient-to-b from-gray-500 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                <div className='flex items-center space-x-4'>
                    <div className='bg-zinc-800 shadow-lg w-40 h-40 overflow-hidden flex items-center justify-center rounded-full'>
                        {!artist?.name ? <FaUserAlt size={40} /> : <img src={artist?.image} /> }
                    </div>
                    <div>
                        <h2 className='text-sm'> Artist </h2>
                        <h1 className='text-6xl font-bold mt-4' > {artist?.name} </h1>
                        <h2 className=' mt-3 text-ms'> {Number(artist?.monthlyListeners || 0).toLocaleString()} Monthly listeners </h2>
                    </div>
                </div>
                <div className='flex items-center mb-8 space-x-2'>
                    <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                </div>
            </div>
            <div ref={nameDivRef} className=' opacity-0 absolute bottom-16'> 0 </div>
        </div>

        <div aria-hidden={!showName} className={`sticky -mt-10 px-12 w-full top-0 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-all flex items-center justify-between ${showName ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className='text-2xl font-bold'> {artist?.name} </h1>
            
            <div className='flex items-center space-x-2'>
                <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
            </div>
        </div>

        <div className='px-12 mt-6 relative'>
            <thead class="text-xs flex text-gray-400 uppercase border-b border-zinc-500">
                <th scope="col" class="px-5 py-3">
                    #
                </th>
                <th scope="col" class="px-6 py-3 w-full text-left">
                    Title
                </th>
                <th scope="col" class="px-6 py-3 w-1/2">
                    Plays
                </th>
                <th scope="col" class="px-5 py-3 flex justify-center">
                    <CiClock2 size={20} />
                </th>
            </thead>
            <ul className='mt-2 space-y-2'>
                {tracks?.map((item,key)=>(
                    <ProfileTrack data={item} id={key} key={key} />
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Discography