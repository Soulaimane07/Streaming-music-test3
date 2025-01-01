import { FaPlay } from "react-icons/fa"

import { IoMusicalNotes } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { pause, play } from "../../Redux/Slices/MusicSlice";
import { useEffect, useRef, useState } from "react";


export const PlaylistTrack = ({data, setHover, hover, id, music}) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const audioRef = useRef(null);

  // Extract and format duration when metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Format duration into MM:SS
  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };


  const playing = music?.isPlaying
  const Choosen = music?.data?.id === data?.id

    return (
      <button
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(false)}
        className='flex items-center w-full space-x-4 hover:bg-zinc-800 px-4 rounded-md py-2'
      >
        <div className={` ${Choosen ? " text-violet-400" : " text-white"} flex items-center justify-center cursor-pointer p-2 rounded transition-colors relative`}>
        {playing & Choosen
          ?
          <button
            onClick={() => dispatch(pause())}
            className="w-16 object-cover absolute  -top-8"
          >
            <img src="../images/playing.gif" className="w-full h-full   " />
          </button>
          :
        hover !== id ? (
          <button 
            onClick={() => dispatch(play(data))}
            className="opacity-70 absolute transition-all duration-200"
          >
            {id + 1}
          </button>
        ) : (
          <button 
            onClick={() => dispatch(play(data))}
            className="w-10  flex justify-center items-center h-12 absolute transition-all"
          >
            <FaPlay size={12} />
          </button>
        )}
        </div>

        <div className='flex space-x-2 w-full justify-between items-center '>
          <div className='flex space-x-2 items-center w-full'>
            {data?.imageUrl 
              ? <img src={data?.imageUrl} className="w-12 rounded-sm" /> 
              : <div className='bg-gradient-to-br from-violet-600 to-violet-200 w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center'> <IoMusicalNotes /> </div>
            }
            <div>
              <p className='font-medium'> {data?.name ?? "Track name"} </p>
              <Link to={`/artists/${data?.artist?.name}`} className=' hover:opacity-100 opacity-60 text-sm hover:underline transition-all'> {data?.artist?.name ?? "Artist name"} </Link>
            </div>
          </div>

          <div className="w-1/3 text-left">
            <Link to={`/albums/${data?.album}`} className='hover:underline transition-all opacity-70 hover:opacity-100'> {data?.album ?? "Album name"} </Link>
          </div>
          <div className=" flex w-1/3 items-center justify-end">
                <button className={`${hover === id  ? "opacity-100" : "opacity-0"} duration-300 transition-opacity text-green-500`}> <FaCircleCheck size={20} /> </button>
                <button className={`${hover === id  ? "opacity-100" : "opacity-0"} duration-300 transition-opacity`}> <IoIosAddCircleOutline size={20} /> </button>
          </div>
          <div className="w-40">
            <p className="opacity-70">{formatDuration(duration)}</p>
            <audio
              className="hidden"
              ref={audioRef}
              src={data?.audioUrl}
            ></audio>
          </div>
        </div>
      </button>
    )
}

export const ProfileTrack = ({hover, setHover, data, id}) => {
  const dispatch = useDispatch()

  return (
    <button
      onMouseEnter={()=> setHover(id)}  
      onMouseLeave={()=> setHover(false)}  
      onClick={()=> dispatch(play(data))}
      className='flex items-center w-full space-x-4 hover:bg-zinc-800 px-4 rounded-md py-2'
    >
      <div className='flex items-center justify-center cursor-pointer p-2 rounded transition-colors'>
        {hover !== id 
          ? <span className='opacity-70 absolute transition-all duration-200'> {id + 1} </span> 
          : <span className='opacity-100 absolute transition-all duration-200'> <FaPlay size={12} /> </span>
        }
      </div>


      <div className='flex space-x-2 w-full justify-between items-center '>
        <div className='flex space-x-2 items-center'>
          {data?.image 
            ? <img src={data?.image} className="w-12 rounded-sm" /> 
            : <div className='bg-gradient-to-br from-violet-600 to-violet-200 w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center'> <IoMusicalNotes /> </div>
          }
          <div>
            <p className='font-medium'> {data?.name ?? "Track name"} </p>
            <Link to={`/artists/${data?.artist?.name}`} className=' hover:opacity-100 opacity-60 text-sm hover:underline transition-all'> {data?.artist?.name ?? "Artist name"} </Link>
          </div>
        </div>

        <div>
          <Link to={`/albums/${data?.album}`} className='hover:underline transition-all opacity-70 hover:opacity-100'> {data?.album ?? "Album name"} </Link>
        </div>
        <div>
          <p className='opacity-70'> {data?.duration ?? "00:00"} </p>
        </div>
      </div>
    </button>
  )
}


