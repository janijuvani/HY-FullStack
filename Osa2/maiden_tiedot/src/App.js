import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountries = ({countries, newFilter, setNewFilter}) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  
  if (filteredCountries.length > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  }
  
  if (filteredCountries.length > 1) {
  return (
    <div>
          {filteredCountries.map(country => 
            <div key={country.name.common}>
              {country.name.common}            
            <button onClick={() => setNewFilter(country.name.common)}>show</button>
            </div>
        )}
    </div>
    )}
  
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      console.log(country)
    return(
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br/>
        population {country.population}
      </p>
      <h2>languages</h2>
        {Object.entries(country.languages).map(([key, value]) =>
        <li key={key}>
        {value}
        </li>
       )}
       <br/>
       <img src={country.flags.png}/>
     </div>
    )}
    else {
      return null
    }
  }


  const Filter = ({newFilter, handleFilterChange}) => {
    return(
      <div>
      find countries <input 
                  value={newFilter}
                  onChange={handleFilterChange}/>
      </div>
    )
  }

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

            
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <ShowCountries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter}/> 
    </div>
  )
}

export default App