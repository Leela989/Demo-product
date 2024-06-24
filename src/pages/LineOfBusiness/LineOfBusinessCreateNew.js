import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import DateField from "../../components/DateField/Datefield";
import CustomButton from "../../components/Button/CustomButton";
import LanguageDescription from "../../components/language-description/lang-desctiption";
import data from "./applicableBranches.json";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function LineOfBusinessCreateNew() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

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
  }


  const handleLangUpdate = (updatedLang) => {
    // console.log("Updated Language Data:", updatedLang);
  };

  const onClickingSave = () => {
    console.log("saved");
  };
  return (
    <div>
      <div className="product-step">
        <InputField
          className="w-1/4 p-1"
          name="Code"
          label="Code"
          value={formData.code}
          onChange={handleInputChange}
        />
        <div className="w-3/4 p-1">
          <LanguageDescription
              langDefault = {languageDescription1.default}
              langData={langData.data}
            labelName="Description"
            className="w-3/4 p-1"
            onLangUpdate={handleLangUpdate}
          />
        </div>

        <DateField
          className="w-1/4 p-1"
          name="effectiveFrom"
          label="Effective From"
          value={formData.effectiveFrom}
          onChange={handleInputChange}
        />
        <DateField
          className="w-1/4 p-1"
          name="effectiveTo"
          label="Effective To"
          value={formData.effectiveTo}
          onChange={handleInputChange}
        />

        <div className="w-1/4 flex  justify-end p-1">
          <CustomButton
            label={"Save"}
            className="custombtns me-1"
            onClick={onClickingSave}
          />
        </div>
      </div>
      <div className="lobTables">
        <div className="branchTable">
          <DataTable
            value={data}
            header={"Applicable branches"}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="name"
              header="Office"
              body={(rowData) => (
                <InputField type="text" value={rowData.name} />
              )}
            />
          </DataTable>
        </div>
        <div className="departmentTable">
          <DataTable
            value={data}
            header={"Applicable department"}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="name"
              header="Department"
              body={(rowData) => (
                <InputField type="text" value={rowData.name} />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default LineOfBusinessCreateNew;
