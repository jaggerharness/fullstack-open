import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeather = (country) => {
  return axios.get(`${baseUrl}?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`).then(response => {
    return response.data;
  });
};

export default {
  fetchWeather,
};
