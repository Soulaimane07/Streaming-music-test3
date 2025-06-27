import { FaForward, FaBackward } from "react-icons/fa6";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { pause, play } from '../Redux/Slices/MusicSlice';
import { useEffect, useRef } from "react";

function Controls({ music, setDuration, duration, progress, setProgress }) {
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.music.isPlaying);

  const audioRef = useRef(null); // Reference to the audio element

  // Toggle playback
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(pause());
    } else {
      audioRef.current.play();
      dispatch(play(music));
    }
  };

  // Update progress slider as the song plays
  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);

    if( Math.floor(progress) >=  Math.floor(duration)){
      audioRef.current.pause()
      dispatch(pause());
      setProgress(0)
      audioRef.current.currentTime = 0
    }
  };

  // Handle user seeking
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  // Set total duration once metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  

  return (
    <div className='w-full flex flex-col'>
      <div className="flex items-center w-full justify-center space-x-4">
        <button> 
          <FaBackward size={20} /> 
        </button>
        <button className='flex items-center' onClick={handlePlayPause}> 
          {isPlaying 
            ? <FaPauseCircle size={34} />
            : <FaPlayCircle size={34} />
          } 
        </button>
        <button> 
          <FaForward size={20} /> 
        </button>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src={music?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Progress Bar */}
      <input
        type='range'
        min={0}
        max={duration || 0}
        step="0.1"
        value={progress}
        onChange={handleSeek}
        className='w-full h-1 mt-2 bg-transparent rounded-none'
      />
    </div>
  );
}

export default Controls;
