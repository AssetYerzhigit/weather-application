function getWeather() {
    //const city = document.getElementById("city").value;
    //const apiKey = "62059f61a25c988bb7b2f987c23b04c8";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=62059f61a25c988bb7b2f987c23b04c8";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("city-name").innerText = `City: ${data.name}`;
            document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById("weather-description").innerText = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch weather data.");
        });
}