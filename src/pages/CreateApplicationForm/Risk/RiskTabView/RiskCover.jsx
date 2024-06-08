import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import InputField from "../../../../components/InputField/InputField";
import CoverAttributesData from "../MockData/CoverAttributes.json";
import KebabMen from "../../../../assets/kebab.svg";
import CustomButton from "../../../../components/Button/CustomButton";
import AutoCompleteField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import LanguageDescription from "../../../../components/language-description/lang-desctiption";

function RiskCover() {
  const [formData, setFormData] = useState({});
  const [add, setAdd] = useState(false);
  const [addDailogueBox, setAddDailogueBox] = useState(false);

  const checkboxTemplate = () => <CheckBox />;

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const langData = {
    default: "en",
    data: [
      { code: "en", lang: "English", description: "" },
      { code: "es", lang: "Spanish", description: "" },
    ],
  };

  const languageDescription1 = {
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
      { lang: "Spanish", code: "es", description: "" },
    ],
  };

  const OptionsForSIType = [
    { name: "For the Claim" },
    { name: "For the policy Period" },
  ];

  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

  const handleInputChange = () => {};

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <img
          src={KebabMen}
          alt="KebabMen"
          className="KebabMen"
          onClick={() => console.log("clicked")}
        />
      </div>
    );
  };

  const renderCoverModal = () => {
    return (
      <div className="productStep">
        <div className="topBox">
          <InputField
            className="w-1/2 ml-2"
            name="Code"
            label="Code"
            labelType="left"
            value={formData.Code}
            onChange={(e) => handleChange("Code", e.target.value)}
          />
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Description"
            onLangUpdate={handleLangUpdate}
            value={formData.longDescription}
            className="w-1/2 ml-4"
          />
        </div>

        <div className="topBox">
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Long Description"
            onLangUpdate={handleLangUpdate}
            value={formData.longDescription}
            className="w-1/2"
          />
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Short Description"
            onLangUpdate={handleLangUpdate}
            value={formData.longDescription}
            className="w-1/2 ml-4"
          />
        </div>

        <div className="topBox">
          <InputField
            className="w-1/3"
            name="sortOrder"
            label="Sort Order"
            labelType="left"
            value={formData.Code}
            onChange={(e) => handleChange("Code", e.target.value)}
          />
          <InputField
            className="w-1/3 ml-3"
            name="sitype"
            label="SI Type"
            labelType="left"
            value={formData.shortDescription}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <InputField
            className="w-1/3 ml-3"
            name="smiGroup"
            label="SMI Group"
            labelType="left"
            value={formData.longDescription}
            onChange={(e) => handleChange("longDescription", e.target.value)}
          />
        </div>
        <div className="topBox">
        <AutoCompleteField
            name="siValidationType"
            label="SI Validation Type"
            options={OptionsForSIType}
            className="w-1/2"
            // value={rowData.siValidationType}
            dropdown
            onChange={(e) => handleInputChange(e)}
          />
          
          <div className="checkboxes w-1/2 mt-4">
            <CheckBox labelName="SI validation in claim" />
          </div>
        </div>

        <div className="topBox">
          <div className="checkboxes mt-4">
            <CheckBox labelName="Mandatory" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Basic Cover" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Default" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Mid term" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Default on Renewal" />
          </div>
        </div>
        <div className="topBox">
        <div className="checkboxes mt-4">
            <CheckBox labelName="Add SI" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Built-in cover" />
          </div>
         
          <div className="checkboxes mt-4">
            <CheckBox labelName="Add RI SI" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Terrorism" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Refund apl" />
          </div>
          <div className="checkboxes mt-4">
            <CheckBox labelName="Modify rate" />
          </div>
         
        </div>
        

        <div className="topBox">
          <DateField
            className="w-1/2 ml-2 mt-5"
            name="effectiveFrom"
            label="Effective From"
            labelType="float"
            value={formData.effectiveFrom}
            onChange={(e) => handleChange("effectiveFrom", e.value)}
          />
          <DateField
            className="w-1/2 ml-2 mt-5"
            name="effectiveTo"
            label="Effective To"
            labelType="float"
            value={formData.effectiveTo}
            onChange={(e) => handleChange("effectiveTo", e.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={CoverAttributesData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          scrollHeight="200px"
          header="Cover data"
        >
          <Column
            field="cover"
            header="Cover"
            body={(rowData) => (
              <InputField type="text" value={rowData.cover} disabled />
            )}
          />
          <Column
            field="siType"
            header="SI Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.siType} disabled />
            )}
          />
          <Column
            field="siValidationType"
            header="SI Validation Type"
            body={(rowData, rowIndex) => (
              <AutoCompleteField
                name="siValidationType"
                options={OptionsForSIType}
                value={rowData.siValidationType}
                dropdown
                onChange={(e) => handleInputChange(e, rowIndex)}
                disabled
              />
            )}
          />
          <Column
            field="mandatory"
            header="Mandatory"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="bsicCover"
            header="Basic Cover"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="default"
            header="Default"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="defaultOnRenewal"
            header="Default On Renewal"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="addSI"
            header="Add SI"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="addRI"
            header="Add RI SI"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="builtIn"
            header="Built-in"
            body={checkboxTemplate}
            style={{ width: "5%" }}
          ></Column>
          <Column
            header="Action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
        <div>
          <CustomButton
            label="ADD"
            onClick={() => setAddDailogueBox(true)}
            className="small-btn mt-4 -ml-16"
          />
        </div>
      </div>
      {addDailogueBox && (
        <>
          <DialogueBox
            data={renderCoverModal()}
            header={"Cover"}
            setAdd={setAdd}
            yesButtonText="Save"
            noButtonText="Cancel"
          />
        </>
      )}
    </div>
  );
}

export default RiskCover;
