import { useState } from 'react';
import './App.css';
import { countryCodes } from './codes';
import { WeatherResponse } from './types';

export const App = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States of America');
  const [weatherResponse, setWeatherResponse] = useState<WeatherResponse | null>(null);
  const countries = Object.keys(countryCodes);

  const getWeather = async () => {
    setWeatherResponse(null);
    if (city.length < 2) return alert('Please enter a valid city.');
    try {
      await fetch(
        `https://weather-takehome-backend.vercel.app/weather/${city}/${countryCodes[country]}`
      )
        .then((res) => {
          if (res.status === 400) {
            return alert('No data found, double check city and country.');
          }
          if (res.status === 504) {
            return alert('Third party API is down, try again later.');
          }
          return res.json();
        })
        .then((data) => {
          setWeatherResponse(data);
        });
    } catch (error) {
      alert('Error retrieving data');
    }
  };

  return (
    <div id='appContainer'>
      <h1 id='title'>Weather by City</h1>
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='Enter city'
      />
      <select onChange={(e) => setCountry(e.target.value)}>
        {countries.map((el) => {
          return <option value={el}>{el}</option>;
        })}
      </select>
      <button onClick={getWeather}>Get Weather</button>
      {weatherResponse && (
        <div>
          <h2>
            {weatherResponse.city}, {weatherResponse.country}
          </h2>
          <p>
            Temperature: {weatherResponse.temp}°F{' '}
            {` (Low ${weatherResponse.low} to High ${weatherResponse.high})`}
          </p>
          <p>Feels Like: {weatherResponse.feelsLike}°F</p>
          <p>Humidity: {weatherResponse.humidity}%</p>
          <p>Condition: {weatherResponse.desc}</p>
        </div>
      )}
    </div>
  );
};

export default App;