export const ArtistTrack = ({ hover, setHover, data, id, music }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const audioRef = useRef(null);

  // Extract and format duration when metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Format duration into MM:SS
  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const playing = music?.isPlaying
  const Choosen = music?.data?.id === data?.id


  return (
    <div
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(false)}
      className={`flex items-center w-full space-x-4 hover:bg-zinc-800 px-4 rounded-md py-2`}
    >
      <div className={` ${Choosen ? " text-violet-400" : " text-white"} flex items-center justify-center cursor-pointer p-2 rounded transition-colors relative`}>
        {playing & Choosen
          ?
          <button
            onClick={() => dispatch(pause())}
            className="w-16 object-cover absolute  -top-8"
          >
            <img src="../images/playing.gif" className="w-full h-full   " />
          </button>
          :
        hover !== id ? (
          <button 
            onClick={() => dispatch(play(data))}
            className="opacity-70 absolute transition-all duration-200"
          >
            {id + 1}
          </button>
        ) : (
          <button 
            onClick={() => dispatch(play(data))}
            className="w-10  flex justify-center items-center h-12 absolute transition-all"
          >
            <FaPlay size={12} />
          </button>
        )}
      </div>

      <div className="flex space-x-2 w-full justify-between items-center">
        <div className="flex space-x-2 items-center w-full">
          {data?.image || data?.imageUrl ? (
            <img
              src={data?.image || data?.imageUrl}
              className="w-12 rounded-sm"
            />
          ) : (
            <div className="bg-gradient-to-br from-violet-600 to-violet-200 w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center">
              <IoMusicalNotes />
            </div>
          )}
          <div>
            <p className={`${Choosen ? " text-violet-500" : " text-white"} font-medium`}>{data?.name ?? "Track name"}</p>
          </div>
        </div>

        <div className="w-1/5">
          <p className="opacity-70 text-right">{data?.streams ?? "604,200"}</p>
        </div>

        <div className="flex w-1/3 items-center justify-end">
          <button
            className={`${
              hover === id ? "opacity-100" : "opacity-0"
            } duration-300 transition-opacity text-violet-500`}
          >
            <FaCircleCheck size={20} />
          </button>
          <button
            className={`${
              hover === id ? "opacity-100" : "opacity-0"
            } duration-300 transition-opacity`}
          >
            <IoIosAddCircleOutline size={20} />
          </button>
        </div>

        <div className="w-40 flex justify-center">
          <p className="opacity-70">{formatDuration(duration)}</p>
          <audio
            className="hidden"
            ref={audioRef}
            src={data?.audioUrl}
          ></audio>
        </div>
      </div>
    </div>
  );
};


