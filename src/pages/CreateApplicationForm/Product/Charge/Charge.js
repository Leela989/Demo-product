import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import KebabMen from '../../../../assets/kebab.svg';
import ChargeModal from '../Charge/ChargeModal';
import ChargeData from '../Charge/Charge.json';

const Charge = () => {
  const [chargeTableData, setChargeTableData] = useState(ChargeData);
  const [edit, setEdit] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [modalType, setModalType] = useState(null);

  const addRow = (type) => {
   
  };

  const options = [
    { name: "Edit" },
    { name: "Delete" },
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
        <img
          src={KebabMen}
          alt="KebabMen"
          className="KebabMen"
          onClick={() => toggleMenu(rowIndex)}
        />
        {menuOpen === rowIndex && (
          <div className="kebab-menu-popup">
            {options.map((option, i) => (
              <div
                key={i}
                className="kebab-menu-item"
                onClick={() => handleOptionSelect(option.name)}
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
              <div>
                <button onClick={() => addRow('charge')} className="popUpadd">ADD</button>
              </div>
              <DataTable value={chargeTableData}>
                <Column  header="Type" body={(rowData) => cellInput(rowData.type, "text")} />
                <Column  header="Charge" body={(rowData) => cellInput(rowData.charge, "text")} />
                <Column  header="Annual Rate" body={(rowData) => cellInput(rowData.annualRate, "text")} />
                <Column  header="Short Rate" body={(rowData) => cellInput(rowData.shortRate, "text")} />
                <Column  header="Mandatory" body={(rowData) => cellCheckBox(rowData.mandatory)} />
                <Column  header="Default" body={(rowData) => cellCheckBox(rowData.default)} />
                <Column
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
              </DataTable>

      {edit && rowDetails && (
        <>
          {modalType === 'charge' && (
            <ChargeModal
              visible={edit}
              rowDetails={rowDetails}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Charge;