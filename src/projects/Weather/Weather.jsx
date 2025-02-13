import { useState, useEffect } from "react";
import "./Weather.css";
import Footer from "../../components/layouts/Footer";
import HeaderProject from '../../components/layouts/ProjectHeader';

const API_KEY = "9031a2cda973ad489be82ac74b9054f3";
const DEFAULT_CITY = "Patna";

const WeatherApp = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setCity(input);
      setInput("");
    }
  };

  return (
    <div className="app">
      <HeaderProject title="Weather App" />    
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
  </div>
  <Footer />
</div>
  );
};

export default WeatherApp;
