import React, { useEffect, useRef, useState } from 'react';
import Header from '../../../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGenre } from '../../../Components/Redux/Slices/GenresSlice';
import { GetGenreData, GetTop, PageTitle } from '../../../Components/Functions';
import Footer2 from '../../../Components/Footer2/Footer2';
import TracksTable from '../../../Components/Elements/Tracks/TracksTable';
import { ArtistTrack } from '../../../Components/Elements/Tracks/Tracks';

function Genres() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showName, setShowName] = useState(false);
  const [songs, setSongs] = useState([]);
  const nameDivRef = useRef(null);

  // Fetch and dispatch genre data
  useEffect(() => {
    dispatch(getGenre(id));

    const fetchSongs = async () => {
      const data = await GetGenreData(id);
      setSongs(data);
    };

    fetchSongs();
  }, [id, dispatch]);

  // Fetch and display top genres
  useEffect(() => {
    GetTop();
  }, []);

  // Sticky name logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowName(!entry.isIntersecting);
      },
      { threshold: 0.8 }
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

  const genre = useSelector((state) => state.genres.genre);
  PageTitle(genre?.name ? `${genre.name} - Genre` : 'Loading...');


      const [hover, setHover] = useState(false);
  
        const music = useSelector(state => state.music)
      

  return (
    <div className="flex-1 relative">
      <div className="pb-40 min-h-screen">
        <Header title={genre?.name ?? 'Genre title'} bg={true} showName={showName} />

        <div ref={nameDivRef} className="min-h-40 pt-20 -mt-24 pb-20 bg-gradient-to-b from-purple-900 to-zinc-900 px-10">
          <h1 className="mt-4 mb-8 text-6xl font-bold">{genre?.name ?? 'Genre title'}</h1>
        </div>

        <div className="px-0">
          {songs.length > 0 && (
            <>
              <TracksTable  type={"plays"} />
              <ul className='px-12'>
                {songs.map((song, key) => (
                    <ArtistTrack hover={hover} setHover={setHover} data={song} id={key} key={key} music={music} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default Genres;
