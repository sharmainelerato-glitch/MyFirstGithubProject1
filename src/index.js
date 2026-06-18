const API_KEY = "4cf392f20472ao053175dt090c8bf10c";

function getWeatherEmoji(condition) {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
    return "☀️";
  } else if (conditionLower.includes("cloud")) {
    return "☁️";
  } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return "🌧️";
  } else if (conditionLower.includes("snow")) {
    return "❄️";
  } else if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
    return "⛈️";
  } else if (conditionLower.includes("fog") || conditionLower.includes("mist")) {
    return "🌫️";
  } else if (conditionLower.includes("wind")) {
    return "💨";
  } else if (conditionLower.includes("hail")) {
    return "🧊";
  } else if (conditionLower.includes("partly")) {
    return "⛅";
  }
  return "🌤️";
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Show loading state
  let searchButton = document.querySelector(".search-button");
  searchButton.disabled = true;
  searchButton.textContent = "Searching...";

  fetch(
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      if (data.city) {
        let cityElement = document.querySelector("#current-city");
        let tempElement = document.querySelector(
          "#current-temp-value"
        );
        let conditionElement = document.querySelector("#current-condition");
        let humidityElement = document.querySelector("#current-humidity");
        let windElement = document.querySelector("#current-wind");
        let iconElement = document.querySelector("#weather-icon");

        cityElement.innerHTML = data.city;
        tempElement.innerHTML = Math.round(data.temperature.current);
        if (conditionElement) {
          conditionElement.innerHTML = data.condition.description;
        }
        if (humidityElement) {
          humidityElement.innerHTML = data.temperature.humidity;
        }
        if (windElement) {
          windElement.innerHTML = Math.round(data.wind.speed);
        }
        if (iconElement && data.condition.description) {
          iconElement.innerHTML = getWeatherEmoji(data.condition.description);
        }
        searchInputElement.value = "";
      } else {
        console.error("API Error:", data);
        alert(`Error: City not found. Please try again.`);
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    })
    .finally(() => {
      // Reset button state
      searchButton.disabled = false;
      searchButton.textContent = "Search";
    });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);