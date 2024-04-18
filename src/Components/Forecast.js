import React from "react";
import TempInCelsius from "./TempInCelsius";
import TempInFahrenheit from "./TempInFahrenheit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getWeatherIcon from "./Icons";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Forecast = ({ forecastData }) => {
  const groupForecastByDay = (forecastData) => {
    const groupedByDay = {};

    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

      if (!groupedByDay[dayOfWeek]) {
        groupedByDay[dayOfWeek] = [];
      }

      groupedByDay[dayOfWeek].push(item);
    });

    return groupedByDay;
  };

  const groupedForecast = groupForecastByDay(forecastData.list);

  return (
    <div className="forecast-container">
      <h2 style={{ textDecorationLine: "underline" }}>5-Day Forecast</h2>
      {Object.entries(groupedForecast).map(([dayOfWeek, forecasts]) => (
        <div key={dayOfWeek} className="forecast-day">
          <h3 className="day-text">{dayOfWeek}</h3>
          {forecasts.map((forecast) => (
            <div className="forecast-item" key={forecast.dt}>
              <p className="forecast-time">
                {" "}
                {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
              <FontAwesomeIcon
                icon={getWeatherIcon(forecast.weather[0].icon)}
                size="2x"
                className="forecast-icon"
              />
              <p className="forecast-temp">
                {" "}
                <TempInFahrenheit kelvinTemp={forecast.main.temp} /> /{" "}
                <TempInCelsius kelvinTemp={forecast.main.temp} />
              </p>
              <p className="forecast-description">
                {capitalizeFirstLetter(forecast.weather[0].description)}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
