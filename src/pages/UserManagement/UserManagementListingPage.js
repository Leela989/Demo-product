import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import data from "./UserManagement_listing.json";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./UserAuthorisationSetup.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CustomButton from "../../components/Button/CustomButton";
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import InputField from "../../components/InputField/InputField";
import json_data from './UserManagement_listing.json';

export default function UserManagementListingPage() {
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

  useEffect(() => {
    setCustomers(
      data.map((customer) => ({ ...customer, selectedAction: null }))
    );
  }, []);

 

  const handleEdit = (index) => {
    let selectedRowIndexKey = data[selectedIndex].key;
    navigate(
      `/userManagement/userAuthorisationSetup/editApplicaion/${selectedIndex}`
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

  const handleClone = () => {

  }



  const handleCreateNewClick = () => {
    navigate(
      `/userManagement/userAuthorisationSetup/createNew/${json_data.length + 1}`
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
          value={json_data}
          paginator
          rows={rowsPerPage}
          first={currentPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          scrollHeight="400px"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="user_group" header="User Group" body={(rowData) => rowData.user_group} />
          <Column
            field="user"
            header="User"
          />
          <Column
            field="company"
            header="Company"
          />
           <Column
            field="branch"
            header="Branch"
          />
           <Column
            field="department"
            header="Department"
          />
           <Column
            field="lob"
            header="LOB"
          />
          <Column
            field="product"
            header="Product"
          />
          
          <Column
            header="Action"
            headerClassName="action"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
          />
        </DataTable>
      </div>
     
    </div>
  );
}
