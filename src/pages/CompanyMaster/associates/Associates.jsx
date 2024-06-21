import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import InputField from "../../../components/InputField/InputField";
import "../CompanyMaster.css";
import CustomButton from "../../../components/Button/CustomButton";
import DateField from "../../../components/DateField/Datefield";

function Associates() {
  const menuLeft = useRef(null);
  const [formData, setformData] = useState({});
  const handleAdd = () => {}
  const tableHeaderRender = (header) => {
    return (
      <div className="flex justify-end">
            <CustomButton
              label="+Add"
              onClick={handleAdd}
              className="small-btn mt-4 -ml-16"
            />
      </div>
    );
  };

  const options = [
    {name: "View"},
    {name: "Edit"},
    {name: "Delete"}
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
  const handleInputChange = () => {};
  return (
    <div>
        <DataTable
          value={''}
          paginator
          header={tableHeaderRender("License")}
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "15%" }}
            field="name"
            header="Name"
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
            field="short_name"
            header="Short Name"
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
            field="address"
            header="Address"
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
            field="telephone"
            header="Telehone"
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
            field="fax"
            header="Fax"
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
            style={{ width: "35%" }}
            field="e-mail"
            header="E-mail"
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
            field="wedsite"
            header="Website"
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
            style={{ width: "35%" }}
            field="#of_shares"
            header="# of Shares"
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
            style={{ width: "35%" }}
            field="share%"
            header="Share %"
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
            style={{ width: "25%" }}
            field="effective_from"
            header="Effective From"
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
            field="effective_to"
            header="Effective to"
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
            body={(rowData, options) =>
              actionBodyTemplate(rowData, options.rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
    </div>
  );
}

export default Associates;
