// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load API key from .env
const apiKey = process.env.WEATHER_API_KEY;

// Route for fetching weather data
app.get("/api/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message });
        }
        res.status(500).json({ error: "An error occurred while fetching weather data" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});