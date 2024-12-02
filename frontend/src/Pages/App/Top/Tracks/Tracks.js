import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../../Components/Header/Header';
import TracksTable from '../../../../Components/Elements/Tracks/TracksTable';
import { tracks } from '../../../../Components/Functions';
import { PlaylistTrack } from '../../../../Components/Elements/Tracks/Tracks';

function Tracks() {
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
    <div className='relative py-2 pb-60'>
        <Header title={"Top tracks this month"} bg={true} showName={showName} />

        <div className='pb-60'>
          <div ref={nameDivRef} className='min-h-40  pt-20 -mt-24 pb-20 bg-gradient-to-b from-purple-900 to-zinc-900  px-10'>
              <h1 className=' mt-8 mb-4 text-6xl font-bold'> Top tracks this month </h1>
              <p className='mb-8 opacity-60'> Only visivle for you </p>
          </div>
          <div className='min-h-screen '>
            <TracksTable  />
            <ul className='px-12 mt-2 space-y-1'>
                {tracks.map((item, key) => (
                    50 && <PlaylistTrack hover={hover} setHover={setHover}  data={item} id={key} key={key} />
                ))}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Tracks