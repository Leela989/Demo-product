import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import discountdata from "./DiscountLoading.json";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import { useParams } from 'react-router-dom';
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CustomButton from "../../../../components/Button/CustomButton";
import LanguageDescription from "../../../../components/language-description/lang-desctiption";
import { useLocation } from "react-router-dom";

const DiscountLoading = ({ productData }) => {
  const menuLeft = useRef(null);
  const { id, key } = useParams();
  const [discounttableData, setDiscountTableData] = useState(discountdata);
  const [add, setAdd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [tableData, setTableData] = useState([]);
  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find(product => product.key === productKey);
  const location = useLocation();

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Discount) {
      setTableData(matchingProduct.data[0].Discount);
    }
  }, [matchingProduct]);

  const [formData, setFormData] = useState({
    type: "",
    code: "",
    description: "",
    shortDescription: "",
    longDescription: "",
    mandatory: false,
    DefaultOnRenewal: false,
    rateModify: false,
    default: false,
    effectiveFrom: null,
    effectiveTo: null,
    sortOrder: "",
  });

  const handleInputChange = (name, value) => {
    const updatedValue = value && value.target ? value.target.value : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleAddSave = () => {
    const editedData = { ...formData };
    const newData = [...discounttableData];

    if (selectedRow !== null) {
      newData[selectedRow] = editedData;
    } else {
      newData.push(editedData);
    }

    setDiscountTableData(newData);
    setAdd(false);
    setSelectedRow(null);
  };

  const handleEdit = (rowData, rowIndex) => {
    setSelectedRow(rowIndex);
    setFormData({ ...rowData });
    setAdd(true);
  };

  const handleDelete = () => {
    const newData = [...discounttableData];
    newData.splice(selectedRow, 1);
    setDiscountTableData(newData);
    setDeletePopup(false); // Change to false to close the delete popup
  };

  const items = [
    { label : "View"},
    {
      label: "Edit",
      command: () => handleEdit(selectedRow),
    },
    {
      label: "Delete",
      command: () => setDeletePopup(true), // Set to true to open the delete popup
    },
  ];

  const list = [
    { name: "10 Motor" },
    { name: "20 Fire" },
    { name: "30 Marine" },
    { name: "40 Engineering" },
    { name: "50 Miscellaneous and Accident" },
    { name: "60 Liability" },
    { name: "70 Bonds" },
    { name: "80 Aviation" },
    { name: "90 Package" },
    { name: "91 Agriculture" },
  ];

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const onChange = (name, value) => {
    const updatedValue = value && value.target ? value.target.value : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleCheckboxChange = (name, isChecked) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: isChecked,
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

  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

  const discountPopUp = () => {
    return (
      <div>
        <div className="productStep">
          <div className="topBox">
            <AutoCompleField
              className="w-1/3 p-1"
              name="type"
              label="Type"
              labelType="left"
              options={list}
              dropdown
              onChange={handleInputChange}
              value={formData.type}
            />
            <InputField
              className="w-1/3 p-1"
              name="code"
              label="Code"
              labelType="left"
              onChange={handleInputChange}
              value={formData.code}
            />
            <LanguageDescription
              langDefault={languageDescription1.default}
              langData={langData.data}
              labelName="Description"
              className="w-1/2 p-1"
              onLangUpdate={handleLangUpdate}
              value={formData.longDescription}
            />
          </div>
          <div className="topBox">
            <div className="w-1/2 p-1">
              <LanguageDescription
                langDefault={languageDescription1.default}
                langData={langData.data}
                labelName="Long Description"
                className="w-2/2 p-1"
                onLangUpdate={handleLangUpdate}
                value={formData.longDescription}
              />
            </div>
            <div className="w-1/2 p-1">
              <LanguageDescription
                langDefault={languageDescription1.default}
                langData={langData.data}
                labelName="Short Description"
                className="w-2/2 p-1"
                onLangUpdate={handleLangUpdate}
                value={formData.longDescription}
              />
            </div>
          </div>
          <div className="topBox">
            <div className="checkboxes w-1/5">
              <CheckBox
                labelName="Mandatory"
                name="mandatory"
                onChange={handleCheckboxChange}
                checked={formData.mandatory}
              />
            </div>
            <div className="checkboxes w-2/5">
              <CheckBox
                labelName="Default On Renewal"
                name="DefaultOnRenewal"
                onChange={handleCheckboxChange}
                checked={formData.DefaultOnRenewal}
              />
            </div>
            <div className="checkboxes w-1/5">
              <CheckBox
                labelName="Rate Modify"
                name="rateModify"
                onChange={handleCheckboxChange}
                checked={formData.rateModify}
              />
            </div>
            <div className="checkboxes w-1/5">
              <CheckBox
                labelName="Default"
                name="default"
                onChange={handleCheckboxChange}
                checked={formData.default}
              />
            </div>
          </div>
          <div className="topBox">
            <div className="checkboxes w-1/4">
              <CheckBox
                labelName="NCB "
                onChange={handleCheckboxChange}
                checked={formData.NCB}
              />
            </div>
            <div className="checkboxes w-2/4">
              <CheckBox
                labelName="Add RI SI"
                onChange={handleCheckboxChange}
                checked={formData.addRI}
              />
            </div>
            <div className="checkboxes w-1/4">
              <CheckBox
                labelName="Commission apl"
                onChange={handleCheckboxChange}
                checked={formData.commissionApl}
              />
            </div>
            
          </div>
          <div className="topBox">
            <InputField
              className=""
              name="sortOrder"
              label="Sort Order"
              labelType="left"
              onChange={onChange}
              value={formData.sortOrder}
            />
            <DateField
              className="w-2/4 ml-1"
              name="effectiveFrom"
              label="Effective From"
              labelType="left"
              onChange={(e) => handleInputChange("effectiveFrom", e)}
              value={formData.effectiveFrom}
            />
            <DateField
              className="w-2/4 ml-1"
              name="effectiveTo"
              label="Effective To"
              labelType="left"
              onChange={(e) => handleInputChange("effectiveTo", e)}
              value={formData.effectiveTo}
            />
          </div>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            menuLeft.current.toggle(event);
            setSelectedRow(rowIndex);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          header={"Discount & Loading data"}
          value={(id >= productData.length || !productData[id]?.data?.[0]?.Discount) ? [] : tableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            style={{ width: "35%" }}
            field="Type"
            header="Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.Type} disabled/>
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="discount/loading"
            header="Discount/Loading"
            body={(rowData) => (
              <InputField
                type="text"
                value={rowData.Code + '' + rowData.Description}
                disabled
              />
            )}
          />
          <Column
            field="Mandatory"
            header="Mandatory"
            body={(rowData) => (
              <input type="checkbox" checked={rowData.Mandatory || false} disabled />
            )}
          />
          <Column
            field="Default_yn"
            header="Default"
            body={(rowData) => (
              <input type="checkbox" checked={rowData.Default_yn || false} disabled />
            )}
          />
          <Column
            style={{ width: "5%" }}
            field="Sort_order"
            header="Sort Order"
            body={(rowData) => (
              <InputField type="number" value={rowData.Sort_order || ""} disabled />
            )}
          />
          <Column
            field="Default_renewal"
            header="Default On Renewal"
            body={(rowData) => (
              <input
                type="checkbox"
                checked={rowData.Default_renewal || false}
                disabled
              />
            )}
          />
          <Column
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
        <div>
          <CustomButton
            label="ADD"
            onClick={() => {
              console.log("Add button clicked");
              setAdd(true);
            }}
            className="small-btn mt-4 -ml-16"
          />
        </div>
      </div>

      {add && (
        <DialogueBox
          data={discountPopUp()}
          header={"Discount & Loading"}
          yesButtonText="Save"
          noButtonText="Cancel"
          visible={add}
          onSave={handleAddSave}
        />
      )}

      {deletePopup && (
        <DialogueBox
          data={"Are you sure want to delete the row"}
          header={"Delete row message"}
          yesButtonText="Delete"
          noButtonText="Cancel"
          onSave={handleDelete}
        />
      )}
    </div>
  );
};

export default DiscountLoading;
