import {useState, useEffect} from 'react'
import axios from 'axios'

const itMatch = (first, second) => first.toLowerCase().includes(second.toLowerCase())

const ShowMatchingList = ({countries}) => {
    return (
        <div>
            {countries.map(country => (<li key={country.cca3}>{country.name.common}</li>))}
        </div>
    )
}

const ListLanguages = ({languages}) => {
    return languages.map(language => (<li key={language}>{language}</li>))
}

const ShowCountry = ({countries}) => {
    console.log(`Array: ${countries}`);
    const countriesSize = countries.length
    if (countriesSize === 0) {
        return <p>Type a country name</p>
    }
    if (countriesSize > 1 && countriesSize <= 10) {
        return <ShowMatchingList countries={countries} />
    }
    if (countriesSize > 10) {
        return <p>Too many matches specify another filter</p>
    }
    const country = countries[0]
    const languagesArray = Object.values(country.languages || {});

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h1>Languages</h1>
            <ul>
                <ListLanguages languages={languagesArray} />
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        </>
    )
}

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])
    console.log(`Search: ${search}`);
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
            <ShowCountry countries={countriesToShow} />
        </div>
    )
}

export default App