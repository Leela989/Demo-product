import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../components/InputField/InputField";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DateField from "../../../components/DateField/Datefield";
import licenseData from '../license/LicenseData.json';
import CustomButton from "../../../components/Button/CustomButton";

function License() {
  const menuLeft = useRef(null);
  const handleInputChange = () => {

  }

  const tableHeaderRender = (header) => {
    return (
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div style={{ display: "flex" }}>
            <CustomButton
              label="ADD"
              onClick={handleAdd}
              className="small-btn mt-4 -ml-16"
            />
        </div>
      </div>
    );
  };

  const handleAdd = () => {

  }

  
  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const options = [
    {name: "View"},
    {name: "Edit"},
    {name: "Delete"}
  ]
  


  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={licenseData}
          paginator
          header={tableHeaderRender("License")}
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "15%" }}
            field="licenseType"
            header="License Type"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="licenseType"
                value={rowData.licenseType}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "15%" }}
            field="licenseName"
            header="License Name"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="licenseName"
                value={rowData.licenseName}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "15%" }}
            field="license"
            header="License#"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="license"
                value={rowData.license}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
            
          <Column
            style={{ width: "25%" }}
            field="issueDate"
            header="Issue Date"
            body={(rowData, options) => (
              <DateField
              className="w-4/4 p-1"
              name="effectiveFrom"
              value={rowData.issueDate}
              onChange={handleInputChange}
            />
            )}
          />
          <Column
            style={{ width: "25%" }}
            field="expiryDate"
            header="Expiry Date"
            body={(rowData, options) => (
              <DateField
              className="w-4/4 p-1"
              name="effectiveFrom"
              value={rowData.expiryDate}
              onChange={handleInputChange}
            />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="issuingAuthority"
            header="Issuing Authority"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="srl"
                value={rowData.issuingAuthority}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="issuingAuthorityName"
            header="Issuing Authority Name"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="srl"
                value={rowData.issuingAuthorityName}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          
          <Column
            body={(rowData, options) =>
              actionBodyTemplate(rowData, options.rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default License;
