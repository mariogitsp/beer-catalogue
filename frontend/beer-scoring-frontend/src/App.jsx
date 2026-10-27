import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BeerList from './components/BeerList.jsx';
import BeerDetail from './components/BeerDetail.jsx';
import NearbyLocations from './components/NearbyLocations.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Beer Scoring App</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/beers" className="nav-link">View All Beers</Link>
            <Link to="/nearby" className="nav-link">Beers Near You</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Beer App!</h2>} />
          <Route path="/beers" element={<BeerList />} />
          <Route path="/beers/:id" element={<BeerDetail />} />
          <Route path="/nearby" element={<NearbyLocations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
