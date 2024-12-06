import React, { useEffect, useRef, useState } from 'react'
import { FaHeart, FaUserAlt } from 'react-icons/fa';
import Elements from '../../../../Components/Elements/Discography/Elements';
import { useDispatch, useSelector } from 'react-redux';
import { getArtist } from '../../../../Components/Redux/Slices/ArtistsSlice';
import { useParams } from 'react-router-dom';
import { GetTop } from '../../../../Components/Functions';

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





    const {id} = useParams()
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getArtist(id));
    }, [id, dispatch]);
    
    const artist = useSelector((state)=> state.artists.artist)
    GetTop(`${artist?.name} - Discography`)




  return (
    <div className='pb-80'>
        <div className=' relative'>
            <div 
                style={{ backgroundImage: `url(${artist?.imageBg})` }} 
                //   bg-gradient-to-b from-gray-500 to-zinc-900
                className=' bg-cover w-full h-80 pt-72  flex object-cover BG items-end pb-14 justify-between px-12'
            >
                <div className='flex items-center space-x-4'>
                    <div>
                        <h2 className='text-sm font-medium'> Artist </h2>
                        <h1 className='text-6xl font-bold mt-4' > {artist?.name} </h1>
                        <h2 className=' text-ms font-medium opacity-70 mt-4'> {Number(artist?.monlis || 0).toLocaleString()} Monthly listeners </h2>
                    </div>
                </div>
                <div className='flex items-center mb-8 space-x-2'>
                    <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                </div>
            </div>
            <div ref={nameDivRef} className=' opacity-0 absolute bottom-16'> 0 </div>
        </div>

        <div aria-hidden={!showName} className={`sticky -mt-10 px-12 w-full top-0 left-0 bg-zinc-800 shadow-md z-50 py-1 transition-opacity duration-300 flex items-center justify-between ${showName ? 'opacity-100' : 'opacity-0'}`}>
            <div className='flex items-center space-x-4'>
                <div className='bg-zinc-600 w-14 h-14 overflow-hidden flex items-center justify-center rounded-full'>
                    {!artist?.imageBg ? <FaUserAlt size={20} /> : <img src={artist?.imageCard} className='w-full h-full object-cover' /> }
                </div>
                <h1 className='text-2xl font-bold'> {artist?.name} </h1>
            </div>
            
            <div className='flex items-center space-x-2'>
                <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
            </div>
        </div>

        <div className=' relative px-16 space-y-16'>
            {artist?.albums?.map((item,key)=>(
                <Elements data={item} key={key} />
            ))}
        </div>
    </div>
  )
}

export default Discography