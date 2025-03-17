// server.js

require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const app = express();

// Serve static files (your frontend)
app.use(express.static('public'));

// Endpoint to get the API key (only for the frontend)
app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.OPENWEATHERMAP_API_KEY });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});