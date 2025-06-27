import React from 'react'
import { Link } from 'react-router-dom'
import PlaylistBox from '../../../Components/Playlist/PlaylistBox'
import { HeaderSkeleton } from '../../../Components/Elements/Skeletons/Headers'
import { SkeletonHomePlaylists } from '../../../Components/Elements/Skeletons/Playlists'

function Box2({playlists, playlistsLoading}) {
  console.log(playlists);
  
  return (
    <div className='px-10 -mt-6'>
      {(playlists?.length !== 0 | playlistsLoading)
        ?
          <>
            <div className='mb-6 mt-6 flex justify-between items-baseline'>
              {playlistsLoading 
                ? <HeaderSkeleton />
                : 
                  <>
                    <Link className='text-xl font-medium hover:underline'> Made for you </Link>
                    <Link className='hover:underline'> Show all </Link>
                  </>
              }
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {playlistsLoading
                ? <SkeletonHomePlaylists />
                :
                  playlists?.map((item, key)=> (
                    key < 6 && <PlaylistBox data={item} key={key} />
                  ))
              }
            </div>
          </>
        : null
      }
    </div>
  )
}

export default Box2