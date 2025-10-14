import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "../views/Users";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
