import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../components/Button/CustomButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import "./division.css";
import Department from "./DivisionMaster";
import Data from "../DepartmentMaster/departments.json";

export default function ApplicableDepartments({ data, id }) {
  const actionFilter = [{ name: "Edit" }, { name: "View" }];
  const [action, setAction] = useState("");
  const [deptData, setDeptData] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const incharge = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];
  const [dept, setdept] = useState("");
  const [inchargeName, setInchargeName] = useState("");
  const [hod, sethod] = useState("");

  const department = [
    { name: "101-Motor" },
    { name: "201-Fire" },
    { name: "301-Marine" },
  ];

  const handleInputChange = (action) => {
    setAction(action);
  };

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const menuLeft = useRef(null);

  const [formData, setFormData] = useState(data);

  const [key, setKey] = useState(0);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    // setIsEdit(true);
  };

  const handleDepartmentChange = (e, rowData, rowIndex) => {
    let deptName = rowData.department;
    setdept(deptName);
    console.log("pp ", e);

    const detail = Data.find((d) => {
      return d.department === deptName || {};
    });

    setInchargeName(detail.incharge);
    sethod(detail.hod);

    let obj = {
      department: detail.department,
      incharge: detail.incharge,
      hod: detail.hod,
      show: true,
    };

    formData[rowIndex] = obj;

    setKey(key + 1);
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

  const add = () => {
    let obj = {
      company: "",
      department: "",
      status: "",
      action: "",
      incharge: "",
      approvedBy: "",
      hod: "",
      show: true,
    };

    let length = formData.length;

    formData[length - 1].show = false;

    setFormData((prevDeptData) => [...prevDeptData, obj]);
  };

  useEffect(() => {
    if (!id) {
      let obj = {
        company: "",
        department: "",
        status: "",
        action: "",
        incharge: "",
        approvedBy: "",
        hod: "",
        show: true,
      };

      setFormData([obj]);
    }
  }, [id]);

  const departmentActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="action"
          value={rowData.department || ""}
          onChange={(e) => handleDepartmentChange(e, rowData, rowIndex)}
          options={department}
          dropdown
          disabled={editingRowIndex !== rowIndex && !rowData.show}
        />
      </div>
    );
  };

  const inchargeActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="incharge"
          value={rowData.incharge}
          onChange={handleInputChange}
          options={incharge}
          dropdown
          disabled={editingRowIndex !== rowIndex && !rowData.show}
        />
      </div>
    );
  };

  const headActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="action"
          value={rowData.hod}
          onChange={handleInputChange}
          options={incharge}
          dropdown
          disabled={editingRowIndex !== rowIndex && !rowData.show}
        />
      </div>
    );
  };

  const addressCodeActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="action"
          value={action}
          onChange={handleInputChange}
          options={actionFilter}
          dropdown
        />
      </div>
    );
  };

  const freezeActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <CheckBox disabled={editingRowIndex !== rowIndex} />
      </div>
    );
  };

  const onSave = (index) => {
    formData[index].show = false;
    setEditingRowIndex(null);
    setKey(key + 1);
  };

  const onCancel = (index) => {
    formData[index] = {};
    setEditingRowIndex(null);
    setKey(key + 1);
  };
  const renderEditSaveButton = (rowIndex) => {
    if (
      editingRowIndex === rowIndex ||
      (rowIndex === formData.length - 1 && formData[formData.length - 1].show)
    ) {
      return (
        <i
          className="pi pi-check"
          style={{
            fontSize: "1rem",
            border: "none",
            borderRadius: "50%",
            padding: "5px",
            backgroundColor: "rgb(30 211 30 / 79%)",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => onSave(rowIndex)}
        ></i>
      );
    } else {
      return null;
    }
  };

  const renderCancelButton = (rowIndex) => {
    if (
      editingRowIndex === rowIndex ||
      (rowIndex === formData.length - 1 && formData[formData.length - 1].show)
    ) {
      return (
        <i
          className="pi pi-times"
          style={{
            fontSize: "1rem",
            border: "none",
            borderRadius: "50%",
            padding: "5px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => onCancel(rowIndex)}
        ></i>
      );
    } else {
      return null;
    }
  };

  return (
    <div key={key}>
      <div className="flex justify-between mb-3">
        <div className="sub-heading">Applicable Departments</div>
        <div>
          <Button label="Add" icon="pi pi-plus" onClick={() => add()} />
        </div>
      </div>
      <div class="mb-3">
        <DataTable value={formData} paginator rows={5} scrollable>
          <Column
            field="department"
            header="Department"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              departmentActionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="incharge"
            header="Incharge"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              inchargeActionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="hod"
            header="Head of the Department"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              headActionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          ></Column>
          {/* <Column
            field="address_code"
            header="Address Code"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              addressCodeActionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          ></Column> */}
          <Column
            field="freeze"
            header="Freeze"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              freezeActionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="action"
            body={(rowData, options) => renderEditSaveButton(options.rowIndex)}
            style={{ width: "2%" }}
          />
          <Column
            field="action"
            body={(rowData, options) => renderCancelButton(options.rowIndex)}
            style={{ width: "2%" }}
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
      <div className="flex justify-end">
        <Button
          rounded={false}
          label="Save"
          //   onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    </div>
  );
}
