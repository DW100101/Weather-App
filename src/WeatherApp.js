import React, { useState } from "react";
import Forecast from "./Components/Forecast";
import "./WeatherApp.css";
import CurrentWeather from "./Components/CurrentWeather";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("");
  const apiKey = "dd09acfa45eb08c49750b558b091e5f6";

  const fetchWeatherData = async (location) => {
    const [city, state, country] = location
      .split(",")
      .map((part) => part.trim());

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${apiKey}`;

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGetWeatherClick = () => {
    const normalizedLocation = location.trim().toLocaleLowerCase();
    if (normalizedLocation === "") return;
    fetchWeatherData(normalizedLocation);
  };

  return (
    <div className="weather-app">
      <h1 style={{ textDecorationLine: "underline" }}>Weather App</h1>

      <div>
        <label htmlFor="locationInput">City:</label>
        <input
          className="input-field"
          type="text"
          id="locationInput"
          value={location}
          onChange={handleLocationChange}
          placeholder="e.g. London"
        />
        <button className="button" onClick={handleGetWeatherClick}>
          Get Weather
        </button>
      </div>

      {weatherData && weatherData.main && (
        <CurrentWeather weatherData={weatherData} />
      )}

      {forecastData && forecastData.list && (
        <Forecast forecastData={forecastData} />
      )}

      {!weatherData && (
        <div className="Instructions">
          <p className="Instructions-text">
            Enter a city name and click 'Get Weather'.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
