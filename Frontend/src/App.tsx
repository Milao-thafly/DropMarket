import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import UserPage from "../views/Users"
import './App.css'
import  Homepage  from "../views/HomePage"
import ProductPage from "../views/Product"
import CreateProductPage from "../views/CreateProduct"
import Panier from "./components/Pages/Panier"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>

      <AuthProvider>
         <Header />
        <Routes>
          <Route path="/panier" element={<Panier />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/browseProduct" element={<ProductPage />} />
          <Route path="/createProduct" element={<CreateProductPage />} />
        </Routes>
      </AuthProvider>
       <Footer />
    </Router>
  );
}

export default App;
