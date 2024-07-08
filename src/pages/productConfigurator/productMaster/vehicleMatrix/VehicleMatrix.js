import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../../components/InputField/InputField";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import CustomButton from "../../../../components/Button/CustomButton";
import VehicleMatrixdata from "./VehicleMatrix.json";

function VehicleMatrix() {
  const menuLeft = useRef(null);
  const [tableData, setTableData] = useState(VehicleMatrixdata);
  const [editingRows, setEditingRows] = useState({});
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleInputChange = (name, value, rowIndex) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][name] = value;
    setTableData(updatedData);
  };

  const handleAdd = () => {
    const newRow = {
      code: "",
      vehicle_make: "",
      model: "",
      body: "",
      cc: "",
      fuel: "",
      gvw: "",
      seating_capacity: "",
      no_of_drivers: "",
      effective_from_date: "",
      effective_to_date: "",
    };
    setTableData((prev) => [...prev, newRow]);
    const newIndex = tableData.length;
    setEditingRows((prev) => ({ ...prev, [newIndex]: true }));
    setEditingRowIndex(newIndex);
  };

  const handleSave = (rowIndex) => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: false }));
  };

  const handleCancel = () => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [editingRowIndex]: false }));
  };

  const renderEditSaveButton = (rowIndex) => {
    if (editingRows[rowIndex]) {
      return (
        <div>
          <i
            className="pi pi-check"
            style={{
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "rgb(30 211 30 / 79%)",
              color: "white",
            }}
            onClick={() => handleSave(rowIndex)}
          ></i>
          <i
            className="pi pi-times ml-5"
            style={{
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={handleCancel}
          ></i>
        </div>
      );
    } else {
      return null;
    }
  };

  const tableHeaderRender = (header) => (
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

  const options = [
    { label: "Edit", command: () => onEdit(selectedIndex) },
    { label: "View" },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    setSelectedIndex(rowIndex);
    setEditingRowIndex(rowIndex);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: true }));
  };

  const actionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedIndex(index);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={tableData}
        header={tableHeaderRender("Vehicle Setup")}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        isDataSelectable={false}
      >
        <Column
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
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="vehicle_make"
          header="Vehicle Make"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="vehicle_make"
              value={rowData.vehicle_make}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="model"
          header="Model"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="model"
              value={rowData.model}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="body"
          header="Body"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="body"
              value={rowData.body}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="cc"
          header="CC"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="cc"
              value={rowData.cc}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="fuel"
          header="Fuel"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="fuel"
              value={rowData.fuel}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="gvw"
          header="GVW"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="gvw"
              value={rowData.gvw}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="seating_capacity"
          header="Seating Capacity"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="seating_capacity"
              value={rowData.seating_capacity}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="no_of_drivers"
          header="No.Of Drivers"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="no_of_drivers"
              value={rowData.no_of_drivers}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="effective_from_date"
          header="Eff. From Date"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="effective_from_date"
              value={rowData.effective_from_date}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="effective_to_date"
          header="Eff.To Date"
          body={(rowData, options) => (
            <InputField
              type="text"
              name="effective_to_date"
              value={rowData.effective_to_date}
              onChange={(name, value) =>
                handleInputChange(name, value, options.rowIndex)
              }
              disabled={!editingRows[options.rowIndex]}
            />
          )}
        />
        <Column
          field="action"
          header="Action"
          body={(rowData, options) => renderEditSaveButton(options.rowIndex)}
        />
        <Column
          header="Action"
          headerClassName="action"
          bodyClassName="action"
          body={(rowData, { rowIndex }) =>
            actionBodyTemplate(rowData, rowIndex)
          }
          style={{ width: "10%" }}
        />
      </DataTable>
    </div>
  );
}

export default VehicleMatrix;
