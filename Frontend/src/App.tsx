import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import HomePage from "../views/HomePage";
import UserPage from "../views/Users";
import Panier from "./components/Pages/Panier"


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/User" element={<UserPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/panier" element={<Panier />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
