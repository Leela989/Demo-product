import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useMemo, useState } from "react";
import { getMasterData } from "../../../mock-data/master";
import InputField from "../../../components/InputField/InputField";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../components/DateField/Datefield";
import LanguageDescription from "../../../components/language-description/lang-desctiption";
import { Button } from "primereact/button";
import CustomButton from "../../../components/Button/CustomButton";

const PlanFormfields = () => {
  let { languageDescription, plan } = getMasterData;
  const initialdata = {
    type: {},
    description: languageDescription,
    code: "",
    product: "",
    effectiveFrom: "",
    effectiveTo: "",
  };
  const [formData, setFormData] = useState(initialdata);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      description: languageDescription,
    }));
  }, []);

  const selections = [
    { name: "Plan", code: "01" },
    { name: "Scheme", code: "02" },
  ];

  const handleChange = () => {
    console.log("data sample");
  };

  const handleLangChnages = (updatedlang) => {
    const descripData = formData.description;
    descripData.data.map(value =>{
      if(value.code === updatedlang?.code) {
        value.description = updatedlang.description
      }})
      console.log(descripData, 'descripData');
  }
  

  return (
    <Card className="form-card">
      <div className="dropdown-container p-1 w-1/4">
        <label>Product-Type</label>
        <Dropdown
          value={formData.type.name}
          onChange={(e) => setFormData({ ...formData, type: e.value })}
          options={selections}
          optionLabel="name"
          placeholder="Select Type"
          className="w-full"
        />
      </div>
      <div className={"p-1 w-2/4"}>
        <LanguageDescription langData={formData.description} onLangUpdate={handleLangChnages} />
      </div>
      <InputField
        className={"p-1 w-1/4"}
        type={"text"}
        label={"Code"}
        onChange={handleChange}
      />
      <AutoCompleteField
        className={"p-1 w-1/4"}
        name={"Product"}
        label={"Product"}
        value={formData.product}
        options={plan.products}
        optionLabel={"name"}
        onChange={handleChange}
        dropdown
      />
      <DateField
        className={"p-1 w-1/4"}
        name="effectiveFrom"
        label="Effective From"
        value={formData.effectiveFrom}
        onChange={handleChange}
      />
      <DateField
        className={"p-1 w-1/4"}
        name="effectiveTO"
        label="Effective To"
        value={formData.effectiveFrom}
        onChange={handleChange}
      />
      <div className="p-1 w-1/4 flex items-end justify-end">
        <CustomButton label={"Save"} />
      </div>
    </Card>
  );
};

export default PlanFormfields;
