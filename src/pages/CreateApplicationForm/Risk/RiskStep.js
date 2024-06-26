import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import RiskHeaderData from "../Risk/MockData/RiskHeader.json";
import RiskTabs from "../Risk/RiskTabView/RiskTabs";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import "./RiskTabView/RiskTab.css";
import CustomButton from "../../../components/Button/CustomButton";
import { useParams } from "react-router-dom";

function RiskStep() {
  const [riskData, setRiskData] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newRowData, setNewRowData] = useState(null);
  const [disableRow, setDisableRow] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);
  const toast = useRef(null);
  const menuLeft = useRef(null);
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const [selectedRow, setSelectedRow] = useState(RiskHeaderData[0]);

  const riskTypeOptions = [
    { name: "MC", code: "MC" },
    { name: "HC", code: "HC" },
    { name: "LC", code: "LC" },
  ];

  const insurableProductOptions = [
    { name: "Vehicle" },
    { name: "Health" },
    { name: "Home" },
    { name: "Business" },
    { name: "Phone" },
  ];

  const onEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setDisableRow(false);
  };

  useEffect(() => {
    if (productKey == 2301) {
      setRiskData(RiskHeaderData);
    }
  }, [productKey, selectedRow]);

  const handleInputChange = (e, rowIndex, field) => {
    const newData = [...riskData];
    newData[rowIndex][field] = e.value;
    setRiskData(newData);
  };

  const onSave = () => {
    validateRow(editingRowIndex);
  };

  const validateRow = (rowIndex) => {
    const rowData = riskData[rowIndex];
    const errors = [];

    if (rowData.riskType !== undefined) {
      errors.push({ field: "riskType", message: "Risk Type is required" });
    }

    if (rowData.insurableProduct !== undefined) {
      errors.push({
        field: "insurableProduct",
        message: "Insurable Product is required",
      });
    }

    if (errors.length > 0) {
      showErrorToast();
    } else {
      setEditingRowIndex(null);
      setNewRowData(null);
      setDisableRow(false);
      showSuccess();
    }
  };

  const onCancel = () => {
    setEditingRowIndex(null);
    setNewRowData(null);
  };

  const renderCancelButton = (rowIndex) => {
    if (editingRowIndex === rowIndex) {
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
          }}
          onClick={onCancel}
        ></i>
      );
    } else {
      return null;
    }
  };

  const renderEditSaveButton = (rowIndex) => {
    if (editingRowIndex === rowIndex) {
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
            onClick={onSave}
          ></i>
          <i
            className="pi pi-times pl-4"
            style={{
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={onCancel}
          ></i>
        </div>
      );
    } else {
      return null;
    }
  };

  const blockAttributeOptions = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedIndex) },
    { label: "Delete" },
  ];

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Action completed successfully",
      life: 3000,
    });
  };

  const showErrorToast = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Please fill all required fields",
      life: 3000,
    });
  };

  const addNewRow = () => {
    const newRow = {
      riskType: "",
      insurableProduct: "",
    };
    setRiskData([...riskData, newRow]);
    setEditingRowIndex(riskData.length);
  };

  const render_header_riskdata = () => {
    return (
      <div>
        <div className="flex justify-end">
          <CustomButton
            label="+Add"
            onClick={addNewRow}
            className="small-btn"
          />
        </div>
      </div>
    );
  };

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
          className="action-menu"
          onClick={(event) => {
            setSelectedIndex(rowIndex);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const isFieldInvalid = (fieldName) => {
    return validationErrors.some((error) => error.field === fieldName);
  };


  const handleRowSelect = (e) => {
    const selectedRowData = e.value;
    setSelectedRow(selectedRowData);
  };

  

  return (
    <div className="riskContainer">
      <Toast ref={toast} />
      <div className="riskBox">
        <DataTable
          value={riskData}
          scrollable
          scrollHeight="200px"
          header={render_header_riskdata}
          selectionMode="single"
          onSelectionChange={handleRowSelect}
          selection={selectedRow}
        >
          <Column selectionMode="single" style={{ width: "5px" }}></Column>
          <Column
            field="riskType"
            header="Risk Type"
            body={(rowData, options) => (
              <AutoCompleteField
                className={`w-2/2 p-1 ${
                  isFieldInvalid("riskType") ? "invalid-field" : ""
                }`}
                name="riskType"
                value={rowData.riskType}
                onChange={(e) =>
                  handleInputChange(e, options.rowIndex, "riskType")
                }
                options={riskTypeOptions}
                dropdown
                disabled={editingRowIndex !== options.rowIndex}
              />
            )}
          />
          <Column
            field="insurableProduct"
            header="Insurable Product"
            body={(rowData, options) => (
              <AutoCompleteField
                className={`w-2/2 p-1 ${
                  isFieldInvalid("insurableProduct") ? "invalid-field" : ""
                }`}
                name="insurableProduct"
                value={rowData.insurableProduct}
                onChange={(e) =>
                  handleInputChange(e, options.rowIndex, "insurableProduct")
                }
                options={insurableProductOptions}
                dropdown
                disabled={editingRowIndex !== options.rowIndex}
              />
            )}
          />
          <Column
            field="action"
            body={(rowData, options) => renderEditSaveButton(options.rowIndex)}
            style={{ width: "5%" }}
          />
          {/* <Column
            field="action"
            body={(rowData, options) => renderCancelButton(options.rowIndex)}
            style={{ width: "5%" }}
          /> */}
          <Column
            header="Action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>
      <div className="riskTabs">
        <RiskTabs />
      </div>
    </div>
  );
}

export default RiskStep;
