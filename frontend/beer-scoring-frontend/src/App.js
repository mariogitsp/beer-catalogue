import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Beer Scoring App</h1>
        </header>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Beer App!</h2>} />
          {/* More routes will be added here for BeerList and BeerDetail */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
