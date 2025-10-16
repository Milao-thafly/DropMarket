import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import reactLogo from './assets/react.svg'
import UserPage from "../views/Users"
import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
