import React, { useState, useEffect } from 'react';
import './NearbyLocations.css';

function NearbyLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        fetchNearbyLocations(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) {
          setPermissionDenied(true);
          setError('Location access denied. Please allow location access to see nearby beers.');
        } else {
          setError(`Geolocation error: ${err.message}`);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const fetchNearbyLocations = async (lat, lng) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/locations/nearby?lat=${lat}&lng=${lng}&maxDistance=100000&limit=20`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch nearby locations');
      }
      const data = await response.json();
      setLocations(data.locations);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching nearby locations:', err);
    }
  };

  const formatDistance = (meters) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  if (permissionDenied) {
    return (
      <div className="nearby-container">
        <div className="nearby-card error-state">
          <h2>📍 Location Access Needed</h2>
          <p>{error}</p>
          <button className="btn-retry" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="nearby-container">
        <div className="nearby-card loading-state">
          <h2>🔍 Finding Nearby Beers...</h2>
          <p>Detecting your location</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nearby-container">
        <div className="nearby-card error-state">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button className="btn-retry" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nearby-container">
      <header className="nearby-header">
        <h1>🍺 Beers Near You</h1>
        {userLocation && (
          <p className="user-coords">
            Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
      </header>

      {locations.length === 0 ? (
        <div className="nearby-card empty-state">
          <h2>No breweries or bars found nearby</h2>
          <p>Try expanding your search radius or add a location.</p>
        </div>
      ) : (
        <div className="locations-list">
          {locations.map((location) => (
            <div key={location._id} className="location-card">
              <div className="location-header">
                <h2>{location.name}</h2>
                <span className={`location-type ${location.type}`}>{location.type}</span>
              </div>
              <div className="location-distance">
                <span className="distance-badge">{formatDistance(location.distance)} away</span>
              </div>
              {location.address && (
                <div className="location-address">
                  {location.address.street && <span>{location.address.street}</span>}
                  {location.address.city && <span>{location.address.city}</span>}
                  {location.address.postal_code && <span>{location.address.postal_code}</span>}
                  {location.address.country && <span>{location.address.country}</span>}
                </div>
              )}
              {location.description && (
                <p className="location-description">{location.description}</p>
              )}
              <div className="location-beers">
                <h3>Common Beers:</h3>
                <ul className="beer-list">
                  {location.common_beers && location.common_beers.length > 0 ? (
                    location.common_beers.map((beer, idx) => (
                      <li key={idx} className="beer-item">
                        <span className="beer-name">{beer.beer_name}</span>
                        <span className="beer-brewery">{beer.brewery_name}</span>
                        {beer.is_available !== false && (
                          <span className="available-badge">✓ Available</span>
                        )}
                      </li>
                    ))
                  : (
                    <li className="beer-item empty">No beers listed</li>
                  )}
                </ul>
              </div>
              {location.phone && (
                <p className="location-phone">📞 {location.phone}</p>
              )}
              {location.website && (
                <a href={location.website} target="_blank" rel="noopener noreferrer" className="location-website">
                  🌐 Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NearbyLocations;
