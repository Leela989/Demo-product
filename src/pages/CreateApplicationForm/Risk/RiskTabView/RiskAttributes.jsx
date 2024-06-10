import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Accordion, AccordionTab } from "primereact/accordion";
import InputField from "../../../../components/InputField/InputField";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import riskAttributeData from "../MockData/RiskAttributes.json";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../../components/Button/CustomButton";
import { useParams } from 'react-router-dom';

function RiskAttributes() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const menuLeft = useRef(null);
  const { id, key } = useParams();

  const blockAttributeOptions = [
    { label: "View" },
    { label: "Edit" },
    { label: "Delete" },
  ];

  const InsurableProductList = [
    { label: "Phone" },
    { label: "Vehicle" },
    { label: "Health" },
  ];

  const blockNameList = [
    { label: "Oppo" },
    { label: "Lorry" },
    { label: "Accident" },
  ];

  const handleInputChange = () => {};

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu
          model={blockAttributeOptions}
          popup
          ref={menuLeft}
          id="popup_menu_left"
        />
        <Button
          rounded
          text
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const handleRowSelect = (e) => {
    const selectedRowData = e.value;
    console.log('selectedValue', selectedRowData.attributes);
    setSelectedRow(selectedRowData);
    if (selectedRowData && selectedRowData.attributes) {
      setSelectedAttributes(selectedRowData.attributes);
    } else {
      setSelectedAttributes([]);
    }
  };

  return (
    <div>
      <div className="card">
        <Accordion multiple activeIndex={[0, 1]}>
          <AccordionTab header="Block Attributes">
            <div style={{ display: "flex" }}>
              <DataTable
                value={key == 2301 ? riskAttributeData.data : []}
                selectionMode="single"
                selection={selectedRow}
                onSelectionChange={handleRowSelect}
                dataKey="blockName"
                scrollable
                scrollHeight="200px"
                header="Block attributes data"
              >
                <Column
                  selectionMode="single"
                  headerStyle={{ width: "3rem" }}
                ></Column>
                <Column
                  field="insurableProduct"
                  header="Insurable Product"
                  body={(rowData) => (
                    <AutoCompleField
                      className="w-2/4 p-1"
                      value={rowData.insurableProduct}
                      onChange={handleInputChange}
                      options={InsurableProductList}
                      dropdown
                      disabled
                    />
                  )}
                />
                <Column
                  field="blockName"
                  header="Block Name"
                  body={(rowData) => (
                    <InputField
                      className="w-2/4 p-1"
                      type="text"
                      value={rowData.blockName}
                      disabled
                    />
                  )}
                />
                <Column
                  field="parentBlockName"
                  header="Parent Block Name"
                  body={(rowData) => (
                    <AutoCompleField
                      className="w-2/4 p-1"
                      value={rowData.parentBlockName}
                      onChange={handleInputChange}
                      options={blockNameList}
                      dropdown
                      disabled
                    />
                  )}
                />
                <Column
                  header="Action"
                  body={(rowData, { rowIndex }) =>
                    actionBodyTemplate(rowData, rowIndex)
                  }
                  style={{ width: "5%" }}
                />
              </DataTable>
              <CustomButton
                label="ADD"
                onClick={() => console.log("hello")}
                className="small-btn mt-4 -ml-16"
              />
            </div>
          </AccordionTab>
          <AccordionTab header="Field Attributes">
            <div style={{ display: "flex" }}>
              <DataTable
                key={selectedRow ? selectedRow.blockName : "default"}
                value={selectedAttributes}
                scrollable
                scrollHeight="200px"
                dataKey="FieldID"
                header="Field Attributes data"
              >
                <Column
                  field="FieldID"
                  header="Field ID"
                  body={(rowData) => (
                    <InputField
                      type="number"
                      value={rowData.Field_Id}
                      disabled
                    />
                  )}
                />
                <Column
                  field="FieldName"
                  header="Field Name"
                  body={(rowData) => (
                    <InputField
                      type="text"
                      value={rowData.Field_Name}
                      disabled
                    />
                  )}
                />
                <Column
                  field="dataType"
                  header="Data Type"
                  body={(rowData) => (
                    <InputField
                      type="text"
                      value={rowData.Data_Type}
                      disabled
                    />
                  )}
                />
                <Column
                  field="FieldType"
                  header="Field Type"
                  body={(rowData) => (
                    <InputField
                      type="text"
                      value={rowData.Field_type}
                      disabled
                    />
                  )}
                />
                <Column
                  field="max-width"
                  header="Max Width"
                  body={(rowData) => (
                    <InputField
                      type="text"
                      value={rowData.max_width}
                      disabled
                    />
                  )}
                />
                <Column
                  field="serial"
                  header="Serial"
                  body={(rowData) => (
                    <InputField
                      type="text"
                      value={rowData.Serial_no}
                      disabled
                    />
                  )}
                />
                <Column
                  field="Default-value"
                  header="Default Value"
                  body={(rowData) => (
                    <InputField
                      type="text"
                      value={rowData.default_val}
                      disabled
                    />
                  )}
                />
                <Column
                  field="Mandatory_yn"
                  header="Mandatory"
                  body={(rowData) => (
                    <input
                      type="checkbox"
                      checked={rowData.Mandatory_yn || false}
                      disabled
                    />
                  )}
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="Hide Y/N"
                  header="Hide Y/N"
                  body={(rowData) => (
                    <input
                      type="checkbox"
                      checked={rowData["hide_y/n"] || false}
                      disabled
                    />
                  )}
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="claimlookupYN"
                  header="Claim Lookup YN"
                  body={(rowData) => (
                    <input
                      type="checkbox"
                      checked={rowData.claimLookupYN || false}
                      disabled
                    />
                  )}
                  style={{ width: "10%" }}
                ></Column>
                <Column
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
                  onClick={() => console.log("hello")}
                  className="small-btn mt-4 -ml-16"
                />
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}

export default RiskAttributes;
