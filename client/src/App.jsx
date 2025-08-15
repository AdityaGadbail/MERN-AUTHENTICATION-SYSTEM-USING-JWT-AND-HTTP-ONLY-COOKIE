import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/email-verify' element={<EmailVerify/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    </div>
  )
}

export default App
