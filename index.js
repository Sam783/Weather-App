const button = document.getElementById("get_weather");

button.addEventListener("click", fetchWeather);

async function fetchWeather() {
  const api_key = "Your_API_KEY";
  const city = document.getElementById("city_input").value || "Hyderabad";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      alert("City not found!");
    }
    const weather = data.weather[0].main;
    const temperature = data.main.temp;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const date = new Date((data.dt + data.timezone) * 1000);
    const localDate = date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
      timeZone: "GMT",
    });

    document.getElementById("weather_info").textContent = weather;
    document.getElementById("temp").textContent = `${temperature} °c`;
    document.getElementById("pressure").textContent = `${pressure} hPa`;
    document.getElementById("humidity").textContent = `${humidity}%`;
    document.getElementById("windspeed").textContent = `${windSpeed} m/s`;
    document.getElementById("city").textContent = city;
    document.getElementById("day").textContent = localDate.split(",")[0];
    document.getElementById("date").textContent = localDate.split(",")[1];
    document.getElementById("year").textContent = localDate.split(",")[2];
    const img = document.getElementById("weather");
    if (weather === "Clear") {
      img.src = "Assets/clear.png";
    } else if (weather === "Clouds") {
      img.src = "Assets/clouds.png";
    } else if (weather === "Rain") {
      img.src = "Assets/rain.png";
    } else if (weather === "Snow") {
      img.src = "Assets/snow.png";
    } else if (weather === "Thunderstorm") {
      img.src = "Assets/thunderstorm.png";
    } else if (weather === "Drizzle") {
      img.src = "Assets/drizzle.png";
    } else if (weather === "Mist" || weather === "Haze") {
      img.src = "Assets/mist.png";
    } else if (weather === "Smoke" || weather === "Fog") {
      img.src = "Assets/fog.png";
    } else if (weather === "Sand" || weather === "Dust") {
      img.src = "Assets/sand.png";
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("load", () => {
  fetchWeather();
});
