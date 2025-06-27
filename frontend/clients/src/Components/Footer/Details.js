import React, { useState } from 'react'
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeLow } from "react-icons/fa6";

function Details({duration, progress}) {
  const [volume, setVolume] = useState(0)

  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='flex items-center space-x-3 w-full justify-end'>
        <div className='flex items-center space-x-4'>
            <p> 
              {formatDuration(progress)} 
              /
              {formatDuration(duration)} 
            </p>
            
            <div className='flex items-center'>
                {volume === 0 && (<FaVolumeMute size={20} />)}
                {(volume > 0 && volume <= 49) && (<FaVolumeLow size={20} />)}
                {volume >= 50 && (<FaVolumeUp size={20} />)}
            </div>
            
            <input type='range' onChange={(e)=> setVolume(e.target.value)} value={volume} className='h-1' />
        </div>
    </div>
  )
}

export default Details