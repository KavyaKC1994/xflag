import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search for countries"
        value={searchTerm}
        onChange={handleChange}
        style={{ width: "80%", padding: "10px", fontSize: "18px" }}
      />
      <div className="countryCard">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="country">
            <img src={country.flags.png} alt={country.name.common} />
            <span>{country.name.common}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
