import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import deductibleData from "./Deductible.json";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import KebabMen from '../../../../assets/kebab.svg';
import DeductibleModal from '../Deductible/DeductibleModal';
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";

const Deductible = () => {
 

  const [tableData, setTableData] = useState(deductibleData);
  const [addDailogueBox, setAddDailogueBox] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const addRow = () => {
    setAddDailogueBox(true);
  };

  const options = [
    { name: "Edit" },
    { name: "Delete" },
  ];

  const closeModal = () => {
    setAddDailogueBox(false);
    setRowDetails(null);
  };

  const handleOptionSelect = (option) => {
    setMenuOpen(null); 
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

 

  const actionBodyTemplate = (rowIndex) => {
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
    <div>
              <div>
                <button onClick={() => addRow('deductible')} className="popUpadd">ADD</button>
              </div>
              <DataTable value={tableData}>
                <Column  header="Type" body={(rowData) => cellInput(rowData.type, "text")} />
                <Column  header="Deductible" body={(rowData) => cellInput(rowData.deductible, "text")} />
                <Column  header="Percentage" body={(rowData) => cellInput(rowData.percentage, "text")} />
                <Column  header="Value" body={(rowData) => cellInput(rowData.value, "text")} />
                <Column  header="Default On Renewal" body={(rowData) => cellCheckBox(rowData.defaultOnRenewal)} />
                <Column
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
              </DataTable>

      {addDailogueBox  && (
        <>
          <DialogueBox data={<DeductibleModal
                        visible={addDailogueBox}
                        rowDetails={rowDetails}
                        onClose={closeModal}
          />}/>
        </>
      )}
    </div>
  );
}

export default Deductible;
