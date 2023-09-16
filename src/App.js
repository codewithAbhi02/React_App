import './App.css';
import { useState } from 'react';

const api = {
  key: 'f574305d4cdb06f58d850c905f8c253e',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null); // Initialize weather as null
  const [error, setError] = useState(null); // Initialize error as null

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    setError(null); // Reset the error state
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === '404') {
          // Check if the API response contains an error code
          setError('Invalid city/town'); // Set the error state
          setWeather(null); // Clear weather data
        } else {
          setWeather(result);
        }
      })
      .catch((error) => {
        setError('Error fetching data'); // Handle network errors
        setWeather(null); // Clear weather data
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER */}
        <h1>Weather App</h1>

        {/* SEARCH BOX */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town...."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>SEARCH</button>
        </div>

        {/* ERROR MESSAGE */}
        {error && <p>{error}</p>}

        {/* LOCATION */}
        {weather && <p>{weather.name}</p>} {/* Conditionally render location if weather data is available */}
        
        {/* TEMPERATURE */}
        {weather && <p>{weather.main?.temp}°C</p>} {/* Conditionally render temperature if weather data is available */}
        
        {/* CONDITION OF WEATHER */}
        {weather && <p>{weather.weather[0]?.main}</p>} {/* Conditionally render weather condition if weather data is available */}
        {weather && <p>({weather.weather[0]?.description})</p>} {/* Conditionally render weather description if weather data is available */}
      </header>
    </div>
  );
}

export default App;

