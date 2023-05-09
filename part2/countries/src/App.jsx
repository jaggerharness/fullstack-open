import { useState } from "react";
import { useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const SearchCountries = ({ searchQuery, handleSearchChanged }) => {
  return (
    <>
      find countries
      <input value={searchQuery} onChange={handleSearchChanged} />
    </>
  );
};

const SearchResults = ({ searchQuery, countryList, handleShowClick }) => {
  if (searchQuery === "") {
    return <p>Enter a search query to filter countries.</p>;
  }

  if (countryList.length > 10) {
    return <p>Too many matches, specify another filter!</p>;
  }

  if (countryList.length === 0) {
    return <p>No countries found that match that search filter.</p>;
  }

  if (countryList.length === 1) {
    return <CountryDetails country={countryList[0]} />;
  }

  return countryList.map((country) => (
    <p key={country.name.common}>
      {country.name.common}
      <button value={country.name.common} onClick={handleShowClick}>
        show
      </button>
    </p>
  ));
};

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area Code: {country.area}</div>
      <h3>Languages</h3>
      <LanguageList languages={country.languages} />
      <img alt={country.flags.alt} src={country.flags.png}></img>
      <Weather country={country} />
    </>
  );
};

const LanguageList = ({ languages }) => {
  return (
    <div>
      <ul>
        {Object.values(languages).map((language, key) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const convertFromKelvin = (temp) =>
    (((temp - 273.15) * 9) / 5 + 32).toFixed(2);

  useEffect(() => {
    weatherService
      .fetchWeather(country)
      .then((weatherData) => {
        console.log(weatherData);
        setWeatherData(weatherData);
      })
      .catch((error) => {
        setWeatherData(null);
      });
  }, []);

  return weatherData !== null ? (
    <>
      <h3>Weather in {weatherData.name}</h3>
      <div>Temperature: {convertFromKelvin(weatherData.main.temp)}</div>
      <div>
        It is {weatherData.weather[0].main}
        <img alt="test" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}></img>
        in {weatherData.name}!
      </div>
      
    </>
  ) : (
    <div>An unexpected error occurred while fetching weather data.</div>
  );
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountryList(response.data);
    });
  }, []);

  const handleSearchChanged = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleShowClick = (event) => setSearchQuery(event.target.value);

  const filteredCountries = countryList.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchCountries
        searchQuery={searchQuery}
        handleSearchChanged={handleSearchChanged}
      />
      <SearchResults
        searchQuery={searchQuery}
        countryList={filteredCountries}
        handleShowClick={handleShowClick}
      />
    </>
  );
}

export default App;
