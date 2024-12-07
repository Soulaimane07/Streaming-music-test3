import Song from './Song'
import Controls from './Controls'
import Details from './Details'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function Footer() {
  const music = useSelector(state => state.music)
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0); // Slider progress

  return (
    <div className=' bottom-0 bg-black w-full pt-2 pb-2 '>
      <div className='py-1 px-8 flex items-stretch justify-between'>
        <Song music={music.data} />
        <Controls music={music.data} duration={duration} setDuration={setDuration} progress={progress} setProgress={setProgress} />
        <Details duration={duration} progress={progress} />
      </div>
    </div>
  )
}

export default Footer