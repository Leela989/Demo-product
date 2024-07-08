import React, { useRef, useState } from "react";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../components/Button/CustomButton";
import DateField from "../../../components/DateField/Datefield";
import InputField from "../../../components/InputField/InputField";
import "./BulkRenewalProcessing.css";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CheckBox from "../../../components/CheckBox/CheckBox";
import BulkRenewalProcessingData from './BulkRenewalProcessingData.json';

function BulkRenewalProcessing() {
  const menuLeft = useRef(null);
  const handleInputChange = () => {};
  const addNewRow = () => {};
  const [activeIndex, setActiveIndex] = useState(0);
  const handle_tariff_parameter_add = (header) => (
    <div>
      <div className="flex justify-end">
        <CustomButton label="+Add" onClick={addNewRow} className="small-btn" />
      </div>
    </div>
  );

  const OptionsForBranches = [
    { code: "03", name: "Mbeya Branch" },
    { code: "01", name: "Head Office" },
    { code: "02", name: "Mwanza Branch" },
    { code: "04", name: "Arusha Branch" },
    { code: "06", name: "Mbagala Branch" },
    { code: "05", name: "Dodoma Branch" },
    { code: "07", name: "Digital-sure Branch" },
    { code: "08", name: "Zanzibar Branch" },
  ];

  const lob_options = [
    {name: "1001-Motor Comprehension"},
   { name: "1002-Motor Private"},
   {name: "1003-Marine Open Cover"},
   {name: "1004-Fire Open Cover"}
  ]

  const department_options = [
    {name : "101-Motor"},
    {name : "202-Fire"},
    {name : "303-Marine"}
  ]

  const options = [{ label: "Edit" }, { label: "Save" }];

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
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

  //   const render_Edit_Save_Button = (rowIndex) => {
  //     if (editingRowIndex === rowIndex) {
  //       return (
  //         <div className="flex ml-2">
  //           <div>
  //             <i
  //               className="pi pi-check"
  //               style={{
  //                 fontSize: "1rem",
  //                 border: "none",
  //                 borderRadius: "50%",
  //                 padding: "5px",
  //                 backgroundColor: "rgb(30 211 30 / 79%)",
  //                 color: "white",
  //               }}
  //               onClick={onSave}
  //             ></i>
  //           </div>
  //           <div className="ml-5">
  //             <i
  //               className="pi pi-times"
  //               style={{
  //                 fontSize: "1rem",
  //                 border: "none",
  //                 borderRadius: "50%",
  //                 padding: "5px",
  //                 backgroundColor: "red",
  //                 color: "white",
  //               }}
  //               onClick={onCancel}
  //             ></i>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       return null;
  //     }
  //   };

  const list = [{ name: "All" }];
  return (
    <div>
      <div>
        <div className="flex">
          <DateField
            className="w-1/3 p-1"
            name="policy_expiry_from"
            label="Policy expiry from"
            value={""}
            onChange={handleInputChange}
          />
          <DateField
            className="w-1/3 p-1"
            name="policy_expiry_to"
            label="Policy expiry to"
            value={""}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 p-1 batch_no"
            name="batch_no"
            label="Batch no"
            value={""}
            onChange={handleInputChange}
            mandatory={true}
          />
        </div>
        <div className="flex">
          <AutoCompleteField
            className="w-1/3 p-1"
            name="branch"
            label="Branch"
            value={""}
            onChange={handleInputChange}
            options={OptionsForBranches}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="department"
            label="Department"
            value={""}
            onChange={handleInputChange}
            options={department_options}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="lineOfBusiness"
            label="Line of Business"
            value={""}
            onChange={handleInputChange}
            options={lob_options}
            dropdown
          />
        </div>
        <div className="flex">
          <AutoCompleteField
            className="w-1/3 p-1"
            name="product"
            label="Product"
            value={""}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="business_type"
            label="Business Type"
            value={""}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="source_of_business"
            label="Source of Business"
            value={""}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
        </div>
        <div className="flex">
          <AutoCompleteField
            className="w-1/3 p-1"
            name="agent_broker"
            label="Agent/Broker"
            value={""}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="policy_number_from"
            label="Policy number from"
            value={""}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="policy_number_to"
            label="Policy number to"
            value={""}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
        </div>
        <div className="flex">
          <InputField
            className="w-3/4 p-1"
            name="remark"
            label="Remark"
            value={""}
            onChange={handleInputChange}
            mandatory={true}
          />
          <CustomButton label="SAVE" className="ml-4 mt-7"/>
        </div>
        <div className="processing_btns">
          <CustomButton
            label="Fetch Policies"
            className="small-btn processing_btn"
          />
          <CustomButton
            label="Exemptional Policies"
            className="small-btn ml-5 processing_btn"
          />
        </div>
        <div className="processingTabletabs">
          <TabView
            className="w-full"
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Policies for renewal" className="tabs">
              <div className="processingTable">
                <DataTable
                  value={BulkRenewalProcessingData}
                  header={handle_tariff_parameter_add("Tariff Parameters")}
                  scrollable
                  scrollHeight="200px"
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  selectionMode="single"
                >
                  <Column
                    field="policy_number"
                    header="Policy number"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.policy_number}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="customer"
                    header="Customer"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.customer}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="issue_date"
                    header="Issue Date"
                    style={{width: '30%'}}

                    body={(rowData, options) => (
                      <DateField
                        name="policy_expiry_from"
                        value={rowData.issue_date}
                        onChange={handleInputChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="from_date"
                    header="From Date"
                    style={{width: '30%'}}

                    body={(rowData, options) => (
                      <DateField
                        name="policy_expiry_from"
                        value={rowData.from_date}
                        onChange={handleInputChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="to_date"
                    header="To Date"
                    style={{width: '30%'}}

                    body={(rowData, options) => (
                      <DateField
                        name="policy_expiry_from"
                        value={rowData.to_date}
                        onChange={handleInputChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="claim_ratio"
                    header="Claim Ratio"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.claim_ratio}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="est_amount"
                    header="Est.Amount"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.est_amount}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="os_amount"
                    header="O/s amount"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.Source}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="process_yn"
                    header="Process Y/N"
                    style={{width: '3%'}}
                    body={(rowData, options) => (
                      <CheckBox
                        checked={""}
                        onChange={(e) => handleInputChange}
                      />
                    )}
                  />
                  <Column
                    field="exclude_yn"
                    header="Exclude Y/N"
                    style={{width: '3%'}}
                    body={(rowData, options) => (
                      <CheckBox
                        checked={""}
                        onChange={(e) => handleInputChange}
                        disabled={false}
                      />
                    )}
                  />
                  <Column
                    field="hold_yn"
                    header="Hold Y/N"
                    body={(rowData, options) => (
                      <CheckBox
                        checked={""}
                        onChange={(e) => handleInputChange}
                      />
                    )}
                  />
                  <Column
                    field="renewed_yn"
                    header="Renewed Y/N"
                    body={(rowData, options) => (
                      <CheckBox
                        checked={""}
                        onChange={(e) => handleInputChange}
                      />
                    )}
                  />

                  <Column
                    field="action"
                    header="Action"
                    body={(rowData, { rowIndex }) =>
                      actionBodyTemplate(rowData, rowIndex)
                    }
                    style={{ width: "5%" }}
                  />
                </DataTable>
              </div>
            </TabPanel>
            <TabPanel header="Exempted Policies" className="tabs">
            <div className="processingTable">
                <DataTable
                  value={BulkRenewalProcessingData}
                  header={handle_tariff_parameter_add("Tariff Parameters")}
                  scrollable
                  scrollHeight="200px"
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  selectionMode="single"
                >
                  <Column
                    field="policy_number"
                    header="Policy number"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.policy_number}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="customer"
                    header="Customer"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.customer}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="issue_date"
                    header="Issue Date"
                    style={{width: '30%'}}

                    body={(rowData, options) => (
                      <DateField
                        name="policy_expiry_from"
                        value={rowData.issue_date}
                        onChange={handleInputChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="from_date"
                    header="From Date"
                    style={{width: '30%'}}

                    body={(rowData, options) => (
                      <DateField
                        name="policy_expiry_from"
                        value={rowData.from_date}
                        onChange={handleInputChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="to_date"
                    header="To Date"
                    style={{width: '30%'}}

                    body={(rowData, options) => (
                      <DateField
                        name="policy_expiry_from"
                        value={rowData.to_date}
                        onChange={handleInputChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="claim_ratio"
                    header="Claim Ratio"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.claim_ratio}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="est_amount"
                    header="Est.Amount"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.est_amount}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="os_amount"
                    header="O/s amount"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.Source}
                        disabled={true}
                      />
                    )}
                  />

                  <Column
                    field="action"
                    header="Action"
                    body={(rowData, { rowIndex }) =>
                      actionBodyTemplate(rowData, rowIndex)
                    }
                    style={{ width: "5%" }}
                  />
                </DataTable>
              </div>
            </TabPanel>
          </TabView>
        </div>
        <div className="processing_btns">
          <CustomButton
            label="Process"
            className="small-btn processing_btnss"
          />
          <CustomButton
            label="Error Log"
            className="small-btn ml-5 processing_btnss"
          />
        </div>
      </div>
    </div>
  );
}

export default BulkRenewalProcessing;
