import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGenre } from '../../../Components/Redux/Slices/GenresSlice';
import { GetTop } from '../../../Components/Functions';

function Genres() { 
  const [showName, setShowName] = useState(false);
  const nameDivRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowName(!entry.isIntersecting); // Show the sticky name when the target div is out of view
            },
            { threshold: 0.8 } // Slightly more responsive
        );

        if (nameDivRef.current) {
            observer.observe(nameDivRef.current);
        }

        return () => {
            if (nameDivRef.current) {
                observer.unobserve(nameDivRef.current);
            }
        };
    }, []);





  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getGenre(id))
  }, [id])

  const genre = useSelector((state)=> state.genres.genre)
  GetTop(genre?.name + " - Genre")

  


  return (
    <div className='relative py-2 pb-60'>
        <Header title={genre?.name ?? "Genre title"} bg={true} showName={showName} />

        <>
          <div ref={nameDivRef} className='min-h-40 pt-20 -mt-24 pb-20 bg-gradient-to-b from-purple-900 to-zinc-900  px-10'>
              <h1 className=' mt-4 mb-8 text-6xl font-bold'> {genre?.name ?? "Genre title"} </h1>
          </div>
          <div className='h-screen px-12'>
          </div>
        </>
    </div>
  )
}

export default Genres