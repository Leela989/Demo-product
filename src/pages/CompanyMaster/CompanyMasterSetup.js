import React, { useState, useRef, useEffect } from "react";
import InputField from "../../components/InputField/InputField";
import DateField from "../../components/DateField/Datefield";
import CustomButton from "../../components/Button/CustomButton";
import LanguageDescription from "../../components/language-description/lang-desctiption";
import CompanyMasterTabs from "./CompanyMasterTabs";

export default function CompanyMasterSetup() {
  const [formData, setFormData] = useState([]);
  const [langData, setLangData] = useState({
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
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

  const [shortLangData, setShortLangData] = useState({
    default: "en",
    data: [
      { code: "en", lang: "English", description: "" },
      { code: "es", lang: "Spanish", description: "Descripción en español" },
    ],
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLangUpdate = (updatedLang) => {
    // console.log("Updated Language Data:", updatedLang);
  };

  const onClickingSave = () => {};

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="code"
            label="Code"
            value={formData.code}
            onChange={handleInputChange}
            mandatory={true}
          />

          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Description"
            className="w-1/3 p-1"
            onLangUpdate={handleLangUpdate}
          />
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={shortLangData.data}
            labelName="Short Description"
            className="w-1/3 p-1"
            onLangUpdate={handleLangUpdate}
          />
        </div>
        <div>
          <InputField
            className="w-3/3"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
            mandatory={true}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="logo"
            label="Logo"
            value={formData.logo}
            onChange={handleInputChange}
            mandatory={true}
          />
          <div className="mt-5 w-1/3 text-center text-blue">
            <a href="#" className="text-blue">Upload</a>
          </div>

          <div className="mt-5">
            <CustomButton label="Save" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CompanyMasterTabs />
      </div>
    </div>
  );
}
