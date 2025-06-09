import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bg from '../../assets/images/farm-bg.png'
import Footer from '../footer/Footer';

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.WEATHER_API_KEY || '18775102b91a44048cf165129252105';

  const fetchWeather = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: apiKey,
          q: query,
          days: 7,
          aqi: 'no',
          alerts: 'no',
        },
      });

      setWeather(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Try a valid location.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(`${position.coords.latitude},${position.coords.longitude}`);
        },
        () => {
          setLoading(false);
          setError('Location access denied. Please search manually.');
        }
      );
    } else {
      setLoading(false);
      setError('Geolocation not supported. Please search manually.');
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      fetchWeather(input.trim());
      setInput('');
    }
  };
return (
  <div
    className="h-[80vh] bg-cover bg-center flex flex-col items-center justify-start"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <div className="w-full max-w-lg mt-10 bg-someBrown/50 p-6 rounded shadow-lg backdrop-blur-sm">
      <h2 className="text-xl font-bold text-center mb-4 text-white">Weather Forecast</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-1 bg-springBeige text-jungleGreen"
          placeholder="Enter your Region"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-jungleGreen px-4 rounded text-white"
          disabled={loading || !input.trim()}
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400 text-sm">{error}</p>
      ) : weather ? (
        <>
          <div className="text-center mb-6 text-white">
            <h3 className="text-lg font-semibold">
              Today in {weather.location.name}, {weather.location.country}
            </h3>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="mx-auto"
            />
            <p className="text-2xl font-bold">{Math.round(weather.current.temp_c)}°C</p>
            <p className="capitalize">{weather.current.condition.text}</p>
            <p className="text-sm text-gray-300">Humidity: {weather.current.humidity}%</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2 text-white">7-Day Forecast</h3>
            <ul className="grid gap-2">
              {weather.forecast.forecastday.map((day) => (
                <li key={day.date} className="flex justify-between items-center border p-2 rounded bg-someBrown/20 backdrop-blur text-white">
                  <span>{new Date(day.date).toDateString()}</span>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="h-10 w-10"
                  />
                  <span>
                    {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-center text-white">No weather data available</p>
      )}
    </div>

    <div className="absolute bottom-0">
      <Footer />
    </div>
  </div>
);
}
export default Weather;
