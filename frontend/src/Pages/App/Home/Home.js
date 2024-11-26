import React from 'react'
import Header from '../../../Components/Header/Header'
import Box1 from './Box1'
import Box2 from './Box2'
import Box3 from './Box3'

function Home() {
  return (
    <div className='flex text-white'>

      <main className='flex-1 relative pb-60'>
        <Header />
        <Box1 />
        <Box2 />
        <Box3 />
      </main>
    </div>
  )
}

export default Home