import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../components/InputField/InputField";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DateField from "../../../components/DateField/Datefield";
import licenseData from "../license/LicenseData.json";
import CustomButton from "../../../components/Button/CustomButton";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";

function LineOfBusiness() {
  const menuLeft = useRef(null);

  const handleInputChange = () => {};

  const handleAdd = () => {};

  const options = [{ label: "View" }, { label: "Edit" }, { label: "Delete" }];

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

  const lineofBusiness_options = [{ name: "Option1" }, { name: "Option2" }];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={licenseData}
          header={tableHeaderRender("Line of Business Data")}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "35%" }}
            field="fromDate"
            header="From Date"
            body={(rowData, options) => (
              <DateField
                className="w-4/4 p-1"
                name="fromDate"
                value={rowData.fromDate}
                onChange={handleInputChange}
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="toDate"
            header="To Date"
            body={(rowData, options) => (
              <DateField
                className="w-4/4 p-1"
                name="toDate"
                value={rowData.toDate}
                onChange={handleInputChange}
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="lineOfBusiness"
            header="Line of Business"
            body={(rowData, options) => (
              <AutoCompleteField
                className="w-4/4 p-1"
                value={rowData.lineOfBusiness}
                onChange={handleInputChange}
                options={lineofBusiness_options}
                dropdown
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="licenceFrom"
            header="License from"
            body={(rowData, options) => (
              <AutoCompleteField
                className="w-4/4 p-1"
                value={rowData.lineOfBusiness}
                onChange={handleInputChange}
                options={lineofBusiness_options}
                dropdown
              />
            )}
          />
          <Column
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default LineOfBusiness;
