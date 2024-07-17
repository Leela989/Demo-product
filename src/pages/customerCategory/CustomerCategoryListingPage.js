import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import data from "./CustomerCategoryListingPage.json";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./CustomerCategory.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import InputField from "../../components/InputField/InputField";
import CustomButton from "../../components/Button/CustomButton";
import { useParams } from 'react-router-dom';


export default function CustomerCategoryListingPage() {
  const menuLeft = useRef(null);
  
  const [customers, setCustomers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRecord, setEditRecord] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [cloneRow, setCloneRow] = useState(false);
  const [clonedRowDetails, setClonedRowDetails] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     setCustomers(
//       data.map((customer) => ({ ...customer, selectedAction: null }))
//     );
//   }, []);

 

  const handleEdit = (index) => {
    let selectedRowIndexKey = data[selectedIndex].key;
    navigate(
      `/partyManagement/partyRoleMaster/edit/${selectedIndex}`
    );
    setEditRecord(true);
  };

  const blockAttributeOptions = (rowData, rowIndex) => [
    { label: "View" },
    { label: "Edit", command: () => handleEdit(rowIndex) },
    { label: "Delete" },
    { label: "Approve" },
    { label: "Amend" },
    { label: "Clone", command: () => handleClone(rowData) },
  ];

  const handleClone = (rowData) => {
    setClonedRowDetails(rowData);
    setCloneRow(true);
    setDialogVisible(true);
  };

  const handleCreateNewClick = () => {
    navigate(
      `/partyManagement/partyRoleMaster/create/${data.length+1}`
    );
  };





  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu
          model={blockAttributeOptions(rowData, rowIndex)}
          popup
          ref={menuLeft}
          id="popup_menu_left"
        />
        <Button
          rounded
          text
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedIndex(rowIndex);
            setClonedRowDetails(rowData);
            console.log("rowIndex", rowIndex, rowData);
            return menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };



  const centerContent = (
    <div className="p-inputgroup search-input">
      <InputText
        placeholder="Search"
        className="searchBar"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <i className="pi pi-search" />
    </div>
  );

  return (
    <div className="listingPageContainer">
      <div className="searchContainer">
        <Toolbar center={centerContent} />
        <CustomButton
          label="Create New"
          onClick={handleCreateNewClick}
          // width={"120px"}
          // height={"36px"}
        />
      </div>
      <div className="listingTable">
        <DataTable
          value={data}
          paginator rows={5} scrollable
        >
          <Column field="category_code" header="Category Code" />
          <Column field="description" header="Description" />
          <Column field="entity_type" header="Entity type" />
          <Column field="prefix" header="Prefix" />
          <Column
            field="effectiveFrom"
            header="Effective From"
          />
          <Column
            field="effectiveTo"
            header="Effective To"
          />
   
          <Column
            header="Action"
            headerClassName="action"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
