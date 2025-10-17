import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import UserPage from "../views/Users"
import { useState } from 'react'
import './App.css'
import { CardListProduct } from './components/CardList/CardListProduct'
import  Homepage  from "../views/HomePage"
import ProductPage from "../views/Product"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/browseProduct" element={<ProductPage />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
