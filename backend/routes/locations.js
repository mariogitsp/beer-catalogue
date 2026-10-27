const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// GET /api/locations/nearby - Find locations near user's coordinates
// Query params: lat, lng, maxDistance (in meters, default 50000 = 50km), limit
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 50000, limit = 20 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng query parameters are required' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const distance = parseInt(maxDistance, 10);
    const limitNum = parseInt(limit, 10);

    const locations = await Location.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          maxDistance: distance,
          spherical: true,
          limit: limitNum,
        },
      },
      {
        $lookup: {
          from: 'beers',
          localField: 'common_beers.beer_id',
          foreignField: 'id',
          as: 'beer_details',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          type: 1,
          address: 1,
          coordinates: 1,
          phone: 1,
          website: 1,
          description: 1,
          distance: { $round: ['$distance', 0] }, // meters
          common_beers: 1,
          beer_details: 1,
        },
      },
      {
        $sort: { distance: 1 },
      },
    ]);

    res.json({
      count: locations.length,
      user_location: { lat: latitude, lng: longitude },
      locations,
    });
  } catch (error) {
    console.error('Error finding nearby locations:', error);
    res.status(500).json({ error: 'Failed to find nearby locations' });
  }
});

// GET /api/locations/:id - Get a single location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

// POST /api/locations - Create a new location
router.post('/', async (req, res) => {
  try {
    const { name, type, address, coordinates, phone, website, description, common_beers } = req.body;

    if (!name || !coordinates || !coordinates.lat || !coordinates.lng) {
      return res.status(400).json({
        error: 'name, coordinates.lat, and coordinates.lng are required',
      });
    }

    const location = new Location({
      name,
      type: type || 'other',
      address: address || {},
      coordinates: {
        type: 'Point',
        coordinates: [coordinates.lng, coordinates.lat], // MongoDB uses [longitude, latitude]
      },
      phone,
      website,
      description,
      common_beers: common_beers || [],
    });

    await location.save();
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// GET /api/locations - List all locations (with optional search)
router.get('/', async (req, res) => {
  try {
    const { city, country, type, limit = 50 } = req.query;
    const filter = {};

    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (country) filter['address.country'] = new RegExp(country, 'i');
    if (type) filter.type = type;

    const locations = await Location.find(filter)
      .limit(parseInt(limit, 10))
      .sort({ created_at: -1 });

    res.json({ count: locations.length, locations });
  } catch (error) {
    console.error('Error listing locations:', error);
    res.status(500).json({ error: 'Failed to list locations' });
  }
});

module.exports = router;
