import React, { useRef, useState } from "react";
import InputField from "../../../components/InputField/InputField";
import "./InstallPaySetup.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InstallPaySetupJson from "./InstallPaySetup.json";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../components/Button/CustomButton";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

function InstallPaySetup() {
  const handleInputChange = () => {};
  const menuLeft = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingRows, setEditingRows] = useState({});
  const [tableData, setTableData] = useState(InstallPaySetupJson);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handle_install_paysetup_Add = () => {
    const newRow = {
      inst_no: "",
      inst_perc: "",
      period: "",
      date_arrived_from: "",
      no_of_days: "",
      renew_date_arrived_from: "",
      renew_no_of_days: "",
    };
    setTableData((prev) => [...prev, newRow]);
    const newIndex = tableData.length;
    setEditingRows((prev) => ({ ...prev, [newIndex]: true }));
    setEditingRowIndex(newIndex);
  };

  const render_install_pay_setup = (header) => (
    <div className="flex justify-between items-center">
      <p>{header}</p>
      <div style={{ display: "flex" }}>
        <CustomButton
          label="+Add"
          onClick={handle_install_paysetup_Add}
          className="small-btn mt-4 -ml-16"
        />
      </div>
    </div>
  );

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    setSelectedIndex(rowIndex);
    setEditingRowIndex(rowIndex);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: true }));
  };

  const onSave = (rowIndex) => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: false }));
  };

  const onCancel = () => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [editingRowIndex]: false }));
  };

  const handlePeriodChange = (e) => {
    console.log('e', e);
    setSelectedPeriod(e.value);
    handleInputChange(e);
  };

  const renderEditSaveButton = (rowIndex) => {
    if (editingRows[rowIndex]) {
      return (
        <div>
          <i
            className="pi pi-check"
            style={{
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "rgb(30 211 30 / 79%)",
              color: "white",
            }}
            onClick={() => onSave(rowIndex)}
          ></i>
          <i
            className="pi pi-times ml-5"
            style={{
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={onCancel}
          ></i>
        </div>
      );
    } else {
      return null;
    }
  };

  const period_list = [{ name: "1 - Day" }, { name: "3 - Month" }];

  const date_arrived_from_options = [
    { name: "01- Policy Effective From Date" },
    { name: "02- Policy Issue Date" },
    { name: "03- Policy Approval Date" },
    { name: "04- Previous Installment Date" },
  ];

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
            setSelectedIndex(index);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const installment_method_list = [
    { name: "01 -Monthly" },
    { name: "02 -Bi-Monthly" },
    { name: "03 -Quarterly" },
    { name: "04 -Half-Yearly" },
    { name: "05 -Annual" },
    { name: "07 -1 Pay" },
    { name: "09 -4 Pay" },
    { name: "10 -9 Pay" },
  ];

  const handle_install_paysetup_save = () => {
    // Implement your save logic here
    // This is where you can validate and save the form data
  };

  return (
    <div>
      <div>
        <h1 className="installment_heading">Installment Pay Setup Master</h1>
        <div className="installment-step">
          <AutoCompleteField
            options={installment_method_list}
            className="w-1/3 ml-4"
            dropdown
            label="Installment Method"
            onChange={handleInputChange}
            value={""}
          />

          <InputField
            className="w-1/3 ml-4"
            name="noOf_instant"
            label="Number of Installements"
            value={""}
            onChange={handleInputChange}
            mandatory={false}
          />
          <InputField
            className="w-1/3 ml-4"
            name="min_qual_premium"
            label="Minimum Qualifying Premium"
            value={""}
            onChange={handleInputChange}
            mandatory={false}
          />
        </div>
        <div className="flex">
        <AutoCompleteField
            className="w-1/3 ml-4"
            options={period_list}
            dropdown
            label="Period"
            onChange={handlePeriodChange}
            value={selectedPeriod}
          />
          <CustomButton label="SAVE" className="ml-10 mt-6"/>
        </div>
      </div>
      <div className="installPay_table">
        <DataTable
          value={tableData}
          paginator
          rows={5}
          header={render_install_pay_setup("Details of Installments")}
        >
          <Column
            field="inst_no"
            header="Inst No."
            className="inst_no"
            style={{ width: "2%" }}
            body={(rowData, { rowIndex }) => (
              <InputField
                type="text"
                name="inst_no"
                value={rowData.inst_no}
                disabled={!editingRows[rowIndex]}
                onChange={handleInputChange}
              />
            )}
          />
          <Column
            field="inst_perc"
            header="Inst%"
            style={{ width: "5%" }}
            body={(rowData, { rowIndex }) => (
              <InputField
                type="text"
                name="inst_perc"
                value={rowData.inst_perc}
                onChange={handleInputChange}
                disabled={!editingRows[rowIndex]}
              />
            )}
          />
          <Column
            field="date_arrived_from"
            header="Date Arrived from"
            body={(rowData, { rowIndex }) => (
              <AutoCompleteField
                options={date_arrived_from_options}
                dropdown
                onChange={handleInputChange}
                value={rowData.date_arrived_from}
                disabled={!editingRows[rowIndex]}
              />
            )}
          />
          <Column
            field="no_of_days"
            header={selectedPeriod === "3 - Month" ? "No of Months" : "No of Days"}
            style={{ width: "5%" }}
            body={(rowData, { rowIndex }) => (
              <InputField
                type="text"
                name="no_of_days"
                value={rowData.no_of_days}
                onChange={handleInputChange}
                disabled={!editingRows[rowIndex]}
              />
            )}
          />
          <Column
            field="renew_date_arrived_from"
            header="Renew Date Arrived from"
            body={(rowData, { rowIndex }) => (
              <AutoCompleteField
                options={date_arrived_from_options}
                dropdown
                onChange={handleInputChange}
                value={rowData.renew_date_arrived_from}
                disabled={!editingRows[rowIndex]}
              />
            )}
          />
          <Column
            field="renew_no_of_days"
            header={selectedPeriod === "3 - Month" ? "Renew No of Months" : "Renew No of Days"}
            style={{ width: "5%" }}
            body={(rowData, { rowIndex }) => (
              <InputField
                type="text"
                name="renew_no_of_days"
                value={rowData.renew_no_of_days}
                onChange={handleInputChange}
                disabled={!editingRows[rowIndex]}
              />
            )}
          />
          <Column
            field="action"
            body={(rowData, { rowIndex }) => renderEditSaveButton(rowIndex)}
            style={{ width: "5%" }}
          />
          <Column
            header="Action"
            headerClassName="action"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "10%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default InstallPaySetup;
