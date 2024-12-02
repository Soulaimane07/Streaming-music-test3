import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Pages/App/Home/Home';
import Discover from '../Pages/App/Discover/Discover';
import Sidebar from '../Components/Sidebar/Sidebar';
import Footer from '../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import Navbar from '../Components/Navbar/Navbar';
import Profile from '../Pages/App/Profile/Profile';
import Artist from '../Pages/App/Artists/Artist/Artist';
import Discography from '../Pages/App/Artists/Discography/Discography';
import Playlists from '../Pages/App/Playlists/Playlists';
import PopularArtists from '../Pages/App/Artists/PopularArtists/PopularArtists';
import Search from '../Pages/App/Search/Search';
import BrowseAll from '../Pages/App/Search/BrowseAll';
import Genres from '../Pages/App/Genres/Genres';
import Tracks from '../Pages/App/Top/Tracks/Tracks';

function App() {
  const music = useSelector(state => state.music);

  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <div className="py-2 px-2 flex-1 w-full overflow-y-auto flex space-x-2">
        <Navbar />
        <div className="Scroll bg-zinc-900 flex-1 rounded-md overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/artists">
              <Route path=":id">
                <Route index element={<Artist />} />
                <Route path="discography" element={<Discography />} />
              </Route>
              <Route path="popular" element={<PopularArtists />} />
            </Route>
            <Route path="/playlists">
              <Route path=":id" element={<Playlists />} />
            </Route>
            <Route path="/search">
              <Route index element={<BrowseAll />} />
              <Route path=":searchTerm" element={<Search />} />
            </Route>
            <Route path='/top'>
              <Route path='tracks' element={<Tracks />} />
            </Route>
            <Route path='/genres/:id' element={<Genres />} />
            <Route path="/profile">
              <Route index element={<Profile />} />
              <Route path='playlists' element={<Profile />} />
              <Route path='followings' element={<Profile />} />
            </Route>
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </div>
        {music.isDetails && <Sidebar />}
      </div>

      {music.data && <Footer />}
    </div>
  );
}

export default App;
