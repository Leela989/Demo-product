import React, { useState, useRef, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import ChargeModal from '../Charge/ChargeModal';
import ChargeData from '../Charge/Charge.json';
import CustomButton from "../../../../components/Button/CustomButton";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import AutoCompleteField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import LanguageDescription from "../../../../components/language-description/lang-desctiption";
import { useParams } from "react-router-dom";

const Charge = ( { productData } ) => {
  const menuLeft = useRef(null);
  const [chargeTableData, setChargeTableData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const [add, setAdd] = useState(false);
  const [addDailogueBox, setAddDailogueBox] = useState(false);
  const {id, key} = useParams();
  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find(product => product.key === productKey);


  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Charge) {
      setChargeTableData(matchingProduct.data[0].Charge);
    }
  }, [matchingProduct]);
  console.log('jjj', chargeTableData);


  const addRow = (type) => {
   
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

  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderChargeModal = () => {
    return (
      <div className="productStep">
        <div className="topBox">
          <AutoCompleteField
            className="w-1/3"
            name="type"
            label="Type"
            labelType="left"
            dropdown
            value={formData.type}
            onChange={(e) => handleChange("type", e.value)}
          />
          <InputField
            className="w-1/3 ml-2"
            name="Code"
            label="Code"
            labelType="left"
            value={formData.Code}
            onChange={(e) => handleChange("Code", e.target.value)}
          />
          <LanguageDescription
              langDefault={languageDescription1.default}
              langData={langData.data}
              labelName="Long Description"
              onLangUpdate={handleLangUpdate}
              value={formData.longDescription}
              className="w-1/3 ml-4"
            />
        </div>
        <div className="topBox">
          <InputField
            className="w-1/2"
            name="annualRate"
            label="Annual Rate"
            labelType="left"
            value={formData.shortDescription}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <InputField
            className="w-1/3 ml-3"
            name="customerShare"
            label="Customer Share(%)"
            labelType="left"
            value={formData.longDescription}
            onChange={(e) => handleChange("longDescription", e.target.value)}
          />
          <InputField
            className="w-1/3 ml-3"
            name="shortRate"
            label="Short Rate"
            labelType="left"
            value={formData.longDescription}
            onChange={(e) => handleChange("longDescription", e.target.value)}
          />
          <InputField
            className="w-1/3 ml-3"
            name="sortOrder"
            label="Sort Order"
            labelType="left"
            value={formData.longDescription}
            onChange={(e) => handleChange("longDescription", e.target.value)}
          />
           
          
        </div>

        <div className="topBox">
        <div className="checkboxes">
            <CheckBox labelName="Mandatory"/>
          </div>
          <div className="checkboxes">
            <CheckBox labelName="Default"/>
          </div>
          <div className="checkboxes">
            <CheckBox labelName="Allow modification"/>
          </div>
          <div className="checkboxes">
            <CheckBox labelName="Refund"/>
          </div>
        </div>
      
        <div className="topBox">
          <DateField
            className="w-1/2"
            name="effectiveFrom"
            label="Effective From"
            labelType="float"
            value={formData.effectiveFrom}
            onChange={(e) => handleChange("effectiveFrom", e.value)}
          />
          <DateField
            className="w-1/2 ml-2"
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


  const options = [
    { label: "View"},
    { label: "Edit" },
    { label: "Delete" },
  ];

  const handleOptionSelect = (option) => {
    setMenuOpen(null); 
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
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
    return (
      <InputField type={typeofField} value={val} disabled />
    );
  };

  const cellCheckBox = (val) => {
    return (
      <input type="checkbox" checked={val} disabled />
    );
  };

  return (
    <div >
              <div style={{display: 'flex'}}>
              <DataTable value={(id >= productData.length || !productData[id]?.data?.[0]?.Charge) ? [] : chargeTableData} 
                 paginator
                 rows={5}
                 rowsPerPageOptions={[5, 10, 25, 50]}
              header="Charge data">
                <Column  header="Type" body={(rowData) => cellInput(rowData.Type, "text")} />
                <Column  header="Charge" body={(rowData) => cellInput(rowData.Code + '-' + rowData.Description, "text")} />
                <Column  header="Annual Rate" body={(rowData) => cellInput(rowData.Cust_share_perc, "text")} />
                <Column  header="Short Rate" body={(rowData) => cellInput(rowData.shortRate, "text")} />
                <Column  header="Mandatory" body={(rowData) => cellCheckBox(rowData.Mandatory_yn)} />
                <Column  header="Default" body={(rowData) => cellCheckBox(rowData.default)} />
                <Column
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
              </DataTable>
              <div>
          <CustomButton label="ADD" onClick={() => setAddDailogueBox(true)}  className="small-btn mt-4 -ml-16"/>
        </div>
        </div>

        {addDailogueBox  && (
        <>
          <DialogueBox data={renderChargeModal()}
           header={"Charge"}
           setAdd={setAdd}
           yesButtonText="Save"
           noButtonText="Cancel"/>
        </>
      )}
    </div>
  );
}

export default Charge;