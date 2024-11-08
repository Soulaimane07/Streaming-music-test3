import React from 'react'
import Header from '../../../Components/Header/Header'
import Box2 from './Box2'

function Discover() {
  return (
    <div className='flex text-white'>
      <main className='flex-1 relative pb-60 px-10'>
        <Header />

        <h1 className=' font-medium text-5xl mt-28'> Discover </h1>
        <Box2 />

        {/* <Box1 />
        <Box3 /> */}
      </main>
    </div>
  )
}

export default Discover