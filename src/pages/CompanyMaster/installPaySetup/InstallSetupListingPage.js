import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomButton from "../../../components/Button/CustomButton";
import InstallSetupListingPagedata from "./InstallSetupListing.json";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { OndemandVideoTwoTone } from "@mui/icons-material";

function InstallSetupListingPage() {
  const menuLeft = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const navigate = useNavigate();
  const handleCreateNewClick = () => {
    navigate("/commonMaster/installmentPaySetupMaster/createApplication");
  };

  const options = [
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "View" },
    { label: "Save" },
    { label: "Delete" },
  ];

  const onEdit = () => {
    navigate(`/commonMaster/installmentPaySetupMaster/edit/${selectedRowIndex}`);
  }

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          rounded
          text
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedRowIndex(rowIndex)
            menuLeft.current.toggle(event)}
          }
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const onPage = (event) => {
    setCurrentPage(event.first);
    setRowsPerPage(event.rows);
  };
  return (
    <div className="listingPageContainer">
      <div className="flex justify-end">
        <CustomButton
          label="Create New"
          onClick={handleCreateNewClick}
          // width={"120px"}
          // height={"36px"}
        />
      </div>
      <div className="listingTable">
        <DataTable
          value={InstallSetupListingPagedata}
          paginator rows={5} scrollable
        >
          <Column
            field="installment_method"
            header="Installment Method"
            style={{ width: "15%" }}
          />
          <Column
            field="number_of_installments"
            header="Number of Installments"
            style={{ width: "15%", paddingLeft: "15px" }}
          />
          <Column
            field="min_qualifying_premium"
            header="Minimum Qualifying Premium"
            style={{ width: "15%" }}
          />
          <Column field="period" header="Period" style={{ width: "15%" }} />
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

export default InstallSetupListingPage;
