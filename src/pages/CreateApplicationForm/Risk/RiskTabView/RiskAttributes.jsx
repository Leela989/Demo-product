import React from 'react';
import KebabMen from '../../../../assets/kebab.svg';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../../components/InputField/InputField";
import riskAttributeData from '../MockData/RiskAttributes.json';
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { Accordion, AccordionTab } from 'primereact/accordion';


function RiskAttributes() {
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

      const checkboxTemplate = (rowData,field) =>{
        let name=field.field;
        return(
            <CheckBox />
        )
    }

    const handleCheckBox = () => {
      console.log('click');
  };
  return (
    <div>
        <div>
        {/* <DataTable value={riskAttributeData}  scrollable scrollHeight="200px">
          <Column
            field="insurableProduct"
            header="Insurable Product"
            body={(rowData) => (
              <InputField type="text" value={rowData.insurableProduct} disabled />
            )}
          />
          <Column
            field="blockName"
            header="Block Name"
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
          <Column header="Action"
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
        </DataTable> */}
        </div>
        <div className="card">
            <Accordion multiple activeIndex={[0]}>
                <AccordionTab header="Block Attributes">
                <DataTable value={riskAttributeData}  scrollable scrollHeight="200px">
          <Column
            field="insurableProduct"
            header="Insurable Product"
            body={(rowData) => (
              <InputField type="text" value={rowData.insurableProduct}  />
            )}
          />
          <Column
            field="blockName"
            header="Block Name"
            body={(rowData) => (
              <InputField type="text" value={rowData.blockName}  />
            )}
          />
          <Column
            field="parentBlockName"
            header="Parent Block Name"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName}  />
            )}
          />
          <Column header="Action"
                  body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "5%" }}
                />
        </DataTable>
                </AccordionTab>
                <AccordionTab header="Field Attributes">
                <DataTable value={riskAttributeData}  scrollable scrollHeight="200px">
          <Column
            field="fieldId"
            header="Field ID"
            body={(rowData) => (
              <InputField type="number" value={rowData.insurableProduct} disabled />
            )}
          />
          <Column
            field="fieldName"
            header="Field Name"
            body={(rowData) => (
              <InputField type="text" value={rowData.blockName} disabled />
            )}
          />
          <Column
            field="dataType"
            header="Data Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName} disabled />
            )}
          />
          <Column
            field="filedType"
            header="Field Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName} disabled />
            )}
          />
          <Column
            field="maxWidth"
            header="Max Width"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName} disabled />
            )}
          />
          <Column
            field="serial"
            header="Serial"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName} disabled />
            )}
          />
          <Column
            field="defaultValue"
            header="Default Value"
            body={(rowData) => (
              <InputField type="text" value={rowData.parentBlockName} disabled />
            )}
          />
          <Column field="mandatory" header="Mandatory" body={checkboxTemplate} style={{ width: '10%' }}></Column>
          <Column field="hide" header="Hide Y/N" body={checkboxTemplate} style={{ width: '10%' }}></Column>
        </DataTable>
                </AccordionTab>
            </Accordion>
        </div>

        <div>

        </div>
    </div>
  )
}

export default RiskAttributes