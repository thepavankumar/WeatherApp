import React, { useState } from "react";

const api = {
  key: "3f876e90419060e49e35b7abb940e987",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const fetchWeather = (evt) => {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search">
          <input
            type="text"
            className="bar"
            placeholder="Search Location(Ex: Bengaluru)"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="btn" type="submit" onClick={fetchWeather}>
            Search
          </button>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.floor(weather.main.temp)}
                <sup>o</sup>C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Weather;
