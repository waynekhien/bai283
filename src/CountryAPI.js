import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleDelete = async (countryId) => {
    try {
      await axios.delete('https://restcountries.com/v3.1/name/${countryId}');
      fetchCountries(); // Lấy lại danh sách quốc gia sau khi xóa thành công
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div>
      <h2>List of Countries</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <button onClick={() => handleDelete(country.name.common)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;