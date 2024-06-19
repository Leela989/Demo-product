import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import CustomButton from "../../../../components/Button/CustomButton";
import AutoCompleteField from "../../../../components/AutoCompleteField/AutoCompleteField";
import "./Branches.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useParams } from "react-router-dom";

function Branches({ productData }) {
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const menuLeft = useRef(null);
  const matchingProduct = productData.find(
    (product) => product.key === productKey
  );

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newRowData, setNewRowData] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const [defaultAllBranches, setDefaultAllBranches] = useState(false);
  const [previousBranchData, setPreviousBranchData] = useState([]);

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
        onChange={(name, checked) => handleInputChange(name, checked, options.rowIndex)}
        name="include"
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

  const handleInputChange = (name, checked, rowIndex) => {
    const updatedBranchData = branchData.map((branch, index) =>
      index === rowIndex ? { ...branch, [name]: checked } : branch
    );
    setBranchData(updatedBranchData);

    if (defaultAllBranches && !checked) {
      setDefaultAllBranches(false);
      setPreviousBranchData(branchData); 
    }
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
    console.log("clickedEdit", rowIndex);
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
        <div className="flex ml-2">
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
          </div>
          <div className="ml-5">
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
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

 

  const addNewRow = () => {
    const newBranch = { Name: "", include: defaultAllBranches };
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
            setSelectedRowIndex(index.rowIndex);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const render_Braches_Header = (header) => {
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

  const handleDefaultAllBranchesChange = (name, checked) => {
    setDefaultAllBranches(checked);
  
    if (checked) {
      setPreviousBranchData(branchData);
      const updatedBranchData = branchData.map(branch => ({
        ...branch,
        include: true
      }));
      setBranchData(updatedBranchData);
    } else {
      setBranchData(previousBranchData);
    }
  };
  

  return (
    <div>
      <div className="defaultAllBranches">
        <CheckBox
          labelName="Default all branches"
          checked={defaultAllBranches}
          onChange={(name, checked) => handleDefaultAllBranchesChange(name, checked)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <DataTable
          value={branchData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          scrollHeight="300px"
          header={render_Braches_Header}
        >
          <Column field="Name" header="Branches" body={branchAutoComplete} />
          <Column field="include" header="Include" body={cellCheckBox} />
          <Column
            field="action"
            className="w-5"
            body={(rowData, options) => renderEditSaveButton(options.rowIndex)}
          />
          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}

export default Branches;
