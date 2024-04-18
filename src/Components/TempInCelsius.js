import React from "react";

const TempInCelsius = ({ kelvinTemp }) => {
  const convertToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };
  return <>{convertToCelsius(kelvinTemp)} °C</>;
};

export default TempInCelsius;
