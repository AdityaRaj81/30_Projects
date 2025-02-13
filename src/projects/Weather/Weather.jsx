import { useState, useEffect } from 'react';
import { Cloud, Sun, Moon, CloudRain, Wind, Droplets, Thermometer, Search, MapPin, Clock, CloudDrizzle, CloudLightning, CloudSnow, Cloudy, Eye, Gauge, ThermometerSun, ThermometerSnowflake } from 'lucide-react';
import './Weather.css';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';

const Weather = () => {
  const [city, setCity] = useState('Patna');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateTime, setDateTime] = useState('');

  const API_KEY = '9031a2cda973ad489be82ac74b9054f3';

  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
      }
  
      const data = await response.json();
      setWeather(data);

      // Get current time based on timezone
      const timezoneOffset = data.timezone; 
      const localTime = new Date(Date.now() + timezoneOffset * 1000);
      setDateTime(localTime.toLocaleString('en-US', { timeZone: 'UTC' }));
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Patna');
  }, []);

  const getWeatherIcon = (weatherMain, isNight) => {
    if (!weatherMain) return <Cloud className="icon" />;

    switch (weatherMain.toLowerCase()) {
      case 'clear': return isNight ? <Moon className="icon night" /> : <Sun className="icon sun" />;
      case 'rain': return <CloudRain className="icon rain" />;
      case 'clouds': return <Cloudy className="icon clouds" />;
      case 'drizzle': return <CloudDrizzle className="icon drizzle" />;
      case 'thunderstorm': return <CloudLightning className="icon thunderstorm" />;
      case 'snow': return <CloudSnow className="icon snow" />;
      default: return <Cloud className="icon" />;
    }
  };

  const getThermometerIcon = (temp) => {
    if (temp >= 28) return <ThermometerSun className="icon hot" />;
    if (temp <= 12) return <ThermometerSnowflake className="icon cold" />;
    return <Thermometer className="icon normal" />;
  };

  return (
    <div className="app">
      <HeaderProject title="Weather Dashboard" />
      
      <div className="weather-container">
        <div className="weather-card">
          <h1 className="weather-title">Weather Dashboard</h1>

          <div className="weather-search">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
            />
            <button onClick={() => fetchWeather()} disabled={loading} className="search-button">
              {loading ? 'Loading...' : <Search />}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {weather && (
            <div className="weather-info">
              <h2><MapPin /> {weather.name}, {weather.sys.country}</h2>

              {getWeatherIcon(weather.weather[0].main, new Date().getHours() >= 18 || new Date().getHours() < 6)}
        
              <p className="temp">{getThermometerIcon(weather.main.temp)} {Math.round(weather.main.temp)}°C</p>
              <p className="description">{weather.weather[0].description}</p>

              <p> {dateTime}</p>
              <br />
              <p>Time Zone: UTC {weather.timezone / 3600 >= 0 ? `+${weather.timezone / 3600}` : weather.timezone / 3600}</p>

              <div className="extra-details">
                <p><Thermometer /> Min Temp: {Math.round(weather.main.temp_min)}°C</p>
                <p><Thermometer /> Feels Like: {Math.round(weather.main.feels_like)}°C</p>
                <p><Thermometer /> Max Temp: {Math.round(weather.main.temp_max)}°C</p>
                <p><Droplets /> Humidity: {weather.main.humidity}%</p>
                <p><Eye /> <visibility />Visibility: {weather.visibility / 1000} km</p>
                <p><Gauge />Pressure: {weather.main.pressure} hPa</p>
                <p><Clock /> Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p><Wind /> Wind Speed: {weather.wind.speed} km/h</p>
                <p><Clock /> Sunset : {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>

              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Weather;
