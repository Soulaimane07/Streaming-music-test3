import Song from './Song'
import Controls from './Controls'
import Details from './Details'
import { useSelector } from 'react-redux'

function Footer() {
  const music = useSelector(state => state.music)

  return (
    <div className=' bottom-0 bg-black w-full pt-2 pb-2 '>
      <div className='py-1 px-8 flex items-stretch justify-between'>
        <Song music={music.data} />
        <Controls />
        <Details />
      </div>
    </div>
  )
}

export default Footer