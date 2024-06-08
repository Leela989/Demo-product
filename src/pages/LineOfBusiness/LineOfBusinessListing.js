import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import data from "./LOBListing.json";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./LOB.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CustomButton from "../../components/Button/CustomButton";

export default function ListingPage() {
  const menuLeft = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCustomers(
      data.map((customer) => ({ ...customer, selectedAction: null }))
    );
  }, []);

  const handleActionChange = (selectedAction, rowIndex) => {
    const updatedCustomers = [...customers];
    updatedCustomers[rowIndex].selectedAction = selectedAction;
    setCustomers(updatedCustomers);
  };

  const blockAttributeOptions = [
    { label: "Edit" },
    { label: "Delete" },
  ];

  const handleCreateNewClick = () => {
    navigate("/productConfigurator/LOB/createApplication");
  };

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
          onClick={(event) => menuLeft.current.toggle(event)}
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

          </div>
          <DataTable
            value={data}
            paginator
            rows={rowsPerPage}
            first={currentPage}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollable
            scrollHeight="400px"
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="LOB" header="Product" style={{ width: "15%" }} />
            <Column
              field="EffectiveFrom"
              header="Effective From"
              style={{ width: "15%", paddingLeft: "15px" }}
            />
            <Column
              field="EffectiveTo"
              header="Effective To"
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
  );
}
