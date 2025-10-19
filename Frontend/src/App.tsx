import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import UserPage from "../views/Users"
import './App.css'
import  Homepage  from "../views/HomePage"
import ProductPage from "../views/Product"
import CreateProductPage from "../views/CreateProduct"
import  PanierPage  from "../src/components/Pages/Panier"


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/panier" element={<PanierPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/browseProduct" element={<ProductPage />} />
          <Route path="/createProduct" element={<CreateProductPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
