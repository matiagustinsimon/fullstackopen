import {useState, useEffect} from 'react'
import axios from 'axios'

const itMatch = (first, second) => first.toLowerCase().includes(second.toLowerCase())

const ListCountry = ({country, search}) => {
    const handleShow = () => search(country.name.common)
    return(<li>{country.name.common} <button onClick={handleShow}>Show</button></li>)
}

const ShowMatchingList = ({countries, search}) => {
    console.log(countries);
    return (
        <ul>
            {countries.map(country => (<ListCountry key={country.cca3} country={country} search={search}/>))}
        </ul>
    )
}

const ListLanguages = ({languages}) => {
    return languages.map(language => (<li key={language}>{language}</li>))
}

const ShowWeather = ({weather, country}) => {
    if (!weather) return <p>Loading weather...</p>

    const icon = weather.weather[0].icon
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <dl>
                <dt>Temperature:</dt>
                <dd>{weather.main.temp} Celsius</dd>
            </dl>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon"/>
            <dl>
                <dt>Wind:</dt>
                <dd>{weather.wind.speed} m/s</dd>
            </dl>
        </div>
    )
}

const ShowCountryInfo = ({country}) => {
    const [weather, setWeather] = useState(null)
    const languagesArray = Object.values(country.languages || {});
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`)
        .then(res => {setWeather(res.data);})
    },[country.capital])
    console.log(weather);

    return (
        <>
            <h1>{country.name.common}</h1>
            <dl>
                <dt>Capital:</dt>
                <dd>{country.capital}</dd>

                <dt>Area:</dt>
                <dd>{country.area}</dd>
            </dl>
            <h2>Languages</h2>
            <ul>
                <ListLanguages languages={languagesArray} />
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
            <ShowWeather weather={weather} country={country}/>
        </>
    )
}

const ShowCountry = ({countries, search}) => {
    const countriesSize = countries.length
    if (countriesSize === 0) {
        return <p>Type a country name</p>
    }
    if (countriesSize > 1 && countriesSize <= 10) {
        return <ShowMatchingList countries={countries} search={search} />
    }
    if (countriesSize > 10) {
        return <p>Too many matches specify another filter</p>
    }
    return (
        <ShowCountryInfo country={countries[0]} />
    )
}

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    const getAll = () => {
        axios.get(url).then((response) => {setCountries(response.data)})
    }

    const handleSearch = () => {
        setCountriesToShow(countries.filter(country => itMatch(country.name.common, search)))
    }

    useEffect(getAll, []);
    useEffect(handleSearch, [search, countries]);

    const handleChange = (event) => setSearch(event.target.value)
    return (
        <div>
            find countries <input value={search} onChange={handleChange}/>
            <ShowCountry countries={countriesToShow} search={setSearch} />
        </div>
    )
}

export default App