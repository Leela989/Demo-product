import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import React, { act, useRef, useState } from "react";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import Departments from "./departments.json";
import "./department.css";
import { Link, useNavigate } from "react-router-dom";

export default function DepartmentList() {
  const actionFilter = [{ name: "Edit" }, { name: "View" }];
  const [action, setAction] = useState("Edit");
  const navigate = useNavigate();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    navigate(`/commonMaster/departmentMaster/edit/${rowIndex}`);
    setEditingRowIndex(rowIndex);
  };

  const handleEdit = (rowIndex) => {};

  const blockAttributeOptions = (rowData, rowIndex) => [
    { label: "View" },
    { label: "Edit", command: () => handleEdit(rowIndex) },
  ];

  const handleInputChange = (action) => {
    setAction(action);
  };

  const changeRouteToCreateDepartment = () => {
    navigate("/commonMaster/departmentMaster/create");
  };

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [clonedRowDetails, setClonedRowDetails] = useState(null);
  const menuLeft = useRef(null);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "approved":
        return "green";
      case "rejected":
        return "red";
      default:
        return "black";
    }
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
            setSelectedRowIndex(index);
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
      <div className="flex justify-end mb-3">
        <Button
          rounded={false}
          label="Create New"
          aria-controls="popup_menu_left"
          onClick={() => changeRouteToCreateDepartment()}
          aria-haspopup
        />
      </div>
      <div>
        <DataTable value={Departments} paginator rows={5} scrollable>
          <Column field="company" header="Company"></Column>
          <Column field="department" header="Department"></Column>
          <Column
            field="status"
            header="Status"
            body={(rowData) => (
              <span style={{ color: getStatusColor(rowData.status) }}>
                {rowData.status}
              </span>
            )}
          ></Column>
          <Column
            header="Action"
            headerClassName="action"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
