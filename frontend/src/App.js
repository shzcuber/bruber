import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Rides from './pages/Rides';
import Home from './pages/Home';

function App() {
  return (
    <h1 className="hidden">
      Hello world!
    </h1>
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Home/>}/>
    //     <Route exact path="/rides" element={<Rides/>}/>
    //   </Routes>
    // </Router>
  );
}

export default App;
