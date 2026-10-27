import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BeerList from './components/BeerList.jsx';
import BeerDetail from './components/BeerDetail.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Beer Scoring App</h1>
          <nav>
            <Link to="/beers" className="nav-link">View All Beers</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Beer App!</h2>} />
          <Route path="/beers" element={<BeerList />} />
          <Route path="/beers/:id" element={<BeerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
