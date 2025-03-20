import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAndSignup from './Pages/LoginandSignup';
import Navbar from './Components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/LoginAndSignup' element={<LoginAndSignup />} />
      </Routes>
      {/* <LoginAndSignup/> */}
      {/* <Login/> */}
      {/* <Signup/> */}

    </BrowserRouter>
  )
}

export default App