import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGenre } from '../../../Components/Redux/Slices/GenresSlice';
import { GetTop, PageTitle } from '../../../Components/Functions';
import Footer2 from '../../../Components/Footer2/Footer2';

function Genres() { 
  useEffect(()=> {
    GetTop()
  }, [])

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
  PageTitle(genre?.name + " - Genre")

  


  return (
    <div className='flex-1 relative '>
        <div className='pb-40  min-h-screen'>
          <Header title={genre?.name ?? "Genre title"} bg={true} showName={showName} />

          <>
            <div ref={nameDivRef} className='min-h-40 pt-20 -mt-24 pb-20 bg-gradient-to-b from-purple-900 to-zinc-900  px-10'>
                <h1 className=' mt-4 mb-8 text-6xl font-bold'> {genre?.name ?? "Genre title"} </h1>
            </div>
            <div className='px-12'>
            </div>
          </>
        </div>
        <Footer2 />
    </div>
  )
}

export default Genres