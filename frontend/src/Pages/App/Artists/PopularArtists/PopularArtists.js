import React, { useEffect, useRef, useState } from 'react'
import { GetTop } from '../../../../Components/Functions'
import Header from '../../../../Components/Header/Header'
import Artist from '../../../../Components/Elements/Artist/Artist'
import { useSelector } from 'react-redux';

function PopularArtists() {
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

    GetTop("Popular artists")
    const artists = useSelector((state)=> state.artists.data)


  return (
    <div className='relative py-2 pb-80'>
        <Header title="Popular artists" bg={true} showName={showName} />

        <h1 ref={nameDivRef} className='px-12 mt-4 mb-8 text-4xl font-bold'> Popular artists </h1>
        <div className='px-12 grid grid-cols-6 gap-6'>
            {artists.map((item, key)=> (
                <Artist data={item} key={key} />
            ))}
        </div>
    </div>
  )
}

export default PopularArtists