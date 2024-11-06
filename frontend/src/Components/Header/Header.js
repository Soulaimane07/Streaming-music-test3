import React from 'react'
import SearchBar from './SearchBar'
import Profile from './Profile'

function Header() {
  return (
    <div className='w-full justify-end flex absolute top-6 right-4'>
      <div className='flex items-center w-2/4'>
        <SearchBar />
        <Profile />
      </div>
    </div>
  )
}

export default Header