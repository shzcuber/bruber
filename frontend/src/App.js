import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/Home'
import Rides from './pages/Rides'
import Driver from "./pages/Driver";
import CreateRide from './pages/CreateRide';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/rides" element={<Rides/>}/>
        <Route path="/driver" element={<Driver />} />
        <Route exact path="/create_ride" element={<CreateRide/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
