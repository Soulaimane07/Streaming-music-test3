import React, { useState, useEffect, useRef } from 'react';
import { GetTop } from '../../../../Components/Functions';
import { FaUserAlt } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { ArtistTrack } from '../../../../Components/Elements/Tracks/Tracks';
import { ArtistAlbum } from '../../../../Components/Elements/Albums/Album';
import { useDispatch, useSelector } from 'react-redux';
import { getArtist } from '../../../../Components/Redux/Slices/ArtistsSlice';
import Spinner from '../../../../Components/Spinner/Spinner';


function Artist() {


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

    const [songs, setSongs] = useState(5)
    const [hover, setHover] = useState(null)





    const {id} = useParams()
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getArtist(id));
    }, [id, dispatch]);
    
    const artist = useSelector((state)=> state.artists)
    GetTop(`${artist?.artist?.name} - artist`)
    

    const music = useSelector(state => state.music)
    

  return (
    <>
        <div className=' relative'>
            <div 
                style={{ backgroundImage: `url(${artist?.artist?.imageBg})` }} 
                //   bg-gradient-to-b from-gray-500 to-zinc-900
                className=' bg-cover w-full h-80 pt-72  flex object-cover BG items-end pb-14 justify-between px-12'
            >
                <div className='flex items-center space-x-4'>
                    <div>
                        <h2 className='text-sm font-medium'> Artist </h2>
                        <h1 className='text-6xl font-bold mt-4' > {artist?.artist?.name} </h1>
                        <h2 className=' text-ms font-medium opacity-70 mt-4'> {Number(artist?.artist?.monlis || 0).toLocaleString()} Monthly listeners </h2>
                    </div>
                </div>
                <div className='flex items-center mb-8 space-x-2'>
                    <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                </div>
            </div>
            <div ref={nameDivRef} className=' opacity-0 absolute bottom-16'> 0 </div>
        </div>

        <div aria-hidden={!showName} className={`sticky -mt-10 px-12 w-full top-0 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-opacity duration-300 flex items-center justify-between ${showName ? 'opacity-100' : 'opacity-0'}`}>
            <div className='flex items-center space-x-4'>
                <div className='bg-zinc-600 w-14 h-14 overflow-hidden flex items-center justify-center rounded-full'>
                    {!artist?.artist?.imageBg ? <FaUserAlt size={20} /> : <img src={artist?.artist?.imageCard} className='w-full h-full object-cover' /> }
                </div>
                <h1 className='text-2xl font-bold'> {artist?.artist?.name} </h1>
            </div>
            
            <div className='flex items-center space-x-2'>
                <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
            </div>
        </div>

        <div className='min-h-screen space-y-14 mt-4  pb-80'>
            {
                artist?.loading 
                ?
                    <div className='flex items-center justify-between px-12'>
                        <Spinner />
                    </div>
                :
            artist?.artist?.artistSongs?.length ?
            <div>
                <h1 className='text-xl font-bold px-12 mb-4'> Popular </h1>
                <ul className='px-12 mt-6 space-y-2 relative'>
                    {artist?.artist?.artistSongs?.map((item,key)=>(
                        key < songs && <ArtistTrack data={item} id={key} key={key} hover={hover} setHover={setHover} music={music} />
                    ))}
                </ul>
                {artist?.artist?.artistSongs?.length >= 10 && <button onClick={()=> setSongs(songs === 10 ? songs-5 : songs+5)} className='px-12 mt-8 opacity-50 transition-all hover:opacity-100'> {songs === 10 ? "See Less" : "See More"} </button>}
            </div>
            : null
            }

            {
                    artist?.artist?.albums?.length 
                        ?
                            <div>
                                <div className='flex items-center justify-between px-12'>
                                    <Link to={"discography"} className='text-xl font-bold hover:underline'> Discography </Link>
                                    <Link to={"discography"} className='text-sm font-medium hover:underline'> Show all </Link>
                                </div>
                                <ul className='px-12 mt-6 space-x-4 flex'>
                                    {artist?.artist?.albums?.map((item,key)=>(
                                        key < 6 && <ArtistAlbum data={item} id={key} key={key} />
                                    ))}
                                </ul>
                            </div>
                        : null
            }
            
        </div>
    </>
  )
}

export default Artist