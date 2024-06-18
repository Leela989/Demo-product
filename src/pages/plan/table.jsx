import { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { masterPlanData } from "../../mock-data/plan/plan-table";
import { Link } from "react-router-dom/dist";
const PlanTableData = () => {
  const menuOpen = useRef(null);
  const planTableData = masterPlanData;
  const [selectedRow, setSelectedRow] = useState(null);
  const tableDisplayColumn = [
    { field: "code", header: "Code" },
    { field: "type", header: "Type" },
    { field: "description", header: "Description" },
    { field: "effectiveForm", header: "Effective From" },
    { field: "effectiveTo", header: "Effective To" },
    { field: "action", header: "" },
  ];
  // const tableValueStruct = () => {
  //     return(
  //         planTableData.map(data => data.planAndSchame)
  //     )
  // }

  // console.log(tableValueStruct, "tableValueStruct");

  const tableDataForming = planTableData.map((item) => {
    return {
      id: item.id,
      ...item.planAndSchame,
    };
  });

  const handleMenuClick = (rowData) => {
    console.log(rowData, "handleEdit");
  };
  const menuList = (rowData) => [
    {
      items: [
        {
          template: (item, options) => {
            console.log(rowData, "rowDatarowData");
            return (
              <Link
                className={options.className}
                to={`/plan/edit/${rowData.id}`}
                onClick={handleMenuClick(rowData)}
                style={{ textDecoration: "none" }}
              >
                Edit
              </Link>
            );
          },
        },
      ],
    },
  ];
  const customBody = (rowData, data) => {
    // const menuList=['edit'];

    if (data.field === "action") {
      return (
        <>
          <Button
            rounded
            text
            className="action-menu"
            icon="pi pi-ellipsis-v cursor-pointer"
            onClick={(event) => {
              setSelectedRow(rowData);
              menuOpen.current.toggle(event);
            }}
          />
          <Menu
            model={selectedRow ? menuList(selectedRow) : []}
            popup
            ref={menuOpen}
          />
        </>
      );
    } else if (data.field === "description") {
      return <p>{rowData[data.field][0].description}</p>;
    } else if (data.field === "type") {
      return <p>{rowData[data.field].name}</p>;
    } else {
      return <p>{rowData[data.field]}</p>;
    }
  };

  return (
    <div>
      <div className="flex justify-end pb-3">
        <Link
          to={`/plan/new`}
          style={{
            textDecoration: "none",
            color: "#003B95",
            fontWeight: "bold",
          }}
        >
          Create New
        </Link>
      </div>
      <DataTable value={tableDataForming}>
        {tableDisplayColumn.map((column, index) => {
          return (
            <Column
              key={index}
              headerClassName={`${column.field === "action" ? "action" : null}`}
              bodyClassName={`${column.field === "action" ? "action" : null}`}
              field={column.field}
              header={column.header}
              body={customBody}
            />
          );
        })}
      </DataTable>
    </div>
  );
};

export default PlanTableData;
