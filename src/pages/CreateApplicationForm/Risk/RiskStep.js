import React, { useState, useRef } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import RiskHeaderData from '../Risk/MockData/RiskHeader.json';
import RiskTabs from '../Risk/RiskTabView/RiskTabs';
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import AutoCompleteField from '../../../components/AutoCompleteField/AutoCompleteField';
import './RiskTabView/RiskTab.css';
import CustomButton from "../../../components/Button/CustomButton";
import { FormatListBulletedRounded } from '@mui/icons-material';



function RiskStep() {
  const [riskData, setRiskData] = useState(RiskHeaderData);
  const [editingRows, setEditingRows] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newRowData, setNewRowData] = useState(null);
  const [disableRow, setDisableRow] = useState(true);
  const toast = useRef(null);
  const menuLeft = useRef(null);

  const riskTypeOptions = [
    { name: 'MC', code: 'MC' },
    { name: 'HC', code: 'HC' },
    { name: 'LC', code: 'LC' }
  ];

  const insurableProductOptions = [
    { name: 'Vehicle' },
    { name: 'Health' },
    { name: 'Home' },
    { name: 'Business' },
    { name: 'Phone' }
  ];

  const onEdit = (rowIndex) => {
    console.log("clickedEdit", rowIndex);
    setEditingRowIndex(rowIndex);
    setDisableRow(false)
  };


  const handleInputChange = (e, rowIndex, field) => {
    const newData = [...riskData];
    newData[rowIndex][field] = e.value;
    setRiskData(newData);
  };

  const onSave = () => {
    setEditingRowIndex(null);
    setNewRowData(null);
    setDisableRow(false);
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
      );
    } else {
      return null;
    }
  };

  const blockAttributeOptions = [
    {name : "View"},
    {name : "Edit", command: () =>  onEdit(selectedIndex)},
    {name : "Delete"}
  ]



  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Action completed successfully', life: 3000 });
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
          onClick={(event) =>{
            setSelectedIndex(rowIndex);
            menuLeft.current.toggle(event)}
          } 
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  return (
    <div className="riskContainer">
      <Toast ref={toast} />
      <div className="riskBox">
        <DataTable value={riskData} scrollable scrollHeight="200px">
          <Column
            field="riskType"
            header="Risk Type"
            body={(rowData, options) => (
              <AutoCompleteField
                className="w-2/2 p-1"
                name="riskType"
                value={rowData.riskType}
                onChange={(e) => handleInputChange(e, options.rowIndex, 'riskType')}
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
                className="w-2/2 p-1"
                name="insurableProduct"
                value={rowData.insurableProduct}
                onChange={(e) => handleInputChange(e, options.rowIndex, 'insurableProduct')}
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
          <Column
            field="action"
            body={(rowData, options) => renderCancelButton(options.rowIndex)}
            style={{ width: "5%" }}
          />
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
