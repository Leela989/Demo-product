import React from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from '../../../../components/CheckBox/CheckBox';
import InputField from "../../../../components/InputField/InputField";
import riskAttributeData from '../MockData/RiskAttributes.json';
import KebabMen from '../../../../assets/kebab.svg';

function RiskCover() {
    const checkboxTemplate = () => (
        <CheckBox/>
    )

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
    <div>
        
        <div>
        <DataTable value={riskAttributeData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} scrollable scrollHeight="200px">
          <Column
            field="cover"
            header="Cover"
            body={(rowData) => (
              <InputField type="text" value={rowData.insurableProduct} disabled />
            )}
          />
          <Column
            field="sitype"
            header="SI Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.blockName} disabled />
            )}
          />
          <Column
            field="parentBlockName"
            header="Parent Block Name"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName} disabled />
            )}
          />
          <Column field="mandatory" header="Mandatory" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="bsicCover" header="Basic Cover" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="default" header="Default" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="defaultOnRenewal" header="Default On Renewal" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="addSI" header="Add SI" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="addRI" header="Add RI" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="builtIn" header="Built-in" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column header="Action"
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
        </DataTable>
        </div>
    </div>
  )
}

export default RiskCover