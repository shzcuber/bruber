import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/Home'
import Rides from './pages/Rides'
import Profile from "./pages/Profile";
import CreateRide from './pages/CreateRide';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/rides" element={<Rides/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route exact path="/create_ride" element={<CreateRide/>}/>
      </Routes>
    </Router>
  );
}

export default App;
