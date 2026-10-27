import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BeerList.css'; // Assuming you'll create this CSS file

function BeerList() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/beers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBeers(data.data); // Assuming the API returns an object with a 'data' array
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  if (loading) {
    return <div className="loading">Loading beers...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="beer-list-container">
      <h2>Available Beers</h2>
      <ul className="beer-list">
        {beers.map((beer) => (
          <li key={beer.id} className="beer-list-item">
            <Link to={`/beers/${beer.id}`}>{beer.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeerList;
