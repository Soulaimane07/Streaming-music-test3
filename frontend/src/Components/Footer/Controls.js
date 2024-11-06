import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { pause, play } from '../Redux/Slices/MusicSlice';

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

  return (
    <div className='flex items-center w-full justify-center space-x-4'>
        <button> <FaBackward size={23} /> </button>
        <button className='flex items-center' onClick={()=> dispatch(isplay ? pause() :  play(music))}> 
          {isplay 
            ? <FaPause size={23} />
            : <FaPlay size={23} /> 
          } 
        </button>
        <button> <FaForward size={23} /> </button>
    </div>
  )
}

export default Controls