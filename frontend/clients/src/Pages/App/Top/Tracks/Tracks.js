import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../../Components/Header/Header';
import TracksTable from '../../../../Components/Elements/Tracks/TracksTable';
import { GetTop, PageTitle, tracks } from '../../../../Components/Functions';
import { PlaylistTrack } from '../../../../Components/Elements/Tracks/Tracks';
import Footer2 from '../../../../Components/Footer2/Footer2';

function Tracks() {
    useEffect(()=> {
        GetTop()
    }, [])
    PageTitle("Top tracks")

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


    const [hover, setHover] = useState(false);


  return (
    <div className='flex-1 relative '>
        <div className='pb-40 py-2 min-h-screen'>
            <Header title={"Top tracks this month"} bg={true} showName={showName} />

            <div ref={nameDivRef} className='min-h-40  pt-20 -mt-24 pb-20 bg-gradient-to-b from-purple-900 to-zinc-900  px-10'>
                <h1 className=' mt-8 mb-4 text-6xl font-bold'> Top tracks this month </h1>
                <p className='mb-8 opacity-60'> Only visivle for you </p>
            </div>
            <div className='min-h-screen '>
                <TracksTable type="album"  />
                <ul className='px-12 mt-2 space-y-1'>
                    {tracks.map((item, key) => (
                        50 && <PlaylistTrack hover={hover} setHover={setHover}  data={item} id={key} key={key} />
                    ))}
                </ul>
            </div>
        </div>
        <Footer2 />
    </div>
  )
}

export default Tracks