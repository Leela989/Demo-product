import React, { useEffect, useRef, useState } from "react";
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
import BulkRenewalProcessingData from "./BulkRenewalProcessingData.json";
import BulkRenewalListingData from "./BulkRenewalListing.json";
import { Toast } from "primereact/toast";
import { useParams } from "react-router-dom";
import DialogueBox from "../../../components/DialogueBox/DialogueBox";
import ErrorMessageData from "./ErrorMessage.json";
import { Checkbox } from "primereact/checkbox";

function BulkRenewalProcessing() {
  const menuLeft = useRef(null);
  const toast = useRef(null);
  // const handleInputChange = () => {};
  const addNewRow = () => {};
  const [header_data, set_header_data] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fetch_policies, set_fetch_policies] = useState(false);
  const [ex_policies, set_ex_policies] = useState(false);
  const [error_log, set_error_log] = useState(false);
  const [process, set_process] = useState(false);
  const [data, setData] = useState(BulkRenewalProcessingData);
  const [new_batch_creation, set_new_batch_creation] = useState(false);
  const [unique_key, set_unique_key] = useState(0);
  const { key } = useParams();
  const bulkKey = parseInt(key, 10);

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

  useEffect(() => {
    // Initialize data with all process_yn checkboxes checked
    const initialData = BulkRenewalProcessingData.map((row) => ({
      ...row,
      process_yn: true,
      hold_yn: false,
      renewed_yn: false,
    }));
    setData(initialData);
  }, [BulkRenewalProcessingData]);

  const handleInputChange = (rowIndex, name, value) => {
    const newData = [...data];
    newData[rowIndex][name] = value;

    if (name === "process_yn" && value) {
      newData[rowIndex]["hold_yn"] = false;
      newData[rowIndex]["renewed_yn"] = false;
    }

    if (name === "hold_yn" && value) {
      newData[rowIndex]["process_yn"] = false;
      newData[rowIndex]["renewed_yn"] = false;
    }

    if (name === "renewed_yn" && value) {
      newData[rowIndex]["process_yn"] = false;
      newData[rowIndex]["hold_yn"] = false;
    }

    setData(newData);
  };

  const handleHeaderCheckboxChange = (name, value) => {
    const newData = data.map((row) => ({
      ...row,
      [name]: value,
      ...(name === "process_yn" && value
        ? { hold_yn: false, renewed_yn: false }
        : {}),
    }));
    setData(newData);
  };


  const lob_options = [
    { name: "1001-Motor Comprehension" },
    { name: "1002-Motor Private" },
    { name: "1003-Marine Open Cover" },
    { name: "1004-Fire Open Cover" },
  ];

  const department_options = [
    { name: "101-Motor" },
    { name: "202-Fire" },
    { name: "303-Marine" },
  ];

  const options = [
    { label: "Edit" },
    { label: "Save"},
  ];

  const handle_Fetch_policies = () => {
    set_fetch_policies(true);
  };

  const handle_exemptional_policies = () => {
    set_ex_policies(true);
  };

  const ex_handle_save = () => {
    set_ex_policies(false);
  };

  const ex_handle_close = () => {
    set_ex_policies(false);
  };



  const showSuccess = () => {
    const batch_no = createRandomString();
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail:  `Saved successfully`,
      life: 3000,
    });
  };

  const handleErrorLog = () => {
    set_error_log(true);
  };

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          rounded
          text
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedIndex(rowIndex);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const business_type_list = [
    { name: "Direct without coisurance" },
    { name: " Direct with Coinsurance" },
  ];

  const render_bulk_renewal_Modal = () => (
    <div>
      <div className="processingTable">
        <DataTable
          value={ErrorMessageData}
          scrollable
          scrollHeight="200px"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          selectionMode="single"
        >
          <Column
            field="branch"
            header="Branch"
            style={{ width: "25%" }}
            body={(rowData, options) => (
              <AutoCompleteField
                name="branch"
                value={""}
                onChange={handleInputChange}
                options={OptionsForBranches}
                dropdown
                disabled
              />
            )}
          />
          <Column
            field="department"
            header="Department"
            style={{ width: "25%" }}
            body={(rowData, options) => (
              <AutoCompleteField
                name="department"
                value={""}
                onChange={handleInputChange}
                options={OptionsForBranches}
                dropdown
                disabled
              />
            )}
          />
          <Column
            field="product"
            header="Product"
            body={(rowData, options) => (
              <AutoCompleteField
                name="product"
                value={""}
                onChange={handleInputChange}
                options={OptionsForBranches}
                dropdown
                disabled
              />
            )}
          />
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
            field="error_message"
            header="Error message"
            body={(rowData, options) => (
              <InputField
                type="text"
                value={rowData.error_message}
                disabled={true}
              />
            )}
          />
        </DataTable>
      </div>
    </div>
  );

  const render_policies_modal = () => (
    <div>
      <div className="processingTable">
        <DataTable
          value={ErrorMessageData}
          scrollable
          scrollHeight="200px"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          selectionMode="single"
        >
          <Column
            field="product"
            header="Product"
            body={(rowData, options) => (
              <AutoCompleteField
                name="product"
                value={""}
                onChange={handleInputChange}
                options={OptionsForBranches}
                dropdown
                disabled
              />
            )}
          />
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
            field="renewed_number"
            header="Renewed Number"
            body={(rowData, options) => (
              <InputField
                type="text"
                value={rowData.renewed_number}
                disabled={true}
              />
            )}
          />
          <Column
            field="from_date"
            header="From Date"
            body={(rowData, options) => (
              <DateField
                name="from_date"
                value={""}
                onChange={handleInputChange}
                disabled
              />
            )}
          />
          <Column
            field="to_date"
            header="To Date"
            body={(rowData, options) => (
              <DateField
                name="to_date"
                value={""}
                onChange={handleInputChange}
                disabled
              />
            )}
          />
        </DataTable>
      </div>
    </div>
  );

  const render_process_modal = () => (
    <div>
      <h1 className="text-gray-500 font-normal text-2xl">
        Number of policies Renewed : 12 Batch ID: {BulkRenewalProcessingData.length + 1}
      </h1>
    </div>
  );

  const handleSave = () => {
    set_error_log(false);
  };

  const closeModal = () => {
    set_error_log(false);
  };

  const handleProcess = () => {
    set_process(true);
  };

  const process_handle_save = () => {
    set_process(false);
  };

  const process_handle_cancel = () => {
    set_process(false);
  };

  const source_type_list = [
    { name: "Direct" },
    { name: "Agent" },
    { name: "Broker" },
  ];

  function getFirstDateOfCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  function getLastDateOfCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 31);
  }

  const saveBatch = () => {
    console.log('saved');
    set_new_batch_creation(true);
    set_unique_key(unique_key+1);
    showSuccess();
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10000); 
  }
  
  function createRandomString() {
    const prefix = "QW";
    const randomNumber = generateRandomNumber();
    return `${prefix}${randomNumber}`;
  }
  
  

  // const handleHeaderCheckboxChange = () => {};

  const list = [{ name: "All" }];
  return (
    <div>
      <Toast ref={toast} />

      <div>
        <div className="flex">
          <DateField
            className="w-1/3 p-1"
            name="policy_expiry_from"
            label="Policy expiry from"
            value={bulkKey >= 0 ? new Date() : getFirstDateOfCurrentMonth()}
            onChange={handleInputChange}
          />
          <DateField
            className="w-1/3 p-1"
            name="policy_expiry_to"
            label="Policy expiry to"
            value={(bulkKey >= 0 && !new_batch_creation) ? new Date() : getLastDateOfCurrentMonth()}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 p-1 batch_no"
            key={unique_key}
            name="batch_no"
            label="Batch no"
            value={new_batch_creation ? createRandomString() : ""}
            onChange={handleInputChange}
            mandatory={true}
          />
        </div>
        <div className="flex">
          <AutoCompleteField
            className="w-1/3 p-1"
            name="branch"
            label="Branch"
            value={bulkKey >= 0 ? BulkRenewalListingData[bulkKey].branch : "All"}
            onChange={handleInputChange}
            options={OptionsForBranches}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="department"
            label="Department"
            value={bulkKey >= 0 ? BulkRenewalListingData[bulkKey].department : "All"}
            onChange={handleInputChange}
            options={department_options}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="lineOfBusiness"
            label="Line of Business"
            value={bulkKey >= 0 ? BulkRenewalListingData[bulkKey].lob : "All"}
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
            value={
              bulkKey >= 0 ? BulkRenewalListingData[bulkKey].product : "All"
            }
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="business_type"
            label="Business Type"
            value={
              bulkKey >= 0
                ? BulkRenewalListingData[bulkKey].business_type
                : "All"
            }
            onChange={handleInputChange}
            options={business_type_list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="source_of_business"
            label="Source of Business"
            value={
              bulkKey >= 0
                ? BulkRenewalListingData[bulkKey].source_of_business
                : "All"
            }
            onChange={handleInputChange}
            options={source_type_list}
            dropdown
          />
        </div>
        <div className="flex">
          <AutoCompleteField
            className="w-1/3 p-1"
            name="agent_broker"
            label="Agent/Broker"
            value={
              bulkKey >= 0
                ? BulkRenewalListingData[bulkKey].agent_broker
                : "All"
            }
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="policy_number_from"
            label="Policy number from"
            value={
              bulkKey >= 0
                ? BulkRenewalListingData[bulkKey].policy_number_from
                : "All"
            }
            onChange={handleInputChange}
            options={list}
            dropdown
          />
          <AutoCompleteField
            className="w-1/3 p-1"
            name="policy_number_to"
            label="Policy number to"
            value={
              bulkKey >= 0
                ? BulkRenewalListingData[bulkKey].policy_number_to
                : "All"
            }
            onChange={handleInputChange}
            options={list}
            dropdown
          />
        </div>
        <div className="flex">
          <InputField
            className="w-2/4 p-1"
            name="remark"
            label="Remark"
            value={""}
            onChange={handleInputChange}
          />
            <InputField
            className="w-1/4 p-1"
            name="process_date"
            label="Process Date"
            value={bulkKey >= 0 ? '' : new Date()}
            onChange={handleInputChange}
          />
          <CustomButton label="SAVE" className="ml-4 mt-7" onClick={saveBatch} />
        </div>
        <div className="processing_btns">
          <CustomButton
            label="Fetch Policies"
            className="small-btn processing_btn"
            onClick={handle_Fetch_policies}
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
                  value={fetch_policies ? BulkRenewalProcessingData : ""}
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
                    style={{ width: "10%" }}
                    // body={(rowData, options) => (
                    //   <InputField
                    //     type="text"
                    //     value={rowData.policy_number}
                    //     disabled={true}
                    //   />
                    // )}
                  />
                  <Column
                    field="customer"
                    header="Customer"
                    style={{ width: "10%" }}
                  />
                  <Column
                    field="issue_date"
                    header="Issue Date"
                    style={{ width: "12%" }}
                  />
                  <Column
                    field="from_date"
                    header="From Date"
                    style={{ width: "12%" }}
                  />
                  <Column
                    field="to_date"
                    header="To Date"
                    style={{ width: "12%" }}
                  />
                  <Column
                    field="claim_ratio"
                    header="Claim Ratio"
                  />
                  <Column
                    field="est_amount"
                    header="Est.Amount"
                  />
                  <Column
                    field="os_amount"
                    header="O/s amount"
                  />
      <Column
        field="process_yn"
        header={
          <div>
            <Checkbox
              className="mr-2"
              checked={data.every((row) => row.process_yn)}
              onChange={(e) => handleHeaderCheckboxChange("process_yn", e.checked)}
            />
            Process Y/N
          </div>
        }
        style={{ width: "3%" }}
        body={(rowData, options) => (
          <Checkbox
            checked={data[options.rowIndex].process_yn}
            onChange={(e) => handleInputChange(options.rowIndex, "process_yn", e.checked)}
          />
        )}
      />
      <Column
        field="hold_yn"
        header="Hold Y/N"
        style={{ width: "3%" }}
        body={(rowData, options) => (
          <Checkbox
            checked={data[options.rowIndex].hold_yn}
            disabled={data[options.rowIndex].process_yn || data[options.rowIndex].renewed_yn}
            onChange={(e) => handleInputChange(options.rowIndex, "hold_yn", e.checked)}
          />
        )}
      />
      <Column
        field="exclude_yn"
        header="Exclude Y/N"
        style={{ width: "3%" }}
        body={(rowData, options) => (
          <Checkbox
            checked={data[options.rowIndex].exclude_yn}
            disabled={data[options.rowIndex].process_yn || data[options.rowIndex].hold_yn}
            onChange={(e) => handleInputChange(options.rowIndex, "exclude_yn", e.checked)}
          />
        )}
      />
                  <Column
        field="hold_yn"
        header="Hold Y/N"
        style={{ width: "3%" }}
        body={(rowData, options) => (
          <Checkbox
            checked={data[options.rowIndex].hold_yn}
            disabled={true}
            onChange={(e) => handleInputChange(options.rowIndex, "hold_yn", e.checked)}
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
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.issue_date}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="from_date"
                    header="From Date"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.from_date}
                        disabled={true}
                      />
                    )}
                  />
                  <Column
                    field="to_date"
                    header="To Date"
                    body={(rowData, options) => (
                      <InputField
                        type="text"
                        value={rowData.to_date}
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
            onClick={handleProcess}
          />
          <CustomButton
            label="Error Log"
            className="small-btn ml-5 processing_btnss"
            onClick={handleErrorLog}
          />
          <CustomButton
            label="View Policies"
            className="small-btn ml-5"
            onClick={handle_exemptional_policies}
          />
        </div>
      </div>
      {error_log && (
        <DialogueBox
          data={render_bulk_renewal_Modal()}
          header={"Error Log"}
          yesButtonText="Save"
          visible={error_log}
          onSave={handleSave}
          onClose={closeModal}
          noButtonText="Cancel"
          showFooter={false}
        />
      )}
      {process && (
        <DialogueBox
          data={render_process_modal()}
          header={"Forms "}
          yesButtonText="Save"
          visible={process}
          onSave={process_handle_save}
          onClose={process_handle_cancel}
          noButtonText="Cancel"
          showFooter={false}
        />
      )}
      {ex_policies && (
        <DialogueBox
          data={render_policies_modal()}
          header={"View Renewed Policies"}
          yesButtonText="Save"
          visible={ex_policies}
          onSave={ex_handle_save}
          onClose={ex_handle_close}
          noButtonText="Cancel"
          showFooter={false}
        />
      )}
    </div>
  );
}

export default BulkRenewalProcessing;