export const DiscographyTrack = ({hover, setHover, data, id, music}) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const audioRef = useRef(null);

  // Extract and format duration when metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Format duration into MM:SS
  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };


  const playing = music?.isPlaying
  const Choosen = music?.data?.id === data?.id

  return (
    <div
      onMouseEnter={()=> setHover(id)}  
      onMouseLeave={()=> setHover(false)} 
      className='flex items-center w-full space-x-4 hover:bg-zinc-800 px-4 rounded-md py-2'
    >
      <div className={` ${Choosen ? " text-violet-400" : " text-white"} flex items-center justify-center cursor-pointer p-2 rounded transition-colors relative`}>
        {playing & Choosen
          ?
          <button
            onClick={() => dispatch(pause())}
            className="w-16 object-cover absolute  -top-8"
          >
            <img src="../../images/playing.gif" className="w-full h-full   " />
          </button>
          :
        hover !== id ? (
          <button 
            onClick={() => dispatch(play(data))}
            className="opacity-70 absolute transition-all duration-200"
          >
            {id + 1}
          </button>
        ) : (
          <button 
            onClick={() => dispatch(play(data))}
            className="w-10  flex justify-center items-center h-12 absolute transition-all"
          >
            <FaPlay size={12} />
          </button>
        )}
      </div>


      <div className='flex space-x-2 w-full justify-between items-center '>
        <div className='flex space-x-2 items-center w-full'>
          <div>
          <p className={`${Choosen ? " text-violet-500" : " text-white"} font-medium`}>{data?.name ?? "Track name"}</p>
            <Link to={`/artists/${data?.artist?.name}`} className=' hover:opacity-100 opacity-60 text-sm hover:underline transition-all'> {data?.artist?.name ?? "Artist name"} </Link>
          </div>
        </div>

        <div className="w-1/5">
          <p className='opacity-70 text-right'> {data?.streams ?? "604,200"} </p>
        </div>
        <div className=" flex w-1/3 items-center justify-end">
              <button className={`${hover === id  ? "opacity-100" : "opacity-0"} duration-300 transition-opacity text-violet-500`}> <FaCircleCheck size={20} /> </button>
              <button className={`${hover === id  ? "opacity-100" : "opacity-0"} duration-300 transition-opacity`}> <IoIosAddCircleOutline size={20} /> </button>
        </div>
        <div className="w-40 flex justify-center">
          <p className="opacity-70">{formatDuration(duration)}</p>
          <audio
            className="hidden"
            ref={audioRef}
            src={data?.audioUrl}
          ></audio>
        </div>
      </div>
    </div>
  )
}



export const CreatePlaylistTrack = ({data, hover, setHover, music, id}) => {
  const dispatch = useDispatch();

  const playing = music?.isPlaying
  const Choosen = music?.data?.id === data?.id

    return (
      <div
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(false)}
        className='flex items-center w-full space-x-4 hover:bg-zinc-800 px-4 rounded-md py-2'
      >
        <div className={` ${Choosen ? " text-violet-400" : " text-white"} flex items-center justify-center cursor-pointer p-2 rounded transition-colors relative`}>
          {playing & Choosen
            ?
              <button
                onClick={() => dispatch(pause())}
                className="w-16 object-cover absolute  -top-8"
              >
                <img src="../images/playing.gif" className="w-full h-full   " />
              </button>
            :
              hover !== id ? (
                <button 
                  onClick={() => dispatch(play(data))}
                  className="opacity-70 absolute transition-all duration-200"
                >
                  {id + 1}
                </button>
              ) : (
                <button 
                  onClick={() => dispatch(play(data))}
                  className="w-10  flex justify-center items-center h-12 absolute transition-all"
                >
                  <FaPlay size={12} />
                </button>
              )
          }
        </div>

        <div className='flex space-x-2 w-full justify-between items-center '>
          <div className='flex space-x-2 items-center w-full'>
            {data?.imageUrl 
              ? <img src={data?.imageUrl} className="w-12 rounded-sm" /> 
              : <div className='bg-gradient-to-br from-violet-600 to-violet-200 w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center'> <IoMusicalNotes /> </div>
            }
            <div>
              <p className='font-medium'> {data?.name ?? "Track name"} </p>
              <Link to={`/artists/${data?.artist?.name}`} className=' hover:opacity-100 opacity-60 text-sm hover:underline ml-0 p-0 transition-all'> {data?.artist?.name ?? "Artist name"} </Link>
            </div>
          </div>

          <div className="w-1/3 text-left">
            <Link to={`/albums/${data?.album}`} className='hover:underline transition-all opacity-70 hover:opacity-100'> {data?.album ?? "Album name"} </Link>
          </div>
          <div className=" flex w-1/3 items-center justify-end">
          </div>
          <div className="w-40">
            <button className=" border-2 border-white px-6 py-1 rounded-full hover:bg-white hover:bg-opacity-10 transition-all"> Add </button>
          </div>
        </div>
      </div>
    )
}