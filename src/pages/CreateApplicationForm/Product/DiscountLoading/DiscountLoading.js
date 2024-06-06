import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import discountdata from "./DiscountLoading.json";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import KebabMen from "../../../../assets/kebab.svg";
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

const DiscountLoading = () => {
  const menuLeft = useRef(null);
  const [discounttableData, setDiscountTableData] = useState(discountdata);
  const [add, setAdd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);

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
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
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
  };

  const handleEdit = (rowData, rowIndex) => {
    setSelectedRow(rowIndex);
    setFormData({ ...rowData });
    setAdd(true);
  };

  const handleDelete = () => {
    console.log(selectedRow, "deletedRowIndex");
    const newData = [...discounttableData];
    newData.splice(selectedRow, 1);
    setDiscountTableData(newData);
    setDeletePopup(false);
    console.log(newData, "row1");
  };

  const options = [
    {
      name: "Edit",
      onClick: (rowData, rowIndex) => handleEdit(rowData, rowIndex),
    },
    {
      name: "Delete",
      onClick: (rowData, rowIndex) => {
        setDeletePopup(true);
        setSelectedRow(rowIndex);
      },
    },
  ];

  const items = [
    {
      label: "Edit",
    },
    {
      label: "Delete",
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
    console.log(name, value, "<---");
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
            />
            <InputField
              className="w-1/3 p-1"
              name="code"
              label="Code"
              labelType="left"
              onChange={handleInputChange}
            />

            <InputField
              className="w-1/3 p-1"
              name="description"
              label="Description"
              labelType="left"
              onChange={(e) => handleInputChange("description", e)}
            />
          </div>
          <div className="topBox">
            <InputField
              className="w-1/2 p-1"
              name="longDescription"
              label="Long Description"
              labelType="left"
              onChange={(e) => handleInputChange("longDescription", e)}
            />
            <InputField
              className="w-1/2 p-1"
              name="shortDescription"
              label="Short Description"
              labelType="left"
              onChange={(e) => handleInputChange("shortDescription", e)}
            />
          </div>
          <div className="topcheckBox">
            <div className="checkboxes">
              <CheckBox
                labelName="Mandatory"
                name="mandatory"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkboxes">
              <CheckBox
                labelName="Default On Renewal"
                name="DefaultOnRenewal"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkboxes">
              <CheckBox
                labelName="Rate Modify"
                name="rateModify"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkboxes">
              <CheckBox
                labelName="Default Yes/No"
                name="default"
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="topcheckBox">
            <div className="checkboxes">
              <CheckBox
                labelName="NCB Yes/No"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkboxes">
              <CheckBox
                labelName="Add RI Yes/No"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkboxes">
              <CheckBox
                labelName="Commission apl"
                onChange={handleCheckboxChange}
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
            />
            <DateField
              className="w-2/4"
              name="effectiveFrom"
              label="Effective From"
              labelType="left"
              onChange={(e) => handleInputChange("effectiveFrom", e)}
            />
            <DateField
              className="w-2/4"
              name="effectiveTo"
              label="Effective To"
              labelType="left"
              onChange={(e) => handleInputChange("effectiveTo", e)}
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

  return (
    <div>
      <div>
        <div>
          <Button onClick={() => setAdd(true)} className="popUpadd">
            ADD
          </Button>
        </div>
        <DataTable
          value={discounttableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            field="type"
            header="Type      "
            body={(rowData) => (
              <InputField type="text" value={rowData.type} disabled />
            )}
            // style={{ width: "40%" }}
          />
          <Column
            field="code"
            header="Code"
            body={(rowData) => (
              <InputField type="text" value={rowData.code} disabled />
            )}
          />
          <Column
            field="mandatory"
            header="Mandatory"
            body={(rowData) => (
              <input type="checkbox" checked={rowData.mandatory} disabled />
            )}
          />
          <Column
            field="default"
            header="Default"
            body={(rowData) => (
              <input type="checkbox" checked={rowData.default} disabled />
            )}
          />
          <Column
            field="sortOrder"
            header="Sort Order"
            body={(rowData) => (
              <InputField type="number" value={rowData.sortOrder} disabled />
            )}
          />
          <Column
            field="DefaultOnRenewal"
            header="Default On Renewal"
            body={(rowData) => (
              <input
                type="checkbox"
                checked={rowData.DefaultOnRenewal}
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
      </div>

      {add && (
        <DialogueBox
          data={discountPopUp()}
          header={"Discount & Loading"}
          setAdd={setAdd}
          yesButtonText="Save"
          noButtonText="Cancel"
          onSave={handleAddSave}
        />
      )}

      {deletePopup && (
        <DialogueBox
          data={"Are you sure want to delete the row"}
          header={"Delete row message"}
          setAdd={setDeletePopup}
          yesButtonText="Delete"
          noButtonText="Cancel"
          onSave={handleDelete}
        />
      )}
    </div>
  );
};

export default DiscountLoading;
