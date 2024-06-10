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

const Conditions = ({ productData }) => {
  const menuLeft = useRef(null);
  const [conditionsData, setConditionsData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [add, setAdd] = useState(false);
  const { id, key } = useParams();
  const [formData, setFormData] = useState({});
  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find((product) => product.key === productKey);

  const options = [{ name: "Edit" }, { name: "Delete" }];

  const items = [
    { label: "View" },
    { label: "Edit" },
    { label: "Delete" }
  ];

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Conditions) {
      setConditionsData(matchingProduct.data[0].Conditions);
    }
  }, [matchingProduct]);

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
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

  const cellInput = (val, typeofField) => {
    return <InputField type={typeofField} value={val} disabled />;
  };

  const cellCheckBox = (val) => {
    return <input type="checkbox" checked={true} disabled />;
  };

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

  const handleAddSave = () => {
    setConditionsData((prevData) => [...prevData, formData]);
    setAdd(false);
    setFormData({});
  };

  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

  const handleClose = () => {
    setAdd(false);
    setFormData({});
  };

  const list = [
    {name : "01"},
    {name : "02"},
    {name : "03"},
    {name : "04"},
    {name : "05"},
    {name : "06"}
  ]

  const renderConditionModal = () => {
    return (
      <div className="productStep">
        <div className="topBox">
          <AutoCompleField
            className="w-1/2"
            name="type"
            label="Type"
            labelType="left"
            dropdown
            options={list}
            value={formData.type}
            onChange={(e) => handleChange("Type", e.value)}
          />
          <InputField
            className="w-1/2 ml-2"
            name="Code"
            label="Code"
            labelType="left"
            value={formData.Code}
            onChange={(e) => handleChange("Code", e.target.value)}
          />
        </div>
        <div className="topBox">
          <div className="w-1/2">
            <LanguageDescription
              langDefault={langData.default}
              langData={langData.data}
              labelName="Description"
              onLangUpdate={handleLangUpdate}
              value={formData.longDescription}
            />
          </div>
          <div className="w-1/2 ml-4">
            <LanguageDescription
              langDefault={langData.default}
              langData={langData.data}
              labelName="Short Description1"
              onLangUpdate={handleLangUpdate}
              value={formData.longDescription}
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
            <CheckBox labelName="Default" />
          </div>
          <DateField
            className="w-1/3 ml-2"
            name="effectiveFrom"
            label="Effective From"
            labelType="float"
            value={formData.effectiveFrom}
            onChange={(e) => handleChange("effectiveFrom", e.value)}
          />
          <DateField
            className="w-1/3 ml-2"
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
          value={id >= productData.length || !productData[id]?.data?.[0]?.Conditions ? [] : conditionsData}
          header="Conditions data"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            field="Type"
            header="Type"
            style={{ width: "15%" }}
            body={(rowData) => cellInput(rowData.Type, "text")}
          />
          <Column
            field="Conditions"
            header="Conditions"
            body={(rowData) => cellInput(rowData.Code + '-' + rowData.Description, "text")}
          />
          <Column
            field="Default On Renewal"
            header="Default"
            body={(rowData) => cellCheckBox(rowData.Default_yn)}
          />
          <Column
            body={(rowData, options) => actionBodyTemplate(rowData, options.rowIndex)}
            style={{ width: "5%" }}
          />
        </DataTable>
        <div>
          <CustomButton label="ADD" onClick={() => setAdd(true)} className="small-btn mt-4 -ml-16" />
        </div>
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
