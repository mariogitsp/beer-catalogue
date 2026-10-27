import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BeerDetail.css';
import BeerFingerprint from './BeerFingerprint.jsx';

function BeerDetail() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/beers/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBeer(data); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeer();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading beer details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!beer) {
    return <div className="no-beer">Beer not found.</div>;
  }

  return (
    <div className="beer-detail-container">
      <h2>{beer.name}</h2>
      <BeerFingerprint abv={beer.abv} ibu={beer.ibu} />
      <p><strong>Style:</strong> {beer.style}</p>
      <p><strong>ABV:</strong> {beer.abv}%</p>
      <p><strong>IBU:</strong> {beer.ibu}</p>
      <p><strong>Description:</strong> {beer.description}</p>
    </div>
  );
}

export default BeerDetail;
