import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Accordion, AccordionTab } from "primereact/accordion";
import InputField from "../../../../components/InputField/InputField";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import riskAttributeData from "../MockData/RiskAttributes.json";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../../components/Button/CustomButton";
import { useParams } from "react-router-dom";

function RiskAttributes() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const menuLeft = useRef(null);
  const { id, key } = useParams();
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [blockTable_data, set_blockTable_data] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [editing_index_blockAttributes, set_editing_index_blockAttributes] =
    useState(null);

  const blockAttributeOptions = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
  };

  const blockNameList = [
    { name: "Vehicle details" },
    { name: "Driver details" },
    { name: "Geographical Extension" },
  ];

  const handleInputChange = () => {};

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
          onClick={(event) => {
            setSelectedRowIndex(rowIndex);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  useEffect(() => {
    set_blockTable_data(riskAttributeData.data);
  }, []);

  const handleRowSelect = (e) => {
    const selectedRowData = e.value;
    setSelectedRow(selectedRowData);
    if (selectedRowData && selectedRowData.attributes) {
      setSelectedAttributes(selectedRowData.attributes);
    } else {
      setSelectedAttributes([]);
    }
  };

  const dataTypes = [{ name: "Text" }, { name: "Number" }, { name: "Date" }];

  const fieldTypes = [
    { name: "Input Field" },
    { name: "Dropdown" },
    { name: "Checkbox" },
    { name: "Radio Button" },
    { name: "Textarea" },
    { name: "Date Picker" },
    { name: "Time Picker" },
    { name: "File Upload" },
    { name: "Color Picker" },
    { name: "Slider" },
  ];

  const handleAddRow = (event) => {
    event.stopPropagation();
    const newRow = {
      FieldID: "",
      FieldName: "",
      dataType: "",
      FieldType: "",
      "max-width": "",
      serial: "",
      "Default-value": "",
      " Mandatory_yn": false,
      "Hide Y/N": false,
      claimlookupYN: false,
    };

    setSelectedAttributes([...selectedAttributes, newRow]);
    setEditingRowIndex(selectedAttributes.length);
  };

  const handle_blockAttributes_AddRow = (event) => {
    event.stopPropagation();
    const newRow = {
      blockName: "",
      parentBlockName: "",
      srlNo: "",
      levelNo: "",
    };
    set_blockTable_data([...blockTable_data, newRow]);
    set_editing_index_blockAttributes(blockTable_data.length);
  };

  const renderEditSaveButton_blockAttributes = (rowIndex) => {
    if (editing_index_blockAttributes === rowIndex) {
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
              onClick={onSave_blockattributes}
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
              onClick={onCancel_blockattributes}
            ></i>
          </div>
        </div>
      );
    } else {
      return null;
    }
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

  const onSave = () => {
    setEditingRowIndex(null);
  };

  const onSave_blockattributes = () => {
    set_editing_index_blockAttributes(null);
  };

  const onCancel_blockattributes = () => {
    set_editing_index_blockAttributes(null);
  };

  const onCancel = () => {
    setEditingRowIndex(null);
  };

  const render_fieldAttributes_header = (header) => {
    return (
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div className="flex">
          <CustomButton
            label="+ADD"
            onClick={(event) => handleAddRow(event)}
            className="small-btn mt-4 -ml-16"
          />
        </div>
      </div>
    );
  };

  const render_blockAttributes_header = (header) => {
    return (
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div className="flex">
          <CustomButton
            label="+ADD"
            onClick={(event) => handle_blockAttributes_AddRow(event)}
            className="small-btn mt-4 -ml-16"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="card">
        <Accordion multiple activeIndex={[0]}>
          <AccordionTab
            header={render_blockAttributes_header("Block Attributes")}
          >
            <div style={{ display: "flex" }}>
              <DataTable
                value={key == 2301 ? blockTable_data : []}
                selectionMode="single"
                selection={selectedRow}
                onSelectionChange={handleRowSelect}
                dataKey="blockName"
                scrollable
                scrollHeight="200px"
                // header={render_blockAttributes_header}
              >
                <Column
                  selectionMode="single"
                  style={{ width: "5px" }}
                ></Column>

                <Column
                  field="blockName"
                  header="Block Name"
                  body={(rowData, options) => (
                    <InputField
                      className="w-3/4"
                      type="text"
                      value={rowData.blockName}
                      disabled={
                        editing_index_blockAttributes !== options.rowIndex
                      }
                    />
                  )}
                />
                <Column
                  field="parentBlockName"
                  header="Parent Block Name"
                  body={(rowData, options) => (
                    <AutoCompleField
                      className="w-4/4"
                      value={rowData.parentBlockName}
                      onChange={handleInputChange}
                      options={blockNameList}
                      dropdown
                      disabled={
                        editing_index_blockAttributes !== options.rowIndex
                      }
                    />
                  )}
                />
                <Column
                  field="srlNo"
                  header="Serial No."
                  body={(rowData, options) => (
                    <InputField
                      className="w-2/4"
                      type="text"
                      value={rowData.srlNo}
                      disabled={
                        editing_index_blockAttributes !== options.rowIndex
                      }
                    />
                  )}
                />
                <Column
                  field="levelNo"
                  header="Level No"
                  body={(rowData, options) => (
                    <InputField
                      className="w-2/4"
                      type="text"
                      value={rowData.levelNo}
                      disabled={
                        editing_index_blockAttributes !== options.rowIndex
                      }
                    />
                  )}
                />
                <Column
                  field="action"
                  className="w-5"
                  body={(rowData, options) =>
                    renderEditSaveButton_blockAttributes(options.rowIndex)
                  }
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
          </AccordionTab>
          <AccordionTab
            header={render_fieldAttributes_header("Field Attributes")}
          >
            <div style={{ display: "flex" }}>
              <DataTable
                key={selectedRow ? selectedRow.blockName : "default"}
                value={selectedAttributes}
                scrollable
                scrollHeight="200px"
                dataKey="FieldID"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                // header={render_fieldAttributes_header}
              >
                <Column
                  field="FieldID"
                  header="Field ID"
                  body={(rowData, options) => (
                    <InputField
                      type="number"
                      value={rowData.Field_Id}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="FieldName"
                  header="Field Name"
                  body={(rowData, options) => (
                    <InputField
                      type="text"
                      value={rowData.Field_Name}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="dataType"
                  header="Data Type"
                  style={{ width: "10%" }}
                  body={(rowData, options) => (
                    <AutoCompleField
                      className="w-4/4"
                      value={rowData.Data_Type}
                      onChange={handleInputChange}
                      options={dataTypes}
                      dropdown
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="FieldType"
                  header="Field Type"
                  style={{ width: "10%" }}
                  body={(rowData, options) => (
                    <AutoCompleField
                      className="w-4/4"
                      value={rowData.Field_type}
                      onChange={handleInputChange}
                      options={fieldTypes}
                      dropdown
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="max-width"
                  header="Max Width"
                  body={(rowData, options) => (
                    <InputField
                      type="text"
                      value={rowData.max_width}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="serial"
                  header="Serial"
                  body={(rowData, options) => (
                    <InputField
                      type="text"
                      value={rowData.Serial_no}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="Default-value"
                  header="Default Value"
                  body={(rowData, options) => (
                    <InputField
                      type="text"
                      value={rowData.Default_Value}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="Mandatory_yn"
                  header="Mandatory"
                  body={(rowData, options) => (
                    <input
                      type="checkbox"
                      checked={rowData.Mandatory_yn || false}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="Hide Y/N"
                  header="Hide Y/N"
                  body={(rowData, options) => (
                    <input
                      type="checkbox"
                      checked={rowData.Hide_yn || false}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="claimlookupYN"
                  header="Claim Lookup YN"
                  body={(rowData, options) => (
                    <input
                      type="checkbox"
                      checked={rowData.Claimlookup_yn || false}
                      disabled={editingRowIndex !== options.rowIndex}
                    />
                  )}
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="action"
                  className="w-5"
                  body={(rowData, options) =>
                    renderEditSaveButton(options.rowIndex)
                  }
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
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}

export default RiskAttributes;
