import React from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { IoIosAlbums } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { TbPlaylist } from "react-icons/tb";


import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const pages = [
        {
            "title": "Home",
            "icon": <RiHome3Fill size={20} />,
            "path":"/"
        },
        {
            "title": "Discover",
            "icon": <RiCompassDiscoverFill size={20} />,
            "path":"/discover"
        },
        {
            "title": "Albums",
            "icon": <IoIosAlbums size={20} />,
            "path":"/albums"
        },
        {
            "title": "Podcast",
            "icon": <FaMicrophoneAlt size={20} />,
            "path":"/podcast"
        },
    ]

    const library = [
        {
            "title": "Favorite Songs",
            "icon": <FaHeart size={20} />,
            "path":"/favorite-songs"
        },
    ]

    const playlists = [1,2,3,4,5,6]


    

  return (
    <nav className='fixed top-0 w-64 bg-zinc-950 h-screen overflow-y-scroll scrollbar-hidden pb-40 py-6'>
        <Link to={"/"} className='w-full'>
            <img src="../images/logo.png" alt='logo' className='w-16 mx-auto' />
        </Link>

        <div>
            <div className='mt-4'>
                <ul>
                    {pages.map((item, key) => (
                        <NavLink 
                            to={item.path} 
                            key={key} 
                            className={({ isActive }) => 
                                `items-center flex space-x-2.5 hover:bg-zinc-900 transition-all border-r-4 mb-1 px-8 py-3 ${isActive ? "border-purple-600 transition-all opacity-100" : "transition-all opacity-60  border-transparent"}`
                            }
                        >
                            {item.icon}
                            <p>{item.title}</p>
                        </NavLink>
                    ))}
                </ul>
            </div>

            <div className='mt-10'>
                <h1 className='mb-4 px-6 text-sm opacity-60'> LIBRARY </h1>
                <ul>
                    {library.map((item, key) => (
                        <NavLink 
                            to={item.path} 
                            key={key} 
                            className={({ isActive }) => 
                                `items-center flex space-x-2.5 hover:bg-zinc-900 transition-all border-r-4 mb-1 px-8 py-3 ${isActive ? "border-purple-600 transition-all opacity-100" : "transition-all opacity-60 border-transparent"}`
                            }
                        >
                            {item.icon}
                            <p>{item.title}</p>
                        </NavLink>
                    ))}
                </ul>
            </div>

            <div className='mt-10'>
                <div className='mb-4 px-6 text-sm opacity-60 flex items-center justify-between'> 
                    <h1> PLAYLIST </h1>
                    <button> + </button>
                </div>
                <ul>
                    {playlists.map((item, key) => (
                        <button 
                            to={item.path} 
                            key={key} 
                            className={ 
                                `w-full items-center flex space-x-2.5 hover:bg-zinc-900 transition-all mb-1 px-8 py-3 opacity-60 `
                            }
                        >
                            <TbPlaylist size={20} />
                            <p> Playlist {key+1} </p>
                        </button>
                    ))}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar