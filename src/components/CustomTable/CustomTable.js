import React, { useRef, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./CustomTable.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { useParams } from "react-router-dom";
 
function CustomTable({ name, data, columns, onUpdate, className, options }) {
  const {type} = useParams();
  const menuOpen = useRef(null);
  const toast = useRef(null);
  const [ReceivedTableData, setReceivedTableData] = useState(data);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState({selected: null, active: false});
 
  useEffect(() => {
    setReceivedTableData(data);
  }, [data]);
 
  useEffect(() => {
    if(type === 'new') {
      setSelectedRow({selected: 0, active: true})
    }
  }, [])
 
 
  const handleTableSave = (rowIndex, datatype) => {
    onUpdate(ReceivedTableData, datatype);
    setSelectedRow({selected: null, active: false});
    setAutocompleteValue(null);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Table Data Saved Successfully",
    });
  };
 
  const handleTableCancel = (rowIndex, datatype) => {
    if (rowIndex === ReceivedTableData.length - 1) {
      setReceivedTableData(data);
    } else {
      setReceivedTableData(
        ReceivedTableData.splice(1, ReceivedTableData.length - 1)
      );
    }
  };
 
  const handleMenuClick = (data, rowData) => {
    if (data.item.label === "Edit") {
      if (selectedRow !== null) {
        setSelectedRow({...selectedRow, active: true});
      }
    }
  };
 
  const EditData = ["Edit", "Delete"];
 
  const customBody = (rowData, rowHeader) => {
    let findType = columns
      .reduce((acc, rowField) => {
        if (rowField.field === rowHeader.field) {
          acc.push(rowField.fieldType);
        }
        return acc;
      }, [])
      .join("");
 
    if (rowHeader.field === "action") {
      const items = EditData.map((labelValue) => ({
        label: labelValue,
        key: rowHeader.rowIndex,
        command: (data) => {
          handleMenuClick(data, rowData);
        },
      }));
 
      const handleActionColumnData = () => {
        if (rowHeader.rowIndex === selectedRow['selected'] && selectedRow['active']) {
          return (
            <div className="flex items-center save-btn">
              <Button
                onClick={() => handleTableSave(rowHeader.rowIndex, columns)}
                label="Save"
              />
              <Button
                outlined
                onClick={() => handleTableCancel(rowHeader.rowIndex, columns)}
                label="Cancel"
              />
            </div>
          );
        } else if (items.length === 1 && items[0].label === "Delete") {
          return <i className="pi pi-trash cursor-pointer"></i>;
        } else {
          return (
            <>
              <Button
                rounded
                text
                className="action-menu"
                icon="pi pi-ellipsis-v cursor-pointer"
                onClick={(event) => {
                  setSelectedRow({selected: rowHeader.rowIndex, active: false});
                  menuOpen.current.toggle(event);
                }}
              />
              <Menu key={rowHeader.rowIndex} model={items} popup ref={menuOpen} />
            </>
          );
        }
      };
 
      return <div>{handleActionColumnData()}</div>;
    } else if (findType === "checkBox") {
      if (name !== "riskTypes") {
        const dropData = rowData;
        return (
          <Checkbox
            onChange={(event) => handleCheckBox(event, rowData, rowHeader)}
            checked={dropData?.mandatory}
            disabled={!(rowHeader.rowIndex === selectedRow['selected'] && selectedRow['active'])}
          />
        );
      }
    } else if (findType === "autoComplete") {
      const dropData =
        name !== "riskTypes" ? rowData : rowData[rowHeader.field];
        const search = (event) => {
          let _items = options.filter((item) =>
            item.name.toLowerCase().startsWith(event.query.toLowerCase())
          );
          setFilteredOptions(_items);
        };
      return (
        dropData && (
          <AutoComplete
            field="name"
            name={dropData.name}
            value={!dropData.name ? autocompleteValue : dropData}
            suggestions={filteredOptions}
            completeMethod={search}
            disabled={!(rowHeader.rowIndex === selectedRow['selected'] && selectedRow['active'])}
            onChange={(event) =>
              handleFieldUpdate(event, rowHeader, rowData, data)
            }
            dropdown
          />
        )
      );
    } else {
      return <p>{rowData.name}</p>;
    }
  };
 
  const handleCheckBox = (event, rowData, rowHeader) => {
    let dataIndex = rowHeader.rowIndex;
    const tempRiskData = [...ReceivedTableData];
    let object = { ...tempRiskData[dataIndex] };
    let newObject;
    Object.keys(object).forEach((key) => {
      newObject = { ...object, mandatory: event.checked };
    });
    object = { ...newObject };
    tempRiskData[dataIndex] = object;
    setReceivedTableData(tempRiskData);
  };
 
  /* functions below */
  const handleFieldUpdate = (event, rowHeader, rowData) => {
    let dataIndex = rowHeader.rowIndex;
    const tempRiskData = [...ReceivedTableData];
    let object = { ...tempRiskData[dataIndex] };
 
    if (name === "riskTypes") {
      Object.keys(object).forEach((key) => {
        if (key === rowHeader.field) {
          setAutocompleteValue(event.value);
          let newObject = {
            name: event.value.name,
            code: event.value.code,
          };
          object[key] = { ...newObject };
        }
      });
    } else {
      let newObject;
      setAutocompleteValue(event.value);
      Object.keys(object).forEach((key) => {
        newObject = {
          ...object,
          name: event.value.name,
          code: event.value.Code,
        };
      });
      object = { ...newObject };
    }
 
    tempRiskData[dataIndex] = object;
    setReceivedTableData(tempRiskData);
  };
 
  /* Render Below */
  return (
    <>
      <Toast ref={toast} />
      <DataTable className={className} value={ReceivedTableData}>
        {columns.map((column, index) => (
          <Column
            // headerClassName={`${
            //   column.field === "action"
            //     ? "action"
            //     : column.field === "mandatory"
            //     ? "text-center"
            //     : null
            // }`}
            // bodyClassName={`${
            //   column.field === "action"
            //     ? "action"
            //     : column.field === "mandatory"
            //     ? "text-center"
            //     : null
            // }`}
            key={index}
            field={column.field}
            header={column.header}
            // body={(rowData, { rowIndex }, index) =>
            //   customBody(rowData, rowIndex, column, index)
            // }
            body={customBody}
          ></Column>
        ))}
      </DataTable>
    </>
  );
}
 
export default CustomTable;
 
