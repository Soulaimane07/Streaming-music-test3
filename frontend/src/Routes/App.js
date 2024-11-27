import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/App/Home/Home'
import Discover from '../Pages/App/Discover/Discover'
import Sidebar from '../Components/Sidebar/Sidebar'
import Footer from '../Components/Footer/Footer'
import { useSelector } from 'react-redux'
import Navbar from '../Components/Navbar/Navbar'

function App() {
  const music = useSelector(state => state.music)

  return (
    <div className='bg-black text-white flex flex-col h-screen'>
      <div className='py-2 px-2 flex-1 w-full overflow-y-auto flex space-x-2'>
        <Navbar />

        <div className='Scroll bg-zinc-900 flex-1 rounded-md overflow-y-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path='/*' element={<Navigate to="/" replace={true} />} />
          </Routes>
        </div>

        {music.isDetails && <Sidebar />}
      </div>

      {music.data && <Footer />}
    </div>
  )
}

export default App