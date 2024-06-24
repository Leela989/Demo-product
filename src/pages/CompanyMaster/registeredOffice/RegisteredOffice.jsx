import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import InputField from "../../../components/InputField/InputField";
import "../CompanyMaster.css";
import CustomButton from "../../../components/Button/CustomButton";
import LanguageDescription from "../../../components/language-description/lang-desctiption";

function RegisteredOffice() {
  const [formData, setformData] = useState({});
  const [langData, setLangData] = useState({
    default: "en",
    data: [
      { lang: "English", code: "en", description: formData.description },
      { lang: "Spanish", code: "es", description: "Descripción en español" },
    ],
  });

  const languageDescription1 = {
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
      { lang: "Spanish", code: "es", description: "" },
    ],
  };

  const handleLangUpdate = (updatedLang) => {
    // console.log("Updated Language Data:", updatedLang);
  };

  const [shortLangData, setShortLangData] = useState({
    default: "en",
    data: [
      { code: "en", lang: "English", description: formData.shortDescription },
      { code: "es", lang: "Spanish", description: "Descripción en español" },
    ],
  });
  const handleInputChange = () => {};
  return (
    <div>
      <div className="currencyTable">
        <div style={{ display: "flex" }}>
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Registered office address"
            className="w-3/4 p-1"
            onLangUpdate={handleLangUpdate}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="postalZip"
            label="Postal ZIP"
            value={formData.address4}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="telephone"
            label="Telephone"
            value={formData.address5}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="fax"
            label="Fax"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="email"
            label="E-mail"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="website"
            label="Website"
            value={formData.contactPerson}
            onChange={handleInputChange}
          />
          <div className="mt-5 ml-8">
            <CustomButton label="SAVE" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredOffice;
