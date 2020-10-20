import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        console.log(response.data.current);
        setWeather(response.data.current);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.capital]);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img style={{ width: "100px" }} src={country.flag} alt={country.flag} />

      <h3>Weather in {country.capital}</h3>
      <p>
        <strong>temperature:</strong> {weather.temperature} Celsius
      </p>
      <img src={weather.weather_icons} alt={weather.weather_icons} />
      <p>
        <strong>wind:</strong> {weather.wind_speed}mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchChangedHandler = (event) => {
    setSearch(event.target.value);
  };

  const showCountryHandler = (name) => {
    setSearch(name);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  let result = null;
  if (filteredCountries.length > 10) {
    result = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    result = filteredCountries.map((country) => (
      <p key={country.name}>
        {country.name}{" "}
        <button onClick={() => showCountryHandler(country.name)}>show</button>
      </p>
    ));
  } else if (filteredCountries.length === 1) {
    result = <Country country={filteredCountries[0]} />;
  } else {
    result = <p>No countries match your search</p>;
  }

  return (
    <div>
      <p>
        find countries <input value={search} onChange={searchChangedHandler} />
      </p>
      {result}
    </div>
  );
};

export default App;
