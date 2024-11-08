import React from 'react'
import { FiSearch } from "react-icons/fi";


function SearchBar() {
  return (
      <div className='bg-zinc-900 rounded-md overflow-hidden flex-1 flex'>
          <button className='px-3 py-3'> <FiSearch size={20} /> </button>
          <input className='bg-transparent w-full px-2 outline-none' type='search' placeholder='Search music, artist, albums...' />
      </div>
  )
}

export default SearchBar