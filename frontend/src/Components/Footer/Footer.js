import React, { useState } from 'react'
import Song from './Song'
import Controls from './Controls'
import Details from './Details'
import { useSelector } from 'react-redux'

function Footer() {
  const [line, setLine] = useState(0)

  const music = useSelector(state => state.music)
  console.log(music);
  


  return (
    <div className='fixed bottom-0 bg-black w-full pt-5 '>
      {/* <input type='range' onChange={(e)=> setLine(e.target.value)} value={line} className='w-full  absolute -mt-6 bg-transparent rounded-none' /> */}
      
      <div className='pt-0 pb-2 px-8 flex items-stretch justify-between'>
        <Song music={music.data} />
        <Controls />
        <Details />
      </div>
    </div>
  )
}

export default Footer