import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { FaPlay, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { FaPause, FaCirclePlay  } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { pause, play } from '../Redux/Slices/MusicSlice';
import { useState } from "react";

function Controls() {
    const dispatch = useDispatch()
    const isplay = useSelector(state => state.music.isPlaying)

    const music = {
      musicName: "Euphoria",
      musicImage: '../images/song.jpg',
      artists: {
        image: '../images/singer.jpg',
        name: "Kendrick Lamar"
      }
    }

  const [line, setLine] = useState(0)


  return (
    <div className='w-full flex flex-col'>
      <div className="flex items-center w-full justify-center space-x-4">
        <button> <FaBackward size={20} /> </button>
        <button className='flex items-center' onClick={()=> dispatch(isplay ? pause() :  play(music))}> 
          {isplay 
            ? <FaPauseCircle size={34} />
            : <FaCirclePlay size={34} /> 
          } 
        </button>
        <button> <FaForward size={20} /> </button>
      </div>

      <input type='range' onChange={(e)=> setLine(e.target.value)} value={line} className='w-full h-1 mt-2 bg-transparent rounded-none' />
    </div>
  )
}

export default Controls