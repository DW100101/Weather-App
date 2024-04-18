import React from "react";
import TempInCelsius from "./TempInCelsius";
import TempInFahrenheit from "./TempInFahrenheit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getWeatherIcon from "./Icons";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  
  const { name, sys, main, weather } = weatherData;

  const weatherDescription =
    weather.length > 0 ? capitalizeFirstLetter(weather[0].description) : "N/A";
  const weatherCode = weather.length > 0 ? weather[0].icon : "";

  return (
    <div className="current-weather">
      <h2>Current Weather in {`${name}, ${sys.country}`}</h2>
      <FontAwesomeIcon
        icon={getWeatherIcon(weatherCode)}
        size="2x"
        style={{ color: "#fa898b" }}
      />

      <p>{weatherDescription}</p>
      <p>
        <TempInFahrenheit kelvinTemp={main.temp} /> /{" "}
        <TempInCelsius kelvinTemp={main.temp} />
      </p>
      <p>
        Feels Like: <TempInFahrenheit kelvinTemp={main.feels_like} /> /{" "}
        <TempInCelsius kelvinTemp={main.feels_like} />
      </p>
    </div>
  );
};

export default CurrentWeather;
