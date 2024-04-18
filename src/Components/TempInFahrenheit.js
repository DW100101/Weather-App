import React from "react";

const TempInFahrenheit = ({ kelvinTemp }) => {
  const convertToFahreneit = (kelvin) => {
    return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(1);
  };
  return <>{convertToFahreneit(kelvinTemp)} °F</>;
};

export default TempInFahrenheit;
