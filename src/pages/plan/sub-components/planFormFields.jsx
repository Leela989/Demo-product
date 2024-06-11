import React, { useEffect, useMemo, useState, useRef } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { getMasterData } from "../../../mock-data/master";
import InputField from "../../../components/InputField/InputField";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../components/DateField/Datefield";
import LanguageDescription from "../../../components/language-description/lang-desctiption";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import CustomButton from "../../../components/Button/CustomButton";
import { getPlanScheme } from "../../../mock-data/plan/plan-table";

const PlanFormfields = ({ data, onUpdate }) => {
  let { languageDescription, plan } = getMasterData;
  const initialdata = {
    type: {},
    description: languageDescription,
    code: "",
    product: "",
    effectiveFrom: "",
    effectiveTo: "",
  };
  const [formData, setFormData] = useState(data);
  const toast = useRef(null);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      description: languageDescription.data,
    }));
  }, []);

  const selections = [
    { name: "Plan", code: "01" },
    { name: "Scheme", code: "02" },
  ];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLangChnages = (updatedlang) => {
    const descripData = formData.description;
    descripData.map((value) => {
      if (value.code === updatedlang?.code) {
        value.description = updatedlang.description;
      }
    });
  };

  const handleSave = () => {
    if (formData === initialdata) {
      console.log("Please Update the Data");
    }
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Form Data Saves Successfully",
    });
    onUpdate(formData);
  };

  const memoizedDropdown = useMemo(
    () => (
      <Dropdown
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.value })}
        options={selections}
        optionLabel="name"
        placeholder="Select Type"
        className="w-full"
      />
    ),
    [formData.type]
  );

  return (
    <Card className="form-card">
      <Toast ref={toast} />
      {formData ? (
        <>
          <InputField
            value={formData.code}
            className={"p-1 w-1/4 form-field"}
            type={"text"}
            name={"code"}
            label={"Code"}
            onChange={handleChange}
          />
          <div className="dropdown-container form-field p-1 w-1/4">
            <label>Product-Type</label>
            {memoizedDropdown}
          </div>
          <div className={"p-1 w-2/4 form-field"}>
            <LanguageDescription
              langDefault={languageDescription.default}
              langData={formData.description}
              onLangUpdate={handleLangChnages}
            />
          </div>
          <AutoCompleteField
            className={"p-1 w-1/4 form-field"}
            name={"product"}
            label={"Product"}
            value={formData.product}
            options={plan.products}
            optionLabel={"name"}
            onChange={handleChange}
            dropdown
          />
          <DateField
            className={"p-1 w-1/4 form-field"}
            name="effectiveFrom"
            label="Effective From"
            value={formData.effectiveFrom}
            onChange={handleChange}
          />
          <DateField
            className={"p-1 w-1/4 form-field"}
            name="effectiveTo"
            label="Effective To"
            value={formData.effectiveFrom}
            onChange={handleChange}
          />
          <div className="p-1 w-1/4 flex items-end justify-end form-field-action">
            <CustomButton onClick={handleSave} label={"Save"} />
          </div>
        </>
      ) : null}
    </Card>
  );
};

export default PlanFormfields;
