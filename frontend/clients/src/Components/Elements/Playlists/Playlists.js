import { TbPlaylist } from "react-icons/tb"
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

export const NavbarPlaylist = ({data, hover, setHover}) => {
    return (
        <Link
            onMouseEnter={()=> setHover(data?.title)}
            onMouseLeave={()=> setHover(null)}
            to={data?.icon ? "/playlists/favorite-songs" : `/playlists/${data?.id}`} 
            className={ 
                `w-full items-center flex space-x-2.5 hover:bg-zinc-700 hover:opacity-100 rounded-sm transition-all mb-1 px-2 py-1.5 opacity-60 `
            }
        >
            {hover == data?.title
                ? <div className="bg-zinc-600 w-11 h-11 flex items-center justify-center rounded-sm"> <FaPlay size={12} /> </div> 
                :
                data?.image 
                    ? <div className="bg-zinc-700 w-11 h-11 flex items-center justify-center rounded-sm"><img src={data?.image} className="w-full" /> </div>
                    : <div className="bg-zinc-700 w-11 h-11 flex items-center justify-center rounded-sm"> {data?.icon ? data?.icon : <TbPlaylist size={18} />} </div> 
                
            } 
            <div>
                <p className=" font-medium"> {data?.title ?? "Playlist title"} </p>
                <div className="items-center flex flex-wrap">
                    <p className=" font-normal text-xs flex items-center"> {data?.songs?.length} {data?.songs?.length && "Songs"} </p>
                </div>
            </div>
        </Link>
    )
}