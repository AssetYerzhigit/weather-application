function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "62059f61a25c988bb7b2f987c23b04c8";

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("city-name").innerText = `City: ${data.name}`;
            document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById("weather-description").innerText = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.error(error);
            alert("Failed to fetch weather data. Please check the city name and try again.");
        });
}