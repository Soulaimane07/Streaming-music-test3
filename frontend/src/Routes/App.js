import React, { useEffect } from 'react'
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
    <div className=' bg-black text-white flex items-stretch relative'>
      <Navbar />

      <div className='w-full ml-64 min-h-screen'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path='/*' element={<Navigate to="/" replace={true} />} />
        </Routes>
      </div>

      {music.isDetails && <Sidebar />}
      {music.data && <Footer />}
    </div>
  )
}

export default App