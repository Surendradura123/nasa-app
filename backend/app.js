const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.NASA_API_KEY;

app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

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

module.exports = app;
