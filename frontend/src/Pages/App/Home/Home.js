import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Box1 from './Box1'
import Box2 from './Box2'
import Box3 from './Box3'
import { GetTop, PageTitle } from '../../../Components/Functions'
import { useSelector } from 'react-redux'
import Footer2 from '../../../Components/Footer2/Footer2'

function Home() {
  useEffect(()=> {
    GetTop()
  }, [])
  PageTitle("Web player: Music for everyone")

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



    const playlists = useSelector((state)=> state.playlists.data)
    const playlistsLoading = useSelector((state)=> state.playlists.loadingPlaylists)
    const user = useSelector((state)=> state.user.data)
    


    function getGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
          return "Good Morning";
        } else if (currentHour < 18) {
          return "Good Afternoon";
        } else {
          return "Good Evening";
        }
    }
      
    

  return (
    <div className='flex-1 relative '>
      <div className='pb-40 min-h-screen'>
        <Header title={`${getGreeting()} ${user?.name?.split(" ")[0] || user?.name}`} bg={false} showName={showName} />
        <Box1 playlists={playlists} nameDivRef={nameDivRef} title={`${getGreeting()} ${user?.name?.split(" ")[0] || user?.name}`} />
        <Box2 playlists={playlists} playlistsLoading={playlistsLoading} />
        <Box3 />
      </div>

      <Footer2 />
    </div>
  )
}

export default Home