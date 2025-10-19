import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "../views/Users";
import "./App.css";
import { useEffect } from "react";
import Homepage from "../views/HomePage";
import ProductPage from "../views/Product";
import CreateProductPage from "../views/CreateProduct";
import PanierPage from "../src/components/Pages/Panier";
import { AuthProvider } from "./context/Authcontext";
import EditProfilePage from "../views/updateuser"; 

function App() {
  useEffect(() => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}, []);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/panier" element={<PanierPage />} />
          <Route path="/browseProduct" element={<ProductPage />} />
          <Route path="/createProduct" element={<CreateProductPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/edit" element={<EditProfilePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
