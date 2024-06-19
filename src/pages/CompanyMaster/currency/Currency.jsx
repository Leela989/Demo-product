import React, { useState, useEffect } from "react";
import InputField from "../../../components/InputField/InputField";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import BaseCurrencyData from "./CurrencyData.json";
import "../CompanyMaster.css";

function Currency() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [currencyDefinition, setCurrencyDefinition] = useState("");
  
  const baseCurrencyOptions = [
    { name: "INR", fullDefinition: "Indian Rupees" },
    { name: "USD", fullDefinition: "United States Dollar" },
    { name: "EUR", fullDefinition: "Euro" },
    { name: "GBP", fullDefinition: "British Pound" },
    { name: "JPY", fullDefinition: "Japanese Yen" },
    { name: "CNY", fullDefinition: "Chinese Yuan Renminbi" },
  ];
  

  useEffect(() => {
    const selectedCurrency = baseCurrencyOptions.find(
      (currency) => currency.name === baseCurrency
    );
    if (selectedCurrency) {
      console.log('selected', selectedCurrency.fullDefinition);
      setCurrencyDefinition(selectedCurrency.fullDefinition);
    } else {
      console.log('try');
      setCurrencyDefinition("hellooo");
    }
    console.log('currencyDefinition', currencyDefinition);
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (name, val) => {
    setBaseCurrency(val);
  };

  return (
    <div>
      <div className="currencyTable">
        <div style={{ display: "flex" }}>
          <div>
            <p>Base Currency1</p>
          </div>
          <AutoCompleteField
            className="w-1/4 p-1 ml-5"
            name="baseCurrency"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
            options={baseCurrencyOptions}
            dropdown
          />
          <InputField
            className="w-1/4 p-1"
            name="code"
            value={currencyDefinition}
            onChange={() => {}}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <p>Base Currency2</p>
          </div>
          <AutoCompleteField
            className="w-1/4 p-1 ml-5"
            name="baseCurrency"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
            options={baseCurrencyOptions}
            dropdown
          />
          <InputField
            className="w-1/4 p-1"
            name="code"
            value={currencyDefinition}
            onChange={() => {}}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <p>Base Currency3</p>
          </div>
          <AutoCompleteField
            className="w-1/4 p-1 ml-5"
            name="baseCurrency"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
            options={baseCurrencyOptions}
            dropdown
          />
          <InputField
            className="w-1/4 p-1"
            name="code"
            value={currencyDefinition}
            onChange={() => {}}
          />
        </div>
      </div>
      
    </div>
  );
}

export default Currency;
