import React, { useEffect, useState } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from '../../../../components/CheckBox/CheckBox';
import InputField from "../../../../components/InputField/InputField";
import riskAttributeData from '../MockData/RiskSMI.json';
import KebabMen from '../../../../assets/kebab.svg';
import { useParams } from 'react-router-dom';

function RiskSMI() {
  const {id, key} = useParams();
    const checkboxTemplate = (rowData, fieldName) => (
      <div>
        {rowData.fieldName}
        <CheckBox checked={rowData.fieldName}/>
      </div>
    )

    const productKey = parseInt(key,10);
    const [risk_smi_data, set_risk_smi_data]= useState([]);
    useEffect(() => {
        const matchingProduct = riskAttributeData.data.find((item) => item.key == productKey);
        console.log('riskAttributeData', riskAttributeData, matchingProduct);
        set_risk_smi_data(matchingProduct.values)
    }, [productKey])

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
        <DataTable value={risk_smi_data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} scrollable scrollHeight="200px">
          <Column
            field="code"
            header="Code"
            body={(rowData) => (
              <InputField type="text" value={rowData.code} disabled />
            )}
          />
          <Column
            field="description"
            header="Description"
            body={(rowData) => (
              <InputField type="text" value={rowData.description} disabled />
            )}
          />
          <Column
            field="maximumAplValue"
            header="Maximum apl Value"
            body={(rowData) => (
              <InputField type="text" value={rowData.maximumaplvalue} disabled />
            )}
          />
          <Column field="default" header="Default" body={(rowData) => (<CheckBox checked={rowData.default}/>)} style={{ width: '10%' }}></Column>
          <Column field="addSi" header="Add SI" body={(rowData) => (<CheckBox checked={rowData.addSi}/>)} style={{ width: '10%' }}></Column>
          <Column field="declaration" header="Declaration" body={(rowData) => (<CheckBox checked={rowData.declaration}/>)} style={{ width: '10%' }}></Column>
          <Column header="Action"
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
        </DataTable>
        </div>
    </div>
  )
}

export default RiskSMI