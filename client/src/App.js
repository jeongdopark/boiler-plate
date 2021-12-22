import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/landingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/LoginPage" element={<LoginPage/>}/>
          <Route path="/RegisterPage" element={<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

