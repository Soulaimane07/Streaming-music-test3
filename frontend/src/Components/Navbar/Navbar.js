import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa6";


import { Link } from 'react-router-dom';
import { NavbarPlaylist } from '../Elements/Playlists/Playlists';
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';


function Navbar() {
    const [hover, setHover] = useState(false)
    const playlists = useSelector((state)=> state.playlists.data)


  return (
    <nav className='w-64 py-6 Scroll bg-zinc-900 rounded-md overflow-y-auto px-4'>
        <Link to={"/"} className='w-full'>
            <img src="../images/logo.png" alt='logo' className='w-16 mx-auto' />
        </Link>

        <div>
            <div className='mt-10'>
                <div className='mb-2 px-2 pr-1 text-sm opacity-60 flex items-center justify-between'> 
                    <h1 className=' font-medium '> Your Library </h1>
                    <button title='Create a new playlist' className='hover:bg-zinc-700 transition-all flex items-center justify-center p-1.5 rounded-full'> <FaPlus size={16} /> </button>
                </div>
                <ul>
                    <NavbarPlaylist data={{title:"Favorite Songs", icon: <FaHeart size={20} />}} hover={hover} setHover={setHover} />
                    {playlists?.map((item, key) => (
                        <NavbarPlaylist data={item} key={key} hover={hover} setHover={setHover} />
                    ))}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar