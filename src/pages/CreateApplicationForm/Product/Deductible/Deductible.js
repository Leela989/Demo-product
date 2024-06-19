import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import deductibleData from "./Deductible.json";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import KebabMen from "../../../../assets/kebab.svg";
import DeductibleModal from "../Deductible/DeductibleModal";
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import CustomButton from "../../../../components/Button/CustomButton";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import LanguageDescription from "../../../../components/language-description/lang-desctiption";
import { useParams } from "react-router-dom";

const Deductible = ({ productData }) => {
  const menuLeft = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [addDailogueBox, setAddDailogueBox] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [formData, setFormData] = useState({});
  const [add, setAdd] = useState(false);
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find(
    (product) => product.key === productKey
  );

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Deductible) {
      setTableData(matchingProduct.data[0].Deductible);
    }
  }, [matchingProduct]);

  const options = [{ label: "View" }, { label: "Edit" }, { label: "Delete" }];

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

  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

  const closeModal = () => {
    setAddDailogueBox(false);
    setRowDetails(null);
  };

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const list = [
    { name: "01- % of Sum Insured" },
    { name: "02- % of Claim" },
    { name: "03- Fixed Value" },
    { name: "04- No. of Days" },
    { name: "05- % of AOA" },
    { name: "06- Others" },
    {name : "07- Hours"},
    {name : "08- % of subject to Maxmium value"},
    {name : "09- % of sibject to Minimum value"}
  ];

  const renderDeductibleModal = () => {
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
            onChange={(e) => handleChange("type", e.value)}
          />
          <InputField
            className="w-1/2 ml-4"
            name="Code"
            label="Code"
            labelType="left"
            value={formData.Code}
            onChange={(e) => handleChange("Code", e.target.value)}
          />
        </div>
        <div className="topBox">
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Short Description"
            onLangUpdate={handleLangUpdate}
            value={formData.longDescription}
            className="w-1/2"
          />
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Long Description"
            onLangUpdate={handleLangUpdate}
            value={formData.longDescription}
            className="w-1/2 ml-4"
          />
        </div>
        <div className="topBox">
          <InputField
            className="w-1/2"
            name="percentage"
            label="Percentage"
            labelType="left"
            value={formData.shortDescription}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <InputField
            className="w-1/2 ml-3"
            name="value"
            label="Value"
            labelType="left"
            value={formData.longDescription}
            onChange={(e) => handleChange("longDescription", e.target.value)}
          />
        </div>

        <div className="topBox">
          <div className="checkboxes mt-4">
            <CheckBox labelName="Default" />
          </div>
          <DateField
            className="w-1/3 mt-4"
            name="effectiveFrom"
            label="Effective From"
            labelType="float"
            value={formData.effectiveFrom}
            onChange={(e) => handleChange("effectiveFrom", e.value)}
          />
          <DateField
            className="w-1/3 ml-2 mt-4"
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

  const render_deductible_header = () => {
    return (
      <div className="flex justify-end">
      <CustomButton
        label="+ADD"
        onClick={() => setAddDailogueBox(true)}
        className="small-btn"
      />
    </div>
    )
    
  };

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const cellInput = (val, typeofField) => {
    return <InputField type={typeofField} value={val} disabled />;
  };

  const cellCheckBox = (val) => {
    return <input type="checkbox" checked={val} disabled />;
  };

  const handleSave = () => {
    setTableData((prev) => [...prev, formData]);
  };

  const handleClose = () => {
    addDailogueBox(false);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={tableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          header={render_deductible_header}
        >
          <Column
            header="Type"
            style={{width: '33%'}}
            body={(rowData) => cellInput(rowData.Type, "text")}
          />
          <Column
            header="Deductible"
            style={{width: '45%'}}
            body={(rowData) =>
              cellInput(rowData.Code + "-" + rowData.Description, "text")
            }
          />
          <Column
            header="Percentage"
            body={(rowData) => cellInput(rowData.Perc, "text")}
          />
          <Column
            header="Value"
            body={(rowData) => cellInput(rowData.Value, "text")}
          />
          <Column
            header="Default"
            body={(rowData) => cellCheckBox(rowData.Default_yn)}
          />
          <Column
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
        <div></div>
      </div>
      {addDailogueBox && (
        <>
          <DialogueBox
            data={renderDeductibleModal()}
            header={"Deductible"}
            setAdd={setAdd}
            yesButtonText="Save"
            onSave={handleSave}
            onClose={closeModal}
            visible={addDailogueBox}
            noButtonText="Cancel"
          />
        </>
      )}
    </div>
  );
};

export default Deductible;
