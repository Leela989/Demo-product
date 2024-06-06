import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./CustomTable.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";

function CustomTable({ data, columns, className, onUpdate }) {
  const menuOpen = useRef(null);

  const [tableData, setTableData] = useState();

  const customBody = (rowData, rowIndex, data, datatype) => {
    const value = data[rowIndex];
    if (datatype.field === "action") {
      const items = value.action.map((labelValue) => ({
        label: labelValue,
      }));

      return (
        <div>
          {items.length === 1 && items[0].label === "Delete" ? (
            <i className="pi pi-trash cursor-pointer"></i>
          ) : (
            <>
              <Button
                rounded text
                className="action-menu"
                icon="pi pi-ellipsis-v cursor-pointer"
                onClick={(event) => menuOpen.current.toggle(event)}
              />
              <Menu model={items} popup ref={menuOpen} />
            </>
          )}
        </div>
      );
    } else if (value[datatype.field]?.fieldType === "singleLine") {
      let inputData = value[datatype.field];
      return (
        inputData && (
          <InputText />
        )
      );
    } else if (value[datatype.field]?.fieldType === "dropDown") {
      const dropData = value[datatype.field];
      // console.log(dropData, "drop");
      return (
        dropData && <Dropdown />
      );
    } else if (value[datatype.field]?.fieldType === "checkBox") {
      return <Checkbox checked={true} />;
    } else if (value[datatype.field]?.fieldType === "autoComplete") {
      const dropData = value[datatype.field];
      return ( null
        // dropData && (
        //   <AutoComplete suggestions={value[datatype.field]} onChange={(rowData, rowIndex)=>handleFieldUpdate(rowData, rowIndex)} dropdown />
        // )
      );
    } else {
      return <p>{value[datatype.field]}</p>;
    }
  };

  /* functions below */
  const handleFieldUpdate = (rowData, rowIndex) => {
    console.log("customTable", rowData, rowIndex);
  };

  /* Render Below */
  return (
    <DataTable className={className} value={data}>
      {columns.map((column, index) => (
        <Column
          headerClassName={`${
            column.field === "action"
              ? "action"
              : column.field === "mandatory"
              ? "text-center"
              : null
          }`}
          bodyClassName={`${
            column.field === "action"
              ? "action"
              : column.field === "mandatory"
              ? "text-center"
              : null
          }`}
          key={index}
          field={column.field}
          header={column.header}
          body={(rowData, {rowIndex}) =>customBody(rowData, rowIndex, data, column)}
          // body= {customBody}
        ></Column>
      ))}
    </DataTable>
  );
}

export default CustomTable;
