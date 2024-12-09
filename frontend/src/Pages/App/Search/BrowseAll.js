import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Genre from '../../../Components/Elements/Genre/Genre';
import { useSelector } from 'react-redux';
import Footer2 from '../../../Components/Footer2/Footer2';
import { GetTop, PageTitle } from '../../../Components/Functions';



function BrowseAll() {
    useEffect(()=> {
        GetTop()
    }, [])
    PageTitle(`Search`)

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


    const genres = useSelector((state)=> state.genres.data)

  return (
    <div className='flex-1 relative '>
        <div className='pb-40 py-2 min-h-screen'>
            <Header title="Browse All" bg={true} showName={showName} />

            <h1 ref={nameDivRef} className='px-12 mt-4 mb-8 text-4xl font-bold'> Browse All </h1>
            <div className='px-12 grid grid-cols-3 gap-6'>
                {genres.map((item, key)=> (
                    <Genre data={item} key={key} />
                ))}
            </div>
        </div>
        <Footer2 />
    </div>
  )
}

export default BrowseAll