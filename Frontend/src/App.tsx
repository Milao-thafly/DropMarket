import { useState } from 'react'
import UserPage from "../views/Users"
import { ProductView } from '../views/Product'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route />
         <Route path="/browseProduct" element={<ProductView />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
