import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Auth from './Routes/Auth';
import Appp from './Routes/App'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout } from './Components/Redux/Slices/UserSlice';
import { getArtists } from './Components/Redux/Slices/ArtistsSlice';
import { getSongs } from './Components/Redux/Slices/SongsSlice';
import { getGenres } from './Components/Redux/Slices/GenresSlice';
import { getPlaylists } from './Components/Redux/Slices/PlaylistsSlice';

function App() {
  const dispatch = useDispatch()

  const userLocal = JSON.parse(localStorage.getItem("spotify-user"))
  const [isLogged, setIsLogged] = useState(false)

  const user = useSelector(state => state.user.logged)
  
  useEffect(()=> {
    if (userLocal !== null) {
      dispatch(login(userLocal))
      setIsLogged(true)

      dispatch(getGenres());
      dispatch(getSongs());
      dispatch(getArtists());
      dispatch(getPlaylists());
    } else {
      dispatch(logout())
      setIsLogged(false)
    }
  }, [user, dispatch])

  

  return (
    <BrowserRouter>
      <div className='App'>
        {/* {isLogged ? <Appp /> : <Auth /> } */}
      </div>
    </BrowserRouter>
  );
}

export default App;
