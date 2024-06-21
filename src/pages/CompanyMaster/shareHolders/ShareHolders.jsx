import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../components/InputField/InputField";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DateField from "../../../components/DateField/Datefield";
import shareholderData from './ShareHolderData.json';
import CustomButton from "../../../components/Button/CustomButton";

function ShareHolders() {
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

  const handleAdd = () => {

  }
  
 


  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={shareholderData}
          paginator
          header={tableHeaderRender("Share holder")}
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "35%" }}
            field="name"
            header="Name"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="Name"
                value={rowData.name}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="short_description"
            header="Short Description"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="short_description"
                value={rowData.short_description}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="noOfShares"
            header="No of Shares"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="noOfShares"
                value={rowData.noOfShares}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="share_perc"
            header="Share %"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="share_perc"
                value={rowData.share_perc}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />

          <Column
            style={{ width: "35%" }}
            field="effectiveFrom"
            header="Effective From"
            body={(rowData, options) => (
              <DateField
                className="w-4/4 p-1"
                name="effectiveFrom"
                value={""}
                onChange={handleInputChange}
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="effectiveTo"
            header="Effective To"
            body={(rowData, options) => (
              <DateField
                className="w-4/4 p-1"
                name="effectiveTo"
                value={""}
                onChange={handleInputChange}
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

export default ShareHolders;
