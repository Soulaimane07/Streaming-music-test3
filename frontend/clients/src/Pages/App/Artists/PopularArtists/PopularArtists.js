import React, { useEffect, useRef, useState } from 'react'
import { GetTop, PageTitle } from '../../../../Components/Functions'
import Header from '../../../../Components/Header/Header'
import Artist from '../../../../Components/Elements/Artist/Artist'
import { useSelector } from 'react-redux';
import Footer2 from '../../../../Components/Footer2/Footer2';

function PopularArtists() {
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

    PageTitle("Popular artists")
    const artists = useSelector((state)=> state.artists.data)


  return (
    <div className='flex-1 relative '>
        <div className='pb-40 pt-2 min-h-screen'>
            <Header title="Popular artists" bg={true} showName={showName} />

            <h1 ref={nameDivRef} className='px-12 mt-4 mb-8 text-4xl font-bold'> Popular artists </h1>
            <div className='px-12 grid grid-cols-6 gap-6'>
                {artists.map((item, key)=> (
                    <Artist data={item} key={key} />
                ))}
            </div>
        </div>
        <Footer2 />
    </div>
  )
}

export default PopularArtists