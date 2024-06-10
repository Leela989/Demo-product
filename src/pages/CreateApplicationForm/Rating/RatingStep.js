import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import KebabMen from "../../../assets/kebab.svg";
import ratingStepData from "./ratingStep.json";
import "./RatingStep.css";
import AutoCompleField from "../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../components/Button/CustomButton";

function RatingStep() {
  const options = [{ name: "edit" }, { name: "delete" }];
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState({});

  const coverDropdownValue = [
    { name: "1001- Own Damage" },
    { name: "2002- Accident" },
    { name: "3003- Issue in product" },
  ];

  const calculationLogicData = [
    { name: "SI*Rate/Rate Per" },
    { name: "CGS*Rate/Rate Per" },
  ];

  const handleInputChange = ({ name, value }) => {
    setData({ ...data, [name]: value });
  };

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <img
          src={KebabMen}
          alt="KebabMen"
          className="KebabMen"
          // onClick={() => toggleMenu(rowIndex)}
        />
        {menuOpen === rowIndex && (
          <div className="kebab-menu-popup">
            {options.map((option, i) => (
              <div
                key={i}
                className="kebab-menu-item"
                // onClick={() => handleOptionSelect(option.name)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const tableHeaderRender = (header) => {
    return(
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div style={{display: 'flex'}}>
          <div className="mr-40 mt-5 text-blue-600 underline underline-offset-2 text-xl">
            <a href="www.google.com">Upload Tariff data</a>
            </div>
            <div>
            <CustomButton
              label="ADD"
              onClick={() => console.log("")}
              className="small-btn mt-4 -ml-16"
            />
            </div>
          </div>
      </div>
    )
  }

  return (
    <div>
      <div className="tafiffParameters">
        <AutoCompleField
          className="w-1/3 p-1"
          name="cover"
          label="Cover"
          value={""}
          onChange={handleInputChange}
          options={coverDropdownValue}
          dropdown
        />
        <AutoCompleField
          className="w-1/3 p-1"
          name="calculationLogic"
          label="Calculation Logic"
          value={""}
          onChange={handleInputChange}
          options={calculationLogicData}
          dropdown
        />
        <InputField className="w-1/3 p-1" name="order" label="Order" />
      </div>
      <div className="tableContainer">
        <div style={{ display: "flex" }}>
          <DataTable
            value={ratingStepData}
            header={"Tariff Parameters"}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="insurableProduct"
              header="Insurable Product"
              body={(rowData) => (
                <InputField type="text" value={rowData.insurableProduct} />
              )}
            />
            <Column
              field="parameter"
              header="Parameter"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} />
              )}
            />
            <Column
              field="type"
              header="Type"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} />
              )}
            />
            <Column
              field="source"
              header="Source"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} />
              )}
            />
            <Column
              field="action"
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
              onClick={() => console.log("")}
              className="small-btn mt-4 -ml-16"
            />
          </div>
        </div>
      </div>

      <div></div>
      <div className="tableContainer">
        <div style={{display: 'flex'}}>
          <DataTable
            value={ratingStepData}
            header={tableHeaderRender("Tariff data")}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="vehicleAgeFrom"
              header="Vehicle age from"
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.insurableProduct}
                  disabled
                />
              )}
            />
            <Column
              field="vehicleAgeTo"
              header="Vehicle age to"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="make"
              header="Make"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="rate"
              header="Rate"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="ratePer"
              header="Rate Per"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="action"
              header="Action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "5%" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default RatingStep;
