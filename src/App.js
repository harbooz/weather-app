import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const [img, setImg] = useState(false);

  const url = `http://api.weatherstack.com/current?access_key=914ab9023f692bd893de4e2d0bf12459&query=${location}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="weather-app">
      <h2 className="title-app">Weather app</h2>
      <div className="searchLocation">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Find city ..."
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <div className="city">{data.location?.name}</div>
          </div>
          <div className="temp">
            <h4>
              <img
                src={data.current?.weather_icons}
                alt={data.current?.weather_descriptions}
              />
            </h4>

            <h1> {data.current?.temperature}°C</h1>
          </div>
          <div className="description">
            {data.current?.weather_descriptions}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            Feels like: <p>{data.current?.feelslike}°C</p>
          </div>
          <div className="humidity">
            Humidity <p>{data.current?.humidity}%</p>
          </div>
          <div className="wind">
            Wind speed
            <p>{data.current?.wind_speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
