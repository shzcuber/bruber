import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/Home'
import Rides from './pages/Rides'
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}