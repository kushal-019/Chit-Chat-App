import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from 'lucide-react'
import {Toaster} from "react-hot-toast"

import Navbar from './components/Navbar'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import HomePage from './Pages/HomePage'
import { useAuthStore } from './Store/useAuthStore'
import { useThemeStore } from './Store/useThemeStore'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth ,onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  console.log(onlineUsers)

  useEffect(() => {
    checkAuth();
    console.log("called")
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>

      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route
          path="/settings"
          element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
