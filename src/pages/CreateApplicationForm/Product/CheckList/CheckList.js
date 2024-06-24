import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../../components/InputField/InputField";
import CustomButton from "../../../../components/Button/CustomButton";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import AutoCompleteField from "../../../../components/AutoCompleteField/AutoCompleteField";
import { useParams } from "react-router";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import CheckListData from "./CheckList.json";

function CheckList({ productData }) {
  const menuLeft = useRef(null);
  const [editingRows, setEditingRows] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [tableData, setTableData] = useState([]);

  const items = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedIndex) },
    { label: "Save", command: () => onSave(selectedIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: true }));
  };

  const onSave = (rowIndex) => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: false }));
  };

  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find(
    (product) => product.key === productKey
  );

  useEffect(() => {
    if (matchingProduct) {
      setTableData(CheckListData);
    }
  }, [matchingProduct]);

  const actionBodyTemplate = (rowData, options) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedIndex(options.rowIndex);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const handleAdd = () => {
    const newRow = {
      srl: "",
      documentId: "",
      documentName: "",
      printBeforeApproval: false,
      reprintAllowed: false,
      numberOfPrints: 0,
    };
    setTableData((prev) => [...prev, newRow]);
    const newIndex = tableData.length;
    setEditingRows((prev) => ({ ...prev, [newIndex]: true }));
    setEditingRowIndex(newIndex);
  };

  const handleInputChange = (name, value, rowIndex) => {
    const newData = [...tableData];
    newData[rowIndex][name] = value;
    setTableData(newData);
  };

  const onCancel = () => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [editingRowIndex]: false }));
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
          onClick={() => onSave(rowIndex)}
        ></i>
      );
    } else {
      return null;
    }
  };

  const fieldTypeOptions = [
    { name: "Set1" },
    { name: "Set2" },
    { name: "Set3" },
    { name: "Set4" },
  ];

  const render_documentPrints_header = () => {
    return (
      <div className="flex justify-end">
        <CustomButton
          label="+ADD"
          onClick={handleAdd}
          className="small-btn mt-4 -ml-16"
        />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          header={render_documentPrints_header}
          value={tableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            field="Transaction_type"
            header="Transaction Type"
            body={(rowData, options) => (
              <AutoCompleteField
                className="w-4/4"
                name="Transaction_type"
                value={rowData.transaction_type}
                onChange={() => {
                  // console.log("");
                }}
                options={fieldTypeOptions}
                disabled={!editingRows[options.rowIndex]}
                dropdown
              />
            )}
          />
          <Column
            field="id"
            header="Transaction ID"
            style={{ width: "55%" }}
            body={(rowData, options) => (
              <InputField
                type="text"
                name="id"
                className="w-4/4"
                value={rowData.id}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="checklist_description"
            header="Checklist Description"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="checklist_description"
                value={rowData.checklist_description}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            field="effective_from"
            header="Effective From"
            style={{ width: "55%" }}
            body={(rowData, options) => (
              <DateField
                className="w-700px p-1"
                name="effective_from"
                value={rowData.effective_from}
                onChange={handleInputChange}
                disabled={!editingRows[options.rowIndex]}
              />
            )}
          />
          <Column
            field="effective_to"
            header="Effective To"
            style= {{width: '25%'}}
            body={(rowData, options) => (
              <DateField
                className="w-4/4 p-1"
                name="effective_to"
                value={rowData.effective_to}
                onChange={handleInputChange}
                disabled={!editingRows[options.rowIndex]}
              />
            )}
          />
          <Column
            style={{ width: "5%" }}
            field="mandatory_yn"
            header="Mandatory Y/N"
            body={(rowData, options) => (
              <CheckBox
                checked={rowData.mandatory_yn || false}
                disabled={!editingRows[options.rowIndex]}
              />
            )}
          />
          <Column
            field="remark_required"
            header="Remark Required?"
            body={(rowData, options) => (
              <CheckBox
                checked={rowData.remark_required || false}
                disabled={!editingRows[options.rowIndex]}
              />
            )}
          />

          <Column
            style={{ width: "5%" }}
            field="document_required"
            header="Document Required"
            body={(rowData, options) => (
              <InputField
                type="number"
                name="numberOfPrints"
                value={rowData.document_required}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
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
          <Column body={actionBodyTemplate} style={{ width: "10%" }} />
        </DataTable>
      </div>
    </div>
  );
}

export default CheckList;
