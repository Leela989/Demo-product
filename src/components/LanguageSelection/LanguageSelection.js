import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import countryData from './LanguageList.json';
import './LanguageSelect.css';

function LanguageSelection() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const dropdownOptions = countryData.countries.map((country) => ({
    label: (
      <div className="countryOption">
        <img
          src={`https://flagsapi.com/${country.code}/flat/64.png`}
          alt={country.name}
          className="country-flag"
          style={{width: '35px', height: '30px'}}
        />
        <div className="countryLanguage">
          <span className="country-name">{country.name}</span>
          <span className="country-code">{country.language}</span>
        </div>
      </div>
    ),
    value: country.language 
  }));

  return (
    <div>
      <Dropdown
        value={selectedCountry} 
        options={dropdownOptions}
        onChange={(e) =>
          handleSelectCountry(e.value) 
        }
        placeholder="Select Language"
        optionLabel="label"
        className="w-full"
      />
    </div>
  );
}

export default LanguageSelection;
