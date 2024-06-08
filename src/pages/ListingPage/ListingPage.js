import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import data from "./ListingPageNew.json";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ListingPage.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CustomButton from "../../components/Button/CustomButton";
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import InputField from "../../components/InputField/InputField";

export default function ListingPage() {
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
    console.log('dataM', data);
    console.log('edit clicked for row index:', index);
    let selectedRowIndexKey = data[selectedIndex].key;
    navigate(`/productConfigurator/productSetup/editApplication/${selectedIndex}/${selectedRowIndexKey}`);
    setEditRecord(true);
  }

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
  }

  const handleCreateNewClick = () => {
    navigate(`/productConfigurator/productSetup/createApplication/${data.length + 1}`);
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = globalFilter.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchValue) ||
      customer.effectiveFrom.toLowerCase().includes(searchValue) ||
      customer.effectiveTo.toLowerCase().includes(searchValue) ||
      customer.status.toLowerCase().includes(searchValue)
    );
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "approved":
        return "green";
      case "rejected":
        return "red";
      default:
        return "black";
    }
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
            console.log('rowIndex', rowIndex, rowData);
            return menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const handleChange = () => {

  }

  const cloneModal = () => {
    if (clonedRowDetails) {
      return (
        <div>
            <div>{`You are trying to clone ${data[selectedIndex].name}`}</div>
            <div className="productDetailsPopup">
            <h1>New product details</h1>
            <InputField
            className="w-1/2 ml-2 mt-3"
            name="productCode"
            label="Product Code"
            labelType="left"
            // value={formData.Code}
            // onChange={(e) => handleChange("Code", e.target.value)}
          />
                    <InputField
            className="w-1/2 ml-2"
            name="productDescription"
            label="Produt Description"
            labelType="left"
            // value={formData.Code}
            // onChange={(e) => handleChange("Code", e.target.value)}
          />
                    <InputField
            className="w-1/2 ml-2"
            name="productShortDesciption"
            label="Product Short Description"
            labelType="left"
            // value={formData.Code}
            // onChange={(e) => handleChange("Code", e.target.value)}
          />
            </div>
        </div>
      )
    }
    return null;
  }

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

  const onPage = (event) => {
    setCurrentPage(event.first);
    setRowsPerPage(event.rows);
  };

  return (
    <div className="listingPageContainer">
      <div className="searchContainer">
        <Toolbar center={centerContent} />
        <CustomButton
          label="Create New"
          onClick={handleCreateNewClick}
          width={"120px"}
          height={"36px"}
        />
      </div>
      <div className="listingTable">
        <DataTable
          value={filteredCustomers}
          paginator
          rows={rowsPerPage}
          first={currentPage}
          onPage={onPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          totalRecords={filteredCustomers.length}
          scrollable
          scrollHeight="400px"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="name" header="Product" style={{ width: "15%" }} />
          <Column
            field="effectiveFrom"
            header="Effective From"
            style={{ width: "15%", paddingLeft: "15px" }}
          />
          <Column
            field="effectiveTo"
            header="Effective To"
            style={{ width: "15%" }}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => (
              <span style={{ color: getStatusColor(rowData.status) }}>
                {rowData.status}
              </span>
            )}
            style={{ width: "15%" }}
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
      <DialogueBox
        header={"Product Clone"}
        data={cloneModal()}
        visible={dialogVisible}
        onClose={setDialogVisible}
        yesButtonText = {"Save"}
        noButtonText = { "Cancel"}
      />
    </div>
  );
}
