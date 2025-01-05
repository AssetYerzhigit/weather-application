function getWeather() {
    const city = document.getElementById("city").value.trim();
    const url = `http://localhost:5000/api/weather?city=${city}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById("weather-icon").src = iconUrl;
            document.getElementById("weather-icon").style.display = "block";

            document.getElementById("temperature").innerText = `${data.main.temp}°C`;
            document.getElementById("weather-description").innerText = `${data.weather[0].description}`;
            document.getElementById("feels-like").innerText = `Feels Like: ${data.main.feels_like}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `Wind: ${data.wind.speed} m/s`;
            document.getElementById("pressure").innerText = `Pressure: ${data.main.pressure} hPa`;

            // Fetch and update past searches dynamically
            getPastSearches();
        })
        .catch(error => {
            console.error(error);
            alert("Failed to fetch weather data. Please check the city name and try again.");
        });
}

function getPastSearches() {
    const url = `http://localhost:5000/api/searches`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const searchList = document.getElementById("past-searches-list");
            searchList.innerHTML = "";

            data.forEach(search => {
                const listItem = document.createElement("li");
                listItem.textContent = `${search.city} - ${new Date(search.date).toLocaleString()}`;
                searchList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching past searches:", error);
        });
}

document.addEventListener("DOMContentLoaded", getPastSearches);