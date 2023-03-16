import './input.css'
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c53611851d84e54ef1e335eff24b7072`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        window.alert('Invalid request. Please enter a valid location.')
      });
      setLocation('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="p-4">
        <div className="max-w-md mx-auto mt-10 bg-gradient-to-r from-cyan-500 to-green-400 rounded-lg overflow-hidden shadow-md">
          <div className="py-4 px-6">
            <h1 className="text-2xl font-bold mb-2">Weather App</h1>
            <p className="font-medium">Enter a location to get the current weather conditions.</p>
            <div className="mt-4">
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder="Enter location"
                type="text"
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>
          <div className="py-4 px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{data.name || '-'}</h2>
              <div className="font-medium">
                {data.main && <span>{data.main.temp.toFixed()}°C</span>}
                {data.weather && <span className="ml-2">{data.weather[0].main}</span>}
              </div>
            </div>
            {data.name && (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                <p className="font-bold">{data.main.feels_like.toFixed()}°C</p>
                  <p className="font-medium">Feels Like</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{data.main.humidity}%</p>
                  <p className="font-medium">Humidity</p>
                </div>
                <div className="text-center">
                <p className="font-bold">{(data.wind.speed * 3.6).toFixed()} km/h</p>
                  <p className="font-medium">Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
