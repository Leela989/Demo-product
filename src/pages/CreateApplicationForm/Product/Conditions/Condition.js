import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import KebabMen from "../../../../assets/kebab.svg";
import data from "./Conditions.json";
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import CustomButton from "../../../../components/Button/CustomButton";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import LanguageDescription from "../../../../components/language-description/lang-desctiption";
import { useParams } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";

const Conditions = ({ productData }) => {
  const menuLeft = useRef(null);
  const [conditionsData, setConditionsData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [add, setAdd] = useState(false);
  const { id, key } = useParams();
  const [unique_key, set_unique_key] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false); // State to force update
  const [formData, setFormData] = useState({
    Type: "",
    Code: "",
    Description: "",
    Short_description: "",
    Long_description: null,
    Default_yn: true,
    Effective_from: null,
    Effective_to: null,
  });

  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find(
    (product) => product.key === productKey
  );

  const options = [{ name: "Edit" }, { name: "Delete" }];

  const items = [{ label: "View" }, { label: "Edit" }, { label: "Delete" }];

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Conditions) {
      setConditionsData(matchingProduct.data[0].Conditions);
    }
  }, [matchingProduct]);

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={items} popup ref={menuLeft} id={`popup_menu_left_${rowIndex}`} />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls={`popup_menu_left_${rowIndex}`}
          aria-haspopup
        />
        {menuOpen === rowIndex && (
          <div className="kebab-menu-popup">
            {options.map((option, i) => (
              <div
                key={i}
                className="kebab-menu-item"
                onClick={() => {
                  option.onClick(rowData, rowIndex);
                  setMenuOpen(null);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const cellInput = (val, typeofField, tool_tip) => {
    return (
      <div data-pr-tooltip={tool_tip ? val : ""}>
        <InputField type={typeofField} value={val} disabled key={unique_key} />
        <Tooltip target={`[data-pr-tooltip="${val}"]`} />
      </div>
    );
  };

  const cellCheckBox = (val) => {
    return <CheckBox type="checkbox" checked={val} disabled />;
  };

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setForceUpdate((prev) => !prev); // Toggle force update to re-render
  };

  const langData = {
    default: "en",
    data: [
      { code: "en", lang: "English", description: "" },
      { code: "es", lang: "Spanish", description: "" },
    ],
  };

  const handleAddSave = () => {
    setConditionsData((prevData) => [...prevData, formData]);
    setAdd(false);
    setFormData({});
    setForceUpdate((prev) => !prev); // Toggle force update to re-render
  };

  const handleClose = () => {
    setAdd(false);
    setFormData({});
  };

  const list = [
    { name: "01-Warrenty" },
    { name: "02-Applicable Extentions" },
    { name: "03-Exclusion Clauses" },
    { name: "04-Product Wording" },
    { name: "05-Applicable Clauses" },
    { name: "06-Applicable Conditions" },
    { name: "07-Limit of Liability" },
    { name: "08-Third Party Liability" },
    { name: "09-Limitation of Use" },
    { name: "10-Optional Benefits" },
  ];

  const handleInputChange = (name, value) => {
    const updatedValue = value && value.target ? value.target.value : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
    setForceUpdate((prev) => !prev); 
  };

  const handleCheckboxChange = (name, isChecked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: isChecked,
    }));
    setForceUpdate((prev) => !prev); 
  };
  const handleLangUpdate = (updatedLang) => {
    // console.log("Updated Language Data:", updatedLang);
  };

  const renderConditionModal = () => {
    return (
      <div className="productStep">
        <div className="topBox">
          <AutoCompleField
            className="w-1/2"
            name="Type"
            label="Type"
            labelType="left"
            dropdown
            options={list}
            value={formData.Type}
            onChange={(e) => handleInputChange("Type", e.value)}
          />
          <InputField
            className="w-1/2 ml-2"
            name="Code"
            label="Code"
            labelType="left"
            value={formData.Code}
            onChange={(e) => handleInputChange("Code", e.value)}
          />
        </div>
        <div className="topBox">
          <div className="w-1/2">
            <LanguageDescription
              langDefault={langData.default}
              langData={langData.data}
              labelName="Description"
              onLangUpdate={handleLangUpdate}
              value={formData.Description}
            />
          </div>
          <div className="w-1/2 ml-4">
            <LanguageDescription
              langDefault={langData.default}
              langData={langData.data}
              labelName="Short Description1"
              onLangUpdate={handleLangUpdate}
              value={formData.Short_description}
            />
          </div>
        </div>
        <div className="topBox">
          <div className="w-1/2">
            <LanguageDescription
              langDefault={langData.default}
              langData={langData.data}
              labelName="Long Description1"
              onLangUpdate={handleLangUpdate}
              value={formData.longDescription}
            />
          </div>
          <div className="w-1/2 ml-4">
            <LanguageDescription
              langDefault={langData.default}
              langData={langData.data}
              labelName="Long Description2"
              onLangUpdate={handleLangUpdate}
              value={formData.longDescription}
            />
          </div>
        </div>
        <div className="topBox">
          <div className="checkboxes w-1/3">
            <CheckBox
              labelName="Default"
              name="Default_yn"
              checked={formData.Default_yn}
              onChange={(name, checked) => handleCheckboxChange(name, checked)}
              disabled={false}
            />
          </div>
          <DateField
            className="w-1/3 ml-2"
            name="Effective_from"
            label="Effective From"
            labelType="float"
            value={formData.Effective_from}
            onChange={(e) => handleChange("Effective_from", e.value)}
          />
          <DateField
            className="w-1/3 ml-2"
            name="Effective_to"
            label="Effective To"
            labelType="float"
            value={formData.Effective_to}
            onChange={(e) => handleChange("Effective_to", e.value)}
          />
        </div>
      </div>
    );
  };

  const renderConditionsHeader = () => {
    return (
      <div className="flex justify-end">
        <CustomButton
          label="+ Add"
          onClick={() => setAdd(true)}
          className="small-btn"
        />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={conditionsData}
          header={renderConditionsHeader}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            field="Type"
            header="Type"
            style={{ width: "25%" }}
            body={(rowData) => cellInput(rowData.Type, "text", true)}
          />
          <Column
            field="Conditions"
            header="Conditions"
            style={{ width: "55%" }}
            body={(rowData) => cellInput(rowData.Code + "-" + rowData.Description, "text", true)}
          />
          <Column
            field="Default_yn"
            header="Default"
            body={(rowData) => cellCheckBox(rowData.Default_yn)}
          />
          <Column
            body={actionBodyTemplate}
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>
      {add && (
        <DialogueBox
          data={renderConditionModal()}
          header={"Conditions"}
          setAdd={setAdd}
          visible={add}
          yesButtonText="Save"
          noButtonText="Cancel"
          onSave={handleAddSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Conditions;
