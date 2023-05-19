import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Rides from './pages/Rides';
import Home from './pages/Home';
import CreateRide from './pages/CreateRide';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/rides" element={<Rides/>}/>
        <Route exact path="/create_ride" element={<CreateRide/>}/>
      </Routes>
    </Router>
  );
}

export default App;
