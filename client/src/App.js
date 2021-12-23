import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/landingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)}/>
          <Route path="/LoginPage" element={Auth(LoginPage, false)}/>
          <Route path="/RegisterPage" element={Auth(RegisterPage, false)}/>
        </Routes>
      </div>
    </Router>
  );
}