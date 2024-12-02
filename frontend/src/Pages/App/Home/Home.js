import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Box1 from './Box1'
import Box2 from './Box2'
import Box3 from './Box3'

function Home() {
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

  return (
      <div className='flex-1 relative pb-60'>
        <Header title="Good evening" bg={false} showName={showName} />
        <Box1 nameDivRef={nameDivRef} />
        <Box2 />
        <Box3 />
      </div>
  )
}

export default Home