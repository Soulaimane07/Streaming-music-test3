import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const user = useSelector(state => state.user.data)

  return (
    <button className='flex items-center bg-purple-600 h-12 w-12 justify-center ml-4 hover:bg-opacity-80 rounded-full'>
        <h1 className='text-2xl flex items-center font-medium'>{user.email.charAt(0)}</h1>
    </button>
  )
}

export default Profile