import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import data from "./ListingData.json";
// import "../CreateApplicationForm/DetailLoginPage.css";
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
import KebabMen from '../../assets/kebab.svg';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import "./ListingPage.css";
// import '../../components/CustomTable/CustomTable.css';

export default function ListingPage() {
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

  const cities = [
    { name: "Edit" },
    { name: "Delete" },
    { name: "Approve" },
    { name: "Amend" },
    { name: "Clone" },
  ];

  const handleCreateNewClick = () => {
    navigate("/productConfigurator/productSetup/createApplication");
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
        <img
          src={KebabMen}
          alt="KebabMen"
          className="KebabMen"
          onClick={() => toggleMenu(rowIndex)}
        />
        {menuOpen === rowIndex && (
          <div className="kebab-menu-popup">
            {cities.map((option, i) => (
              <div
                key={i}
                className="kebab-menu-item"
                onClick={() => handleOptionSelect(option.name)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
    setMenuOpen(null); 
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
    <div className="ListingPagecard">
      <div className="flex items-center justify-between">
        <div>
          <Toolbar center={centerContent} />
        </div>
        <div className="submitBtnContainer">
          <Button label="Create New" onClick={handleCreateNewClick} />
        </div>
      </div>
      <div className="DataTable">
        <div className="table-body-overflow">
          <DataTable
            value={filteredCustomers}
            paginator
            rows={rowsPerPage}
            first={currentPage}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            totalRecords={filteredCustomers.length}
            scrollable scrollHeight="flex" tableStyle={{ minWidth: '50rem' }}
          >

            <Column field="name" header="Product" style={{ width: "15%" }} />
            <Column field="effectiveFrom" header="Effective From" style={{ width: "15%", paddingLeft: '15px' }} />
            <Column field="effectiveTo" header="Effective To" style={{ width: "15%" }} />
            <Column field="status" header="Status" body={(rowData) => <span style={{ color: getStatusColor(rowData.status) }}>{rowData.status}</span>} style={{ width: "15%" }} />
            <Column header="Action" body={(rowData, { rowIndex }) => actionBodyTemplate(rowData, rowIndex)} style={{ width: "15%" }} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
