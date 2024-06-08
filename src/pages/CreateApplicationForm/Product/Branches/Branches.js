import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import CustomButton from "../../../../components/Button/CustomButton";
import AutoCompleteField from "../../../../components/AutoCompleteField/AutoCompleteField";
import "./Branches.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useParams } from 'react-router-dom';

function Branches({ productData }) {
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const menuLeft = useRef(null);
  const matchingProduct = productData.find(product => product.key === productKey);

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newRowData, setNewRowData] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Branches) {
      setBranchData(matchingProduct.data[0].Branches);
    }
  }, [matchingProduct]);

  const cellCheckBox = (rowData, options) => {
    return (
      <CheckBox
        checked={rowData.include}
        disabled={editingRowIndex !== options.rowIndex}
      />
    );
  };

  const OptionsForBranches = [
    { code: "03", name: "Mbeya Branch" },
    { code: "01", name: "Head Office" },
    { code: "02", name: "Mwanza Branch" },
    { code: "04", name: "Arusha Branch" },
    { code: "06", name: "Mbagala Branch" },
    { code: "05", name: "Dodoma Branch" },
    { code: "07", name: "Digital-sure Branch" },
    { code: "08", name: "Zanzibar Branch" },
  ];

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const handleInputChange = (e, rowIndex) => {
    // handle input change logic
  };

  const branchAutoComplete = (rowData, options) => {
    return (
      <AutoCompleteField
        name="branch"
        options={OptionsForBranches}
        value={rowData.Name}
        dropdown
        onChange={(e) => handleInputChange(e, options.rowIndex)}
        disabled={editingRowIndex !== options.rowIndex}
      />
    );
  };

  const onEdit = (rowIndex) => {
    console.log('clickedEdit', rowIndex);
    setEditingRowIndex(rowIndex);
  };

  const onSave = () => {
    setEditingRowIndex(null);
    setNewRowData(null);
  };

  const onCancel = () => {
    setEditingRowIndex(null);
    setNewRowData(null);
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

  const addNewRow = () => {
    const newBranch = { Name: "", include: false };
    setBranchData([...branchData, newBranch]);
    setEditingRowIndex(branchData.length);
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
            console.log('clicking', index.rowIndex);
            setSelectedRowIndex(index.rowIndex);
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
      <div className="defaultAllBranches">
        <CheckBox labelName="Default all branches" />
      </div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={(id >= productData.length || !productData[id]?.data?.[0]?.Branches) ? [] : branchData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          scrollHeight="300px"
          header="Branches data"
        >
          <Column field="Name" header="Branches" body={branchAutoComplete} />
          <Column
            field="include"
            header="Include"
            body={cellCheckBox}
            style={{ width: "10%" }}
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
            body={actionBodyTemplate}
            style={{ width: "5%" }}
          />
        </DataTable>
        <div>
          <CustomButton
            label="ADD"
            onClick={addNewRow}
            className="small-btn mt-4 -ml-16"
          />
        </div>
      </div>
    </div>
  );
}

export default Branches;
