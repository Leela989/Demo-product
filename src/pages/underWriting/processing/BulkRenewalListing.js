import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import React, { act, useRef, useState } from "react";
import BulkRenewalListingData from './BulkRenewalListing.json';
import "./BulkRenewalProcessing.css";
import { Link, useNavigate } from "react-router-dom";

export default function BulkRenewalListing() {
  const actionFilter = [{ name: "Edit" }, { name: "View" }];
  const [action, setAction] = useState("Edit");
  const navigate = useNavigate();
  const [editingRowIndex, setEditingRowIndex] = useState(null);

 

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    navigate(`/underwriting/process/bulkRenewalProcessing/edit/${rowIndex}`);
    setEditingRowIndex(rowIndex);
  };

  const handleEdit = (rowIndex) => {
    navigate(`/underwriting/process/bulkRenewalProcessing/edit/${rowIndex}`);

  };

  const blockAttributeOptions = (rowData, rowIndex) => [
    { label: "View" },
    { label: "Edit", command: () => handleEdit(rowIndex) },
  ];

  const handleInputChange = (action) => {
    setAction(action);
  };

  const changeRouteToCreateDepartment = () => {
    navigate(`/underwriting/process/bulkRenewalProcessing/create`)
  };

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [clonedRowDetails, setClonedRowDetails] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const menuLeft = useRef(null);

  const actionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedRowIndex(index);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button
          rounded={false}
          label="Create New"
          aria-controls="popup_menu_left"
          onClick={() => changeRouteToCreateDepartment()}
          aria-haspopup
        />
      </div>
      <div>
        <DataTable value={BulkRenewalListingData} paginator rows={5} scrollable>
          <Column field="batch_no" header="Batch No."></Column>
          <Column field="branch" header="Branch"></Column>
          <Column field="department" header="Department"></Column>
          <Column field="lob" header="LOB" style={{width: '20%'}}></Column>
          {/* <Column field="product" header="Product"></Column> */}
          {/* <Column field="business_type" header="Business Type"></Column>
          <Column field="source_of_business" header="Source of business"></Column>
          <Column field="agent_broker" header="Agent/Broker"></Column>
          <Column field="policy_number_from" header="Policy number from"></Column>
          <Column field="policy_number_to" header="Policy number to"></Column> */}
          <Column field="policy_expiry_from" header="Policy expiry from"></Column>
          <Column field="policy_expiry_to" header="Policy expiry to"></Column>
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
