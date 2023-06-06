import './App.css';
import Landing from './pages/Landing';
import { BrowserRouter as Router, Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
