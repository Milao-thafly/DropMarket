import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import UserPage from "../views/Users"
import './App.css'
import HomePage from '../views/HomePage';

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
