import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt } from "react-icons/fa";
import Artist from '../../../Components/Elements/Artist/Artist';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiEditCircleLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../Components/Redux/Slices/UserSlice';
import { GetTop, PageTitle, tracks } from '../../../Components/Functions';
import PlaylistBox from '../../../Components/Playlist/PlaylistBox';
import { ProfileTrack } from '../../../Components/Elements/Tracks/Tracks';
import Footer2 from '../../../Components/Footer2/Footer2';


function Profile() {
    useEffect(()=> {
        GetTop()
    }, [])

    const user = useSelector((state) => state.user.data);
    PageTitle(user?.name)

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







    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Logout = () => {
      dispatch(logout())
      navigate("/login")
    }


    const [hover, setHover] = useState(false);


    const artists = useSelector((state)=> state.artists.data)
    const playlists = useSelector((state)=> state.playlists.data)



    return (
        <div className='flex-1 relative '>
            <div className='pb-40  min-h-screen'>
                <div className=' relative'>
                    <div className='bg-gradient-to-b from-violet-800 to-zinc-900 w-full h-72  flex items-end pb-14 justify-between px-12'>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-zinc-600 shadow-lg w-40 h-40 flex items-center justify-center rounded-full'>
                                <FaUserAlt size={40} />
                            </div>
                            <div>
                                <h2 className='text-sm font-medium'> Profile </h2>
                                <h1 className='text-6xl font-bold mt-4' > {user?.name} </h1>
                            </div>
                        </div>
                        <div className='flex items-center mb-8 space-x-2'>
                            <button title='Edit' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <RiEditCircleLine size={50} /> </button>
                            <button onClick={Logout} title='Log out' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <RiLogoutCircleRLine size={50} /> </button>
                        </div>
                    </div>
                    <div ref={nameDivRef} className=' opacity-0 absolute bottom-16'> 0 </div>
                </div>

                <div aria-hidden={!showName} className={`sticky -mt-10 px-12 w-full duration-300 top-0 left-0 bg-zinc-800 shadow-md z-50 py-3 transition-all flex items-center justify-between ${showName ? 'opacity-100' : 'opacity-0'}`}>
                    <h1 className='text-2xl font-bold'> {user?.name} </h1>

                    <div className='flex items-center space-x-2'>
                        <button title='Edit' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <RiEditCircleLine size={26} /> </button>
                        <button onClick={Logout} title='Log out' className=' transition-all hover:bg-violet-600 p-2 rounded-md'> <RiLogoutCircleRLine size={26} /> </button>
                    </div>
                </div>

                <div className='space-y-14 mt-4'>
                    <div>
                        <div className='flex items-center justify-between px-12'>
                            <div>
                                <Link to={"/top/tracks"} className='text-xl font-bold hover:underline'> Top tracks this month </Link>
                                <p className='text-sm opacity-50'> Only visible for you </p>
                            </div>
                            <Link to={"/top/tracks"} className='text-sm font-medium hover:underline'> Show all </Link>
                        </div>
                        <ul className='px-12 mt-6 space-y-2'>
                            {tracks?.map((item,key)=>(
                                key < 5 && <ProfileTrack hover={hover} setHover={setHover} data={item} id={key} key={key} />
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className='flex items-center justify-between px-12'>
                            <div>
                                <Link to={"/top/artists"} className='text-xl font-bold hover:underline'> Top artists this month </Link>
                                <p className='text-sm opacity-50 '> Only visible for you </p>
                            </div>
                            <Link to={"/top/artists"} className='text-sm font-medium hover:underline'> Show all </Link>
                        </div>

                        <ul className='px-14 mt-6 justify-between grid grid-cols-6'>
                            {artists?.map((item,key)=>(
                                key < 6 && <Artist data={item} id={key} key={key} />
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h1 className='text-xl font-bold px-12'> Playlists </h1>
                        <ul className='px-14 mt-6 space-x-4 flex'>
                            {playlists?.map((item,key)=>(
                                key < 6 && <PlaylistBox data={item} id={key} key={key} />
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h1 className='text-xl font-bold px-12'> Following </h1>
                        <ul className='px-14 mt-6 justify-between grid grid-cols-6'>
                            {artists?.map((item,key)=>(
                                key < 6 && <Artist data={item} id={key} key={key} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer2 />
        </div>
    );
}

export default Profile;
