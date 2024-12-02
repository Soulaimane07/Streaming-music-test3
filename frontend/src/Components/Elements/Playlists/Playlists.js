import { useState } from "react"
import { TbPlaylist } from "react-icons/tb"
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";


export const NavbarPlaylist = ({data}) => {
    const [hover, setHover] = useState(false)

    return (
        <Link
            onMouseEnter={()=> setHover(true)}
            onMouseLeave={()=> setHover(false)}
            to={`/playlists/10`} 
            className={ 
                `w-full items-center flex space-x-2.5 hover:bg-zinc-700 hover:opacity-100 rounded-sm transition-all mb-1 px-2 py-1.5 opacity-60 `
            }
        >
            {hover
                ? <div className="bg-zinc-600 w-11 h-11 flex items-center justify-center rounded-sm"> <FaPlay size={12} /> </div> 
                :
                data?.image 
                    ? <img src={data?.image} className="w-11 rounded-sm" /> 
                    : <div className="bg-zinc-700 w-11 h-11 flex items-center justify-center rounded-sm"> <TbPlaylist size={18} /> </div> 
            } 
            <p> {data?.title ?? "Playlist title"} </p>
        </Link>
    )
}

