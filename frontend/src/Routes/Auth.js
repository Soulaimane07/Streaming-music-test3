import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Auth/Login'
import Signup from '../Pages/Auth/Signup'

function Auth() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path='/*' element={<Navigate to="/login" replace={true} />} /> */}
    </Routes>
  )
}

export default Auth