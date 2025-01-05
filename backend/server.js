// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load API key from .env
const apiKey = process.env.WEATHER_API_KEY;

const mongoURI = process.env.MONGO;

const searchSchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now },
});

const Search = mongoose.model("Search", searchSchema);

// Route for fetching weather data
app.get("/api/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);

        // Save the search to MongoDB
        const search = new Search({ city });
        await search.save();

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message });
        }
        res.status(500).json({ error: "An error occurred while fetching weather data" });
    }
});

app.get("/api/searches", async (req, res) => {
    try {
        const searches = await Search.find().sort({ date: -1 }).limit(10); // Fetch the last 10 searches
        res.json(searches);
    } catch (error) {
        console.error("Error fetching searches:", error);
        res.status(500).json({ error: "Failed to fetch past searches" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));