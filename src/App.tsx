import React, { useEffect, useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({
    main: "",
    description: "",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await fetchWeather();
      setWeather({
        main: data.weather[0].main,
        description: data.weather[0].description,
      });
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The Weather is {weather.main} <br /> {weather.description} <br />
        </p>
      </header>
    </div>
  );
}

export default App;
