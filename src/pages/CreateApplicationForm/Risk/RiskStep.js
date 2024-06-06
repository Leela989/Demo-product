import React from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import RiskHeaderData from '../Risk/MockData/RiskHeader.json'
import InputField from '../../../components/InputField/InputField';
import KebabMen from '../../../assets/kebab.svg';
import RiskTabs from '../Risk/RiskTabView/RiskTabs';
import './RiskTabView/RiskTab.css';

function RiskStep() {
  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <img
          src={KebabMen}
          alt="KebabMen"
          className="KebabMen"
          onClick={() => console.log('clicked')}
        />
      </div>
    );
  };

  return (
    <div className="riskContainer">
      <div className="riskBox">
      <DataTable value={RiskHeaderData} scrollable scrollHeight="200px">
          <Column
            field="riskType"
            header="Risk Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.riskType} disabled />
            )}
          />
          <Column
            field="insurableProduct"
            header="Insurable Product"
            body={(rowData) => (
              <InputField type="text" value={rowData.insurableProduct} disabled />
            )}
          />
          <Column
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
        </DataTable>
      </div>
      <div className="riskTabs">
        <RiskTabs/>
      </div>
    </div>
  )
}

export default RiskStep