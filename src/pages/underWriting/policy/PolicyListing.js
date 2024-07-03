import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./PolicyListing.css";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import data from "./PolicyListing.json";
import CustomButton from "../../../components/Button/CustomButton";
import DialogueBox from "../../../components/DialogueBox/DialogueBox";
import InputField from "../../../components/InputField/InputField";
import LanguageDescription from "../../../components/language-description/lang-desctiption";
import DateField from "../../../components/DateField/Datefield";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import { RadioButton } from "primereact/radiobutton";

export default function PolicyListing() {
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
  const [endorsement_dialogueBox, set_endorsement_dialogueBox] =
    useState(false);
  const navigate = useNavigate();

  const handleEdit = (index) => {
    // let selectedRowIndexKey = data[selectedIndex].key;
    // navigate(
    //   `/userManagement/userAuthorisationSetup/editApplicaion/${selectedIndex}`
    // );
    // setEditRecord(true);
  };

  const blockAttributeOptions = (rowData, rowIndex) => [
    { label: "View" },
    { label: "Edit", command: () => handleEdit(rowIndex) },
    { label: "Delete" },
    { label: "Approve" },
    { label: "Iterate" },
    { label: "Endorsement" },
  ];

  const handleEndorsement = () => {
    set_endorsement_dialogueBox(true);
  };

  const handleInputChange = () => {};

  const [langData, setLangData] = useState({
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
      { lang: "Spanish", code: "es", description: "Descripción en español" },
    ],
  });

  const languageDescription1 = {
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
      { lang: "Spanish", code: "es", description: "" },
    ],
  };
  const handleLangUpdate = (updatedLang) => {
    // console.log("Updated Language Data:", updatedLang);
  };
  const premium_calculation_options = [];
  const Endorsement_popup = () => {
    return (
      <div>
        <div className="flex">
          <InputField
            className="w-1/3"
            name="code"
            label="Endorsement Code"
            value={""}
            onChange={handleInputChange}
            mandatory={true}
          />

          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Description"
            className="w-1/3 ml-4"
            onLangUpdate={handleLangUpdate}
          />
        </div>
        <div className="flex">
          <LanguageDescription
            langDefault={languageDescription1.default}
            langData={langData.data}
            labelName="Endorsement Description"
            className="w-1/3"
            onLangUpdate={handleLangUpdate}
          />
          <InputField
            className="w-1/3 ml-4"
            name="code"
            label="Endorsement #"
            value={""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex">
          <DateField
            className="w-4/4 mt-1"
            name="effectiveFrom"
            label="Endorsement Date"
            value={""}
            onChange={handleInputChange}
          />
          <AutoCompleteField
            className="w-4/4 ml-4"
            value={""}
            label="Premium Calculation type"
            onChange={handleInputChange}
            options={premium_calculation_options}
            dropdown
          />
        </div>
        <div className="flex">
          <DateField
            className="w-4/4 mt-1"
            name="effectiveFrom"
            label="Effective from Date"
            value={""}
            onChange={handleInputChange}
          />
          <DateField
            className="w-4/4 mt-1 ml-4"
            name="effectiveto"
            label="Effective to Date"
            value={""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputField
            className="w-4/4"
            name="code"
            label="Endorsement Text"
            value={""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  };

  const handleCreateNewClick = () => {
    // navigate(
    //   `/userManagement/userAuthorisationSetup/createNew/${data.length + 1}`
    // );
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

  const handleSave = () => {
    set_endorsement_dialogueBox(false);
  };

  const closeModal = () => {
    set_endorsement_dialogueBox(false);
  };

  const lob_options = [
    {name: "1001-Motor Comprehension"},
   { name: "1002-Motor Private"},
   {name: "1003-Marine Open Cover"},
   {name: "1004-Fire Open Cover"}
  ]


  const policy_header = () => {
    return (
      <div className="policyHeader">
        <div className="w-1/4 mt-6">
          <InputText
            placeholder="Search"
            className="w-1/4 searchStyle"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <i className="pi pi-search" style={{marginLeft: '-20px'}}/>
        </div>
        <div className="w-1/4">
          <AutoCompleteField
            className="w-4/4 ml-4"
            value={''}
            label="LOB"
            onChange={handleInputChange}
            options={lob_options}
            dropdown
          />
        </div>
        <div className="w-1/4 ml-8">
        <div className="radio_button_head">Product</div>
          <div className="radio">
            <div className="top_row">
              <RadioButton
                name="userCategoryUser"
                value="All"
                // onChange={(e) => handleCategoryChange("user", e.value)}
                // checked={selectedCategory.user === "All"}
              />
              <label className="ml-2">All</label>
            </div>

            <div className="bottom_row">
              <RadioButton
                name="userCategoryUser"
                value="Dropdown"
                // onChange={(e) => handleCategoryChange("user", e.value)}
                // checked={selectedCategory.user === "Dropdown"}
              />
              <AutoCompleteField
                className="w-full ml-2"
                name="user"
                value={""}
                label=""
                onChange={() => {}}
                // options={userGroup_options}
                dropdown
                // disabled={selectedCategory.user !== "Dropdown"}
              />
            </div>
          </div>
        </div>
        <div className="w-1/4 createBtn">
          <CustomButton
            label="Create New"
            onClick={handleEndorsement}
            width={"150px"}
            height={"36px"}
          />
        </div>
      
      </div>
    );
  };

  return (
    <div className="listingPageContainer">
      {/* <div className="searchContainer">
        <Toolbar
          center={centerContent}
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        />
        <CustomButton
          label="Create New"
          onClick={handleCreateNewClick}
          // width={"120px"}
          // height={"36px"}
        />
      </div> */}
      <div className="listingTable">
        <DataTable
          value={data}
          paginator
          rows={rowsPerPage}
          first={currentPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          header={policy_header}
          scrollHeight="400px"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="policy"
            header="Policy#"
            body={(rowData) => rowData.policy}
          />
          <Column
            field="product"
            header="Product"
            body={(rowData) => rowData.product}
          />
          <Column
            field="start_date"
            header="Start Date"
            body={(rowData) => rowData.start_date}
          />
          <Column
            field="end_date"
            header="End Date"
            body={(rowData) => rowData.end_date}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => rowData.status}
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

      {endorsement_dialogueBox && (
        <DialogueBox
          data={Endorsement_popup()}
          yesButtonText="Submit"
          visible={endorsement_dialogueBox}
          onSave={handleSave}
          onClose={closeModal}
          noButtonText="Cancel"
        />
      )}
    </div>
  );
}
