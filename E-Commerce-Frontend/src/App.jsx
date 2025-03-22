import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAndSignup from './Pages/LoginandSignup';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Singup';
import AddProductPage from './Components/AddProductPage';
import { Contact } from 'lucide-react';
import ContactPage from './Components/ContactPage';
import AboutPage from './Components/AboutPage';
import Profile from './Components/Profile';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
        {/* <AddProductPage/> */}
        {/* <ContactPage/> */}
        <hr />
              <Routes>
        <Route path='/Contact' element={<ContactPage />} />

      </Routes>
      {/* <Routes>
        <Route path='/logout' element={<LoginAndSignup />} />
      </Routes> */}
      {/* <Profile/> */}
      {/* <LoginAndSignup/> */}
        <AboutPage/>
      {/* <Signup/> */}

    </BrowserRouter>
  )
}

export default App