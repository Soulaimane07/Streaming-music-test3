import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Auth from './Routes/Auth';
import Appp from './Routes/App'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout } from './Components/Redux/Slices/UserSlice';

function App() {
  const dispatch = useDispatch()

  const userLocal = JSON.parse(localStorage.getItem("spotify-user"))
  const [isLogged, setIsLogged] = useState(false)

  const user = useSelector(state => state.user.logged)
  
  useEffect(()=> {
    if (userLocal !== null) {
      dispatch(login(userLocal))
      setIsLogged(true)
    } else {
      dispatch(logout())
      setIsLogged(false)
    }
  }, [user])

  

  return (
    <BrowserRouter>
      <div className='App'>
        {isLogged ? <Appp /> : <Auth /> }
      </div>
    </BrowserRouter>
  );
}

export default App;
