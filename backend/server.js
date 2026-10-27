require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const CATALOG_BEER_API_KEY = process.env.CATALOG_BEER_API_KEY;
const CATALOG_BEER_API_ROOT = 'https://api.catalog.beer';

// Middleware to check for API key
app.use((req, res, next) => {
  if (!CATALOG_BEER_API_KEY || CATALOG_BEER_API_KEY === 'YOUR_API_KEY_HERE') {
    return res.status(500).json({ error: 'CATALOG_BEER_API_KEY is not configured in the backend.' });
  }
  next();
});

// Proxy endpoint to list all beers
app.get('/api/beers', async (req, res) => {
  try {
    const response = await axios.get(`${CATALOG_BEER_API_ROOT}/beer`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${CATALOG_BEER_API_KEY}:`).toString('base64')}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching beers:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Failed to fetch beers from external API.' });
  }
});

// Proxy endpoint to get a single beer by ID
app.get('/api/beers/:id', async (req, res) => {
  const beerId = req.params.id;
  try {
    const response = await axios.get(`${CATALOG_BEER_API_ROOT}/beer/${beerId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${CATALOG_BEER_API_KEY}:`).toString('base64')}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching beer ${beerId}:`, error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: `Failed to fetch beer ${beerId} from external API.` });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
