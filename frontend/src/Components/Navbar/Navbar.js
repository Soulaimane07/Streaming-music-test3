import React from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { IoIosAlbums } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { TbPlaylist } from "react-icons/tb";


import { Link, NavLink } from 'react-router-dom';
import { playlists } from '../Functions';
import { NavbarPlaylist } from '../Elements/Playlists/Playlists';

function Navbar() {
    const library = [
        {
            "title": "Favorite Songs",
            "icon": <FaHeart size={20} />,
            "path":"/favorite-songs"
        },
    ]



    

  return (
    <nav className='w-64 py-6 Scroll bg-zinc-900 rounded-md overflow-y-auto px-4'>
        <Link to={"/"} className='w-full'>
            <img src="../images/logo.png" alt='logo' className='w-16 mx-auto' />
        </Link>

        <div>
            <div className='mt-10'>
                <h1 className='mb-2 px-3 text-sm opacity-60'> LIBRARY </h1>
                <ul>
                    {library.map((item, key) => (
                        <NavLink 
                            to={item.path} 
                            key={key} 
                            className={({ isActive }) => 
                                `items-center flex space-x-2.5 hover:opacity-100 hover:bg-zinc-900 transition-all border-r-4 mb-1 px-3 py-3 ${isActive ? "border-purple-600 transition-all opacity-100" : "transition-all opacity-60 border-transparent"}`
                            }
                        >
                            {item.icon}
                            <p>{item.title}</p>
                        </NavLink>
                    ))}
                </ul>
            </div>

            <div className='mt-10'>
                <div className='mb-2 px-3 text-sm opacity-60 flex items-center justify-between'> 
                    <h1> PLAYLIST </h1>
                    <button> + </button>
                </div>
                <ul>
                    {playlists.map((item, key) => (
                        <NavbarPlaylist data={item} key={key} />
                    ))}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar