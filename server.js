const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = 3000;

// Load the OpenWeatherMap API key from .env file
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';  // Default to London if no city is specified
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);  // Send the weather data back to the frontend
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});