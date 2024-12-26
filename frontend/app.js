function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "62059f61a25c988bb7b2f987c23b04c8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
        })
        .catch(error => {
            console.error(error);
            alert("Failed to fetch weather data. Please check the city name and try again.");
        });
}