import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { fetchWeather } from "./api/fetchWeather";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

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
    <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            The Weather is {weather.main} <br /> {weather.description} <br />
          </p>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
