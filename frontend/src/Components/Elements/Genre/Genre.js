import React from 'react'
import { Link } from 'react-router-dom'

function Genre({data}) {
  return (
    <Link to={`/genres/${data.title}`} className='h-32 px-8 py-6 w-full bg-zinc-700 rounded-md font-bold text-xl hover:shadow-md  hover:shadow-zinc-500 transition-all'>
        {data.title}
    </Link>
  )
}

export default Genre