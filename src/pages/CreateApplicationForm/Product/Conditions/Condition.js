import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import KebabMen from "../../../../assets/kebab.svg";
import data from "./Conditions.json";
import ConditionModal from './ConditionModal';
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import discountModal from "../DiscountLoading/DiscountLoadingModal";

const Conditions = () => {
  const [conditionsData, setConditionsData] = useState(data);
  const [menuOpen, setMenuOpen] = useState(null);
  const [add, setAdd] = useState(false);

  const addRow = () => {
      setAdd(true);
  };

  const options = [{ name: "Edit" }, { name: "Delete" }];

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
    setMenuOpen(null);
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
       <i
  className="fa fa-kebab-men KebabMen"
  onClick={() => toggleMenu(rowIndex)}
></i>

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
    return <InputField type={typeofField} value={val} disabled />;
  };

  const cellCheckBox = (val) => {
    return <input type="checkbox" checked={val} disabled />;
  };

  return (
    <div >
      <div>
        <button onClick={() => addRow("conditions")} className="popUpadd">
          ADD
        </button>
      </div>
      <DataTable value={conditionsData}>
        <Column
          field="Type"
          header="Type"
          body={(rowData) => cellInput(rowData.type, "text")}
        />
        <Column
          field="Conditions"
          header="Conditions"
          body={(rowData) => cellInput(rowData.conditions, "text")}
        />
        <Column
          field="Default On Renewal"
          header="Default On Renewal"
          body={(rowData) => cellCheckBox(rowData.DefaultOnRenewal)}
        />
        <Column
          body={(rowData, { rowIndex }) =>
            actionBodyTemplate(rowData, rowIndex)
          }
          style={{ width: "5%" }}
        />
      </DataTable>

      {add && (
             <>
             <DialogueBox data={<ConditionModal/>} 
                       header={"Conditions"} 
                       setAdd={setAdd}
                       yesButtonText="Save"
                       noButtonText="Cancel"/>
            </>
      )
     
     }
     
    </div>
 
  );
};

export default Conditions;
