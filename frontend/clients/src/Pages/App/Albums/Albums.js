import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GetTop, PageTitle } from '../../../Components/Functions';
import { TbPlaylist } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';
import PlaylisControlls from '../../../Components/Elements/Playlists/PlaylisControlls';
import TracksTable from '../../../Components/Elements/Tracks/TracksTable';
import { ArtistTrack } from '../../../Components/Elements/Tracks/Tracks';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { getAlbum } from '../../../Components/Redux/Slices/AlbumsSlice';
import Footer2 from '../../../Components/Footer2/Footer2';

function Albums() {
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

    const [hover, setHover] = useState(false);



    const {id} = useParams()
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getAlbum(id));
    }, [id, dispatch]);
    
    const album = useSelector((state)=> state.albums.album)
    
    PageTitle(`${album?.title} - Album`)
    



  const music = useSelector(state => state.music)



    return (
        <div className='flex-1 relative '>
            <div className='pb-40 min-h-screen'>
                <div className=' relative'>
                    <div className='bg-gradient-to-b from-purple-900 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-gradient-to-tr from-purple-700 to-white rounded-sm overflow-hidden'> 
                                {album?.image 
                                    ? 
                                        <img src={album?.image} className='w-44 h-44 rounded-sm' alt="song" />
                                    : 
                                        <div className='w-40 h-40 flex items-center justify-center'>
                                            <TbPlaylist size={40} />
                                        </div>
                                }
                            </div>

                            <div>
                                <h2 className='text-sm font-medium'> Album </h2>
                                <h1 className='text-6xl font-bold mt-4' > {album?.title ?? "Album title"} </h1>
                                <h2 className=' mt-4 opacity-90 text-sm font-medium flex items-baseline space-x-2'> 
                                    <Link to={`/artists/${album?.artist?.id}`} className='hover:underline transition-all'>{album?.artist?.name ?? "Artist"}</Link> 
                                    <GoDotFill size={10} className=' opacity-70' /> 
                                    <p className=' opacity-70'> {album?.year} </p>
                                    <GoDotFill size={10} className=' opacity-70' /> 
                                    <p className=' opacity-70'> {album?.songs?.length} Songs </p>
                                </h2>
                            </div>

                        </div>
                        <div className='flex items-center mb-8 space-x-2'>
                            <button title='Follow' className='flex transition-all hover:bg-violet-600 p-2 rounded-md'>  <FaHeart size={50} /> </button>
                        </div>
                    </div>
                    <div className='bg-red-6000 mb-10 px-12 w-full'>
                        {album?.songs?.length ? <PlaylisControlls data={album} /> : null}
                    </div>
                    <div ref={nameDivRef} className=' opacity-0  absolute bottom-2 '> 0 </div>
                </div>

                <div aria-hidden={!showName} className={`sticky -mt-16 px-12 w-full -top-1 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-opacity duration-300 flex items-center justify-between ${showName ? 'opacity-100 visiblee' : 'opacity-0 hiddenn'}`}>
                    <div className='flex items-center space-x-2'>
                        {album?.songs?.length ? <button title={`Play ${album?.title}`} className='bg-violet-500 p-4 rounded-full hover:scale-105 transition-all'> <FaPlay size={13} /> </button> : null}
                        <h1 className='text-2xl font-bold'> {album?.title} </h1>
                    </div>
                    
                    <button title='Follow' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <FaHeart size={26} /> </button>
                </div>

                {album?.songs?.length ? <TracksTable showName={showName} nameDivRef={nameDivRef} type={"plays"} /> : null}

                <div className=" relative">
                    <ul className='px-12'>
                        {album?.songs?.map((item, key) => (
                            <ArtistTrack hover={hover} setHover={setHover} data={item} id={key} key={key} music={music} />
                        ))}
                    </ul>
                </div>
            </div>

            <Footer2 />
        </div>
    );
}

export default Albums