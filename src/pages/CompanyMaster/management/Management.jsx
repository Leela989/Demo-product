import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../components/InputField/InputField";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DateField from "../../../components/DateField/Datefield";
import managementData from './ManagementData.json';
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../components/Button/CustomButton";

function Management() {
  const menuLeft = useRef(null);
  const handleInputChange = () => {};
  const options = [
    {label : "View"},
    {label : "Edit"},
    {label : "Delete"}
  ]

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

  const designation_options = [
    {name: "Teacher"},
    {name: "Software Employee"}
  ]

  const handleDesignationChange = () => {

  }

  const handleAdd = () => {

  }

  const tableHeaderRender = (header) => {
    return (
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div style={{ display: "flex" }}>
            <CustomButton
              label="+Add"
              onClick={handleAdd}
              className="small-btn mt-4 -ml-16"
            />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={managementData}
          header={tableHeaderRender("Management")}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "35%" }}
            field="code"
            header="Code"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="code"
                value={rowData.code}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="description"
            header="Description"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="description"
                value={rowData.description}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="designation"
            header="Designation"
            body={(rowData, options) => (
              <AutoCompleteField
              className="w-4/4"
              name="designation"
              value={''}
              onChange={handleDesignationChange}
              options={designation_options}
              dropdown
            />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="qualification"
            header="Qualification"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="qualification"
                value={rowData.qualification}
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

export default Management;
