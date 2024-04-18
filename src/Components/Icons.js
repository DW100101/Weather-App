import { faSun, faCloudSun, faCloud } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "01d": faSun, // clear sky day
  "01n": faSun, // clear sky night
  "02d": faCloudSun, // few clouds day
  "02n": faCloudSun, // few clouds night
  "03d": faCloud, // scattered clouds day
  "03n": faCloud, // scattered clouds night
};

const getWeatherIcon = (weatherCode) => {
  return iconMap[weatherCode] || faCloud;
};

export default getWeatherIcon;
