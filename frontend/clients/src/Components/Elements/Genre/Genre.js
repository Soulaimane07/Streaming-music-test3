import React from 'react'
import { Link } from 'react-router-dom'

function Genre({data}) {
  return (
    <Link to={`/genres/${data?.id}`} className='h-40 relative hover:scale-105 overflow-hidden px-8 py-6 w-full bg-zinc-700 rounded-md font-bold text-2xl hover:shadow-lg  hover:shadow-zinc-950 transition-all'>
        {data?.name ?? "Genre title"}
        <img className=' absolute -bottom-2 -right-3 shadow-lg shadow-zinc-900 w-36 rotate-12' src={data?.image} alt={data?.name} />
    </Link>
  )
}

export default Genre