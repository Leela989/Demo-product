import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../components/InputField/InputField";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DateField from "../../../components/DateField/Datefield";
import CustomButton from "../../../components/Button/CustomButton";
import DirectorDetailsData from './DirectorDtlsdata.json';

function DirectorDtls() {
  const menuLeft = useRef(null);
  const handleInputChange = () => {

  }

  const handleAdd = () => {

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
          value={DirectorDetailsData}
          header={tableHeaderRender("Director details")}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "35%" }}
            field="director_code"
            header="Director Code"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="director_code"
                value={rowData.director_code}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="director_name"
            header="Director Name"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="director_name"
                value={rowData.director_name}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="elected_date"
            header="Elected Date"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="elected_date"
                value={rowData.elected_date}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
            
            <Column
            style={{ width: "35%" }}
            field="appointed_date"
            header="Appointed Date"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="appointed_date"
                value={rowData.appointed_date}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
         <Column
            style={{ width: "35%" }}
            field="exit_date"
            header="Exit Date"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="exit_date"
                value={rowData.exit_date}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="citizen"
            header="Citizen"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="citizen"
                value={rowData.citizen}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="date_of_birth"
            header="Date of Birth"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="srl"
                value={rowData.date_of_birth}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="shares"
            header="Shares"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="shares"
                value={rowData.shares}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="share_date"
            header="Share date"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="share_date"
                value={rowData.share_date}
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

export default DirectorDtls;
