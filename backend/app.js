const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.NASA_API_KEY;

// APOD API
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

//Mars API
app.get('/api/mars', async (req, res) => {
  const { rover = 'curiosity', sol = 1000, camera = '' } = req.query;
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera ? `&camera=${camera}` : ''}&api_key=${API_KEY}`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Mars photos' });
  }
});

//Epic API
app.get('/api/epic', async (req, res) => {
  const { date } = req.query;
  const baseUrl = 'https://api.nasa.gov/EPIC/api/natural';

  try {
    const url = date
      ? `${baseUrl}/date/${date}?api_key=${API_KEY}`
      : `${baseUrl}?api_key=${API_KEY}`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
});

//Neo API
app.get('/api/neo', async (req, res) => {
  const { start_date, end_date } = req.query;
  const baseUrl = `https://api.nasa.gov/neo/rest/v1/feed`;

  try {
    const { data } = await axios.get(`${baseUrl}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

//NEO list API
app.get('/api/neo/list', async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`
    );

    // Flatten all NEOs across dates
    const allNeos = Object.values(data.near_earth_objects).flat();

    const list = allNeos.map((obj) => {
      const approach = obj.close_approach_data[0];
      return {
        id: obj.id,
        name: obj.name,
        diameter: obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2),
        velocity: parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0),
        miss_distance: parseFloat(approach.miss_distance.kilometers).toFixed(0),
        hazardous: obj.is_potentially_hazardous_asteroid,
        date: approach.close_approach_date,
      };
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NEO list' });
  }
});

//Nasa Search API
app.get('/api/nasa-search', async (req, res) => {
  const { q = '', media_type = '' } = req.query;
  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=${media_type}`;

  try {
    const { data } = await axios.get(url);
    res.json(data.collection);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NASA media library' });
  }
});


module.exports = app;
