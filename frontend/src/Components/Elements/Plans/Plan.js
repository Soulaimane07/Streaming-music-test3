import React, { useEffect, useState } from 'react'

function Plan({data}) {
    const [bg, setBg] = useState("")

    useEffect(()=> {
        data?.color === "green" && setBg("bg-emerald-500" )
        data?.color === "blue" && setBg("bg-sky-600" )
        data?.color === "violet" && setBg("bg-purple-600") 
    }, [data])


  return (
    <div className=' text-left px-6 relative overflow-hidden  bg-zinc-800 rounded-md pt-10 pb-4 h-fit flex-1 justify-between'>
        <div className='h-full mt-2'>
            <img src="../images/logo.png" alt='logo' className='w-8 mb-2' />
            <p className={`absolute top-0 left-0 px-6 rounded-br-md py-1 font-medium ${bg}`}> {data?.description} </p>
            <h1 className='text-4xl font-bold'> {data?.name} </h1>
            <h2 className='text-sm opacity-90 mt-1 font-medium'> {data?.description} </h2>
        </div>

        <button className={` transition-all py-3 mt-14 w-full rounded-full ${bg} hover:bg-opacity-60 font-medium`}> Obtenir Premium {data?.name} </button>
    </div>
  )
}

export default Plan