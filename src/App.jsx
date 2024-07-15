import axios from "axios"
import './App.css'
import { useState } from "react";

function App() {
  
  const API_key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

  const [city,setCity] = useState("");
  const [data,setData] = useState();

  const fetchWeatherData = async() => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
      setData(response.data); 
      console.log(response.data);
    }
    catch(err) {
      alert('Enter your city name');
    }
  }
  return (
    <>
      <div className="weather-input-wrap">
        <h1>Weather App</h1>
        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter City Name" />
        <button onClick={fetchWeatherData}>Fetch</button>
      </div>
      
      {data && (
        <div className="weather-report">
          <h2>{data.name}, {data.sys.country}</h2>
          <div className="weather-info">
            <div className="weather-temp">
              Temp {Math.round(data.main.temp)} C <br/>
              Feels Like {data.main.feels_like} 
            </div>
            <div className="coordinates">
              <p>Latitude - {data.coord.lat}</p>
              <p>Longitude - {data.coord.lon}</p>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default App
