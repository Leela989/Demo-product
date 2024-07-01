import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import CheckBox from "../../components/CheckBox/CheckBox";
import DateField from "../../components/DateField/Datefield";
import InputField from "../../components/InputField/InputField";
import Departments from "./data.json";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";

export default function Department() {
  const list = [
    { name: "Pending" },
    { name: "Approved" },
    { name: "Rejected" },
  ];
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});

  const [isApproveButtonDisabled, setIsApproveButtonDisabled] = useState(true);
  const [isAmendButtonDisabled, setIsAmendButtonDisabled] = useState(true);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  const [key, setKey] = useState(0);

  const toast = useRef(null);

  const { id } = useParams();

  const [showApprove, setShowApprove] = useState(true);

  const [isApprove, setIsApproved] = useState(false);
  const [isFreeze, setIsFreeze] = useState(false);
  const [isPermanantFreeze, setIsPermanantFreeze] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const menuLeft = useRef(null);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    subData[rowIndex].showSave = true;
    setEditingRowIndex(rowIndex);
  };

  const product_from_options = [
    { name: "10-Motor" },
    { name: "20-Fire" },
    { name: "30-Marine" },
  ];

  const customer_type_from_options = [
    { name: "AG-Agents" },
    { name: "RI-Brokers" },
  ];

  const parseDate = (dateString = "") => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${month}-${day}-${year}`);
  };

  const [subData, setSubData] = useState([{ show: true, showSave: false }]);

  const productFromActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="incharge"
          value={rowData.incharge}
          onChange={handleInputChange}
          options={product_from_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const productToActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="incharge"
          value={rowData.incharge}
          onChange={handleInputChange}
          options={product_from_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const customerTypeFromActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="incharge"
          value={rowData.incharge}
          onChange={handleInputChange}
          options={customer_type_from_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const customerTypeToActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="incharge"
          value={rowData.incharge}
          onChange={handleInputChange}
          options={customer_type_from_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const effectiveFromActionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <DateField
          className="w-4/4"
          name="effective_from"
          value={parseDate(rowData.effective_from)}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const effectiveToActionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <DateField
          className="w-4/4"
          name="effective_to"
          value={parseDate(rowData.effective_to)}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const taxPercentActionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="code"
          value={rowData.code}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  useEffect(() => {
    if (id) {
      const departmentData = Departments.find(
        (department, index) => index.toString() === id
      );
      if (departmentData) {
        const department = departmentData.department || "";
        let arr = department.split("-");
        let code = arr[0];
        let name = arr[1];

        setFormData({
          ...departmentData,
          code,
          name,
        });
        setKey(key + 1);
      }
    }
  }, [id]);

  const setApproval = () => {
    formData.approvedBy = "User 1";
    setIsAmendButtonDisabled(false);
    setIsApproveButtonDisabled(true);
    setIsApproved(true);
    setKey(key + 1);
    showSuccess();
  };

  const setAmend = () => {
    setIsApproveButtonDisabled(false);
    setIsAmendButtonDisabled(true);
    setIsApproved(false);
    showSuccess();
    setKey(key + 1);
  };

  const setFreeze = () => {
    setIsFreeze(!isFreeze);
    formData.freezeBy = "User 1";
    setKey(key + 1);
  };

  const setPermanantFreeze = () => {
    setIsPermanantFreeze(!isPermanantFreeze);
    formData.freezeBy = "User 1";
    setKey(key + 1);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const validateForm = () => {
    const { tax_code, tax_description } = formData;
    return tax_code && tax_description;
  };

  const onClickingSave = () => {
    if (validateForm()) {
      setShowApprove(false);
      setIsApproveButtonDisabled(false);
      showSuccess();
    } else {
      showMandatoryFill();
    }
  };

  const handleInputChange = (name, value) => {
    // setFormData({ ...currencyData, [name]: value });
  };

  const showMandatoryFill = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Please fill all the required details",
      life: 3000,
    });
  };

  const onSave = (index) => {
    formData[index].showSave = false;
    setEditingRowIndex(null);
    setKey(key + 1);
  };

  const renderEditSaveButton = (rowIndex) => {
    if (subData[rowIndex].showSave) {
      return (
        <div className="flex">
          <i
            className="pi pi-check"
            style={{
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "rgb(30 211 30 / 79%)",
              color: "white",
              cursor: "pointer",
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
              cursor: "pointer",
            }}
            onClick={() => onSave(rowIndex)}
          ></i>
        </div>
      );
    }
  };

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

  const addRow = () => {
    let newObj = {
      show: true,
      showSave: false,
    };

    setSubData((prevSubData) => [...prevSubData, newObj]);
  };

  return (
    <div key={key}>
      <Toast ref={toast} />
      <div>
        <div className="heading flex justify-between">
          <div>
            <h1>Tax Master</h1>
          </div>

          <div className="flex justify-end">
            <Button
              rounded={false}
              label="Approve"
              //   onClick={(event) => menuLeft.current.toggle(event)}
              aria-controls="popup_menu_left"
              onClick={() => setApproval()}
              disabled={isApproveButtonDisabled}
              aria-haspopup
            />
            <Button
              rounded={false}
              label="Amend"
              onClick={() => setAmend()}
              aria-controls="popup_menu_left"
              disabled={isAmendButtonDisabled}
              aria-haspopup
            />
            <Button
              rounded={false}
              label="Save"
              onClick={onClickingSave}
              aria-controls="popup_menu_left"
              disabled={isSaveButtonDisabled}
              aria-haspopup
            />
          </div>
        </div>
        <div className="flex">
          <InputField
            className="w-1/4 p-1"
            name="tax_code"
            label="Tax Code"
            value={formData.tax_code || ""}
            onChange={handleChange}
            mandatory={true}
          />
          <InputField
            className="w-1/4 p-1"
            name="tax_description"
            label="Tax Description"
            value={formData.tax_description}
            onChange={handleChange}
            mandatory={true}
          />
          <InputField
            className="w-1/4 p-1"
            name="short_description"
            label="Short Description"
            value={formData.short_description}
            onChange={handleChange}
          />
          <AutoCompleteField
            className="w-1/4 p-1 pt-2"
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            options={list}
            dropdown
          />
        </div>
        <div className="flex">
          <div className="w-1/4 pt-8 pl-1">
            <CheckBox
              name="refundable"
              labelName="Refundable"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4">
            <DateField
              className="w-4/4 pt-5 mr-1 ml-1"
              name="effective_from"
              label="Effective From"
              value={formData.effective_from}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/4">
            <DateField
              className="w-4/4 pl-2 pt-5"
              name="effective_to"
              label="Effective To"
              value={formData.effective_to}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="heading flex justify-between">
          <div>
            <h1>Applicable At</h1>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4">
            <CheckBox
              name="on_policy_commission"
              labelName="On Policy Commission"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4">
            <CheckBox
              name="on_policy_premium"
              labelName="On Policy Premium"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4">
            <CheckBox
              name="on_reinsurance_premium"
              labelName="On Reinsurance Premium"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4">
            <CheckBox
              name="mdp"
              labelName="MDP Y/N"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
        </div>
        <div className="flex mt-`">
          <div className="w-1/4 pt-5">
            <CheckBox
              name="on_fac_treaty_commission"
              labelName="On Fac/Treaty Commission"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4 pt-5">
            <CheckBox
              name="on_inward_outward_commission"
              labelName="On Inward/Outward Commission"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4 pt-5">
            <CheckBox
              name="on_claims_all_expenses"
              labelName="On Claims All Expenses"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
          <div className="w-1/4 pt-5">
            <CheckBox
              name="on_salvage_and_other_recovery_expenses"
              labelName="On Salvage and Other Recovery Expenses"
              boxChecked={isFreeze || false}
              onChange={() => setFreeze()}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="heading flex justify-between">
          <div>
            <h1>Tax Rates</h1>
          </div>
          <div>
            <Button
              rounded={false}
              label="Add"
              icon="pi pi-plus"
              onClick={() => addRow()}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
          </div>
        </div>
        <div>
          <DataTable value={subData} paginator rows={5} scrollable>
            <Column
              field="product_from"
              header="Product From"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                productFromActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="product_to"
              header="Product To"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                productToActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="customer_type_from"
              header="Customer Type From"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                customerTypeFromActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="customer_type_to"
              header="Customer Type To"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                customerTypeToActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="effective_from"
              header="Effective From"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                effectiveFromActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="effective_to"
              header="Effective To"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                effectiveToActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="tax_percent"
              header="Tax %"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                taxPercentActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButton(options.rowIndex)
              }
              style={{ width: "2%" }}
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
    </div>
  );
}
