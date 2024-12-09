import React from 'react'
import { Link } from 'react-router-dom'
import Artist from '../../../Components/Elements/Artist/Artist'
import { useSelector } from 'react-redux'
import { SkeletonHomeArtists } from '../../../Components/Elements/Skeletons/Artists'
import { HeaderSkeleton } from '../../../Components/Elements/Skeletons/Headers'

function Box3() {
    const artists = useSelector(state => state.artists.data)
    const artistsLoading = useSelector(state => state.artists.loadingArtists)

  return (
    <div className='px-10 mt-16'>
        {(artists?.length !== 0 | artistsLoading)
            ?
                <>
                    <div className='mb-6 mt-6 flex justify-between items-baseline'>
                        {artistsLoading 
                            ?
                                <HeaderSkeleton />
                            :
                                <>
                                    <Link to={"/artists/popular"} className='text-xl font-medium hover:underline'> Popular Artists </Link>
                                    <Link to={"/artists/popular"} className='hover:underline'> Show all </Link>
                                </>
                        }
                    </div>
                    <div className=' grid grid-cols-6 gap-6'>
                        {artistsLoading
                            ?
                                <SkeletonHomeArtists />
                            :
                                artists?.map((item, key)=> (
                                    key < 6 && <Artist data={item} key={key} />
                                ))
                        }
                    </div>
                </>
            :   null
        }
    </div>
  )
}

export default Box3