import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import CheckBox from "../../components/CheckBox/CheckBox";
import DateField from "../../components/DateField/Datefield";
import InputField from "../../components/InputField/InputField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { RadioButton } from "primereact/radiobutton";
import Data from "./data.json";

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
  const [editingSubRowIndex, setEditingSubRowIndex] = useState(null);
  const [editingChildRowIndex, setEditingChildRowIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedSubRowIndex, setSelectedSubRowIndex] = useState(null);
  const [selectedChildRowIndex, setSelectedChildRowIndex] = useState(null);
  const [subKey, setSubKey] = useState(0);
  const [childKey, setChildKey] = useState(0);

  const [applicable_data, setApplicableData] = useState([{ show: true, showSave: false }]);

  const menuLeft = useRef(null);
  const sub_menuLeft = useRef(null);
  const child_menuLeft = useRef(null);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onSubEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const sub_options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedSubRowIndex) },
    { label: "Delete" },
  ];

  const child_options = [
    { label: "View" },
    { label: "Edit", command: () => onChildEdit(selectedChildRowIndex) },
    { label: "Delete" },
  ];

  const onSubEdit = (rowIndex) => {
    subData[rowIndex].showSave = true;
    setEditingRowIndex(rowIndex);
  };

  const onEdit = (rowIndex) => {
    applicable_data[rowIndex].show = true;
    setEditingSubRowIndex(rowIndex);
  };

  const onChildEdit = (rowIndex) => {
    childData[rowIndex].showSave = true;
    setEditingChildRowIndex(rowIndex);
  };

  const product_from_options = [
    { name: "10-Motor Commission" },
    { name: "20-Fire & Allied" },
  ];

  const transaction_options = [
    { name: "01-On Policy Premium" },
    { name: "02-On Policy Commission" },
    { name: "03-On Claim Expenses" },
  ];

  const tax_flow_options = [
    { name: "01-Input tax" },
    { name: "02-Output tax" },
  ];

  const tax_calc_method_options = [{ name: "01-Inclusive tax" }];

  const tax_classification_options = [
    { name: "01-Default rate" },
    { name: "02-Expection rate" },
    { name: "03-Outof scope" },
  ];

  const lob_options = [{ name: "01-Motor" }, { name: "02-Fire" }];

  const item_options = [{ name: "01-Cover" }, { name: "02-Charge" }];

  const customer_type_from_options = [
    { name: "AG-Agents" },
    { name: "RI-Brokers" },
  ];

  const parseDate = (dateString = "") => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${month}-${day}-${year}`);
  };

  const [subData, setSubData] = useState([{ show: true, showSave: false }]);

  const [childData, setChildData] = useState([{ show: true, showSave: false }]);

  const productFromActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="product_from"
          value={rowData.product_from}
          onChange={handleInputChange}
          options={product_from_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const childTaxClassificationActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="tax_classification"
          value={rowData.tax_classification}
          onChange={handleInputChange}
          options={tax_classification_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const childTransactionActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="transaction"
          value={rowData.transaction}
          onChange={handleInputChange}
          options={transaction_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const childItemActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="item"
          value={rowData.item}
          onChange={handleInputChange}
          options={item_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const childItemCodeFromActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="item_code_from"
          value={rowData.item_code_from}
          onChange={handleInputChange}
          options={item_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const childItemCodeToActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="item_code_to"
          value={rowData.item_code_to}
          onChange={handleInputChange}
          options={item_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const childEffectiveFromActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        {id && !rowData.showSave ? (
          <InputField
            className="pt-1 parent-container"
            name="effective_from"
            value={rowData.effective_from}
            onChange={handleInputChange}
            disabled={id && !rowData.showSave}
          />
        ) : (
          <DateField
            value={parseDate(rowData.effective_from)}
            onChange={(e) => handleInputChange(e, options.rowIndex)}
            className="pt-1 parent-container"
            name="effective_from"
            disabled={id && !rowData.showSave}
          />
        )}
      </div>
    );
  };

  const childEffectiveToActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        {id && !rowData.showSave ? (
          <InputField
            className="pt-1 parent-container"
            name="effective_to"
            value={rowData.effective_to}
            onChange={handleInputChange}
            disabled={id && !rowData.showSave}
          />
        ) : (
          <DateField
            value={parseDate(rowData.effective_to)}
            onChange={(e) => handleInputChange(e, options.rowIndex)}
            className="pt-1 parent-container"
            name="effective_to"
            disabled={id && !rowData.showSave}
          />
        )}
      </div>
    );
  };

  const taxClassificationActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="tax_classification"
          value={rowData.tax_classification}
          onChange={handleInputChange}
          options={tax_classification_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const lobActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="lob"
          value={rowData.lob}
          onChange={handleInputChange}
          options={lob_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const rateActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="pt-1 parent-container"
          name="rate"
          value={rowData.rate}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const subDataEffectiveFromActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        {id && !rowData.showSave ? (
          <InputField
            className="pt-1 parent-container"
            name="effective_from"
            value={rowData.effective_from}
            onChange={handleInputChange}
            disabled={id && !rowData.showSave}
          />
        ) : (
          <DateField
            value={parseDate(rowData.effective_from)}
            onChange={(e) => handleInputChange(e, options.rowIndex)}
            className="pt-1 parent-container"
            name="effective_from"
            disabled={id && !rowData.showSave}
          />
        )}
      </div>
    );
  };

  const subDataEffectiveToActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        {id && !rowData.showSave ? (
          <InputField
            className="pt-1 parent-container"
            name="effective_to"
            value={rowData.effective_to}
            onChange={handleInputChange}
            disabled={id && !rowData.showSave}
          />
        ) : (
          <DateField
            value={parseDate(rowData.effective_to)}
            onChange={(e) => handleInputChange(e, options.rowIndex)}
            className="pt-1 parent-container"
            name="effective_to"
            disabled={id && !rowData.showSave}
          />
        )}
      </div>
    );
  };

  const transactionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="transaction"
          value={rowData.transaction}
          onChange={handleInputChange}
          disabled={!rowData.show}
          options={transaction_options}
          dropdown
        />
      </div>
    );
  };

  const taxFlowBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="tax_flow"
          value={rowData.tax_flow}
          onChange={handleInputChange}
          disabled={!rowData.show}
          options={tax_flow_options}
          dropdown
        />
      </div>
    );
  };

  const taxCalcMethodBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="tax_calc_method"
          value={rowData.tax_calc_method}
          onChange={handleInputChange}
          disabled={!rowData.show}
          options={tax_calc_method_options}
          dropdown
        />
      </div>
    );
  };

  const productToActionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="pt-1 parent-container"
          name="product_to"
          value={rowData.product_to}
          onChange={handleInputChange}
          options={product_from_options}
          dropdown
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
          name="tax_percent"
          value={rowData.tax_percent}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  useEffect(() => {
    if (id) {
      const departmentData = Data.find(
        (department, index) => index.toString() === id
      );
      if (departmentData) {
        const applicable_data = departmentData.applicable_at || [];

        setApplicableData(applicable_data);

        const subData = applicable_data[0]?.subData || [];

        const childData = subData[0]?.childData || [];

        setSubData(subData);

        setChildData(childData);

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

  const actionBodyTemplateForApplicableData = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu
          model={sub_options}
          popup
          ref={sub_menuLeft}
          id="popup_menu_left"
        />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedSubRowIndex(index);
            sub_menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const actionBodyTemplateForSubData = (rowData, index) => {
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

  const actionBodyTemplateForChildData = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu
          model={child_options}
          popup
          ref={child_menuLeft}
          id="popup_menu_left"
        />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedChildRowIndex(index);
            child_menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
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

  const addChildRow = () => {
    let newObj = {
      show: true,
      showSave: false,
    };

    setChildData((prevSubData) => [...prevSubData, newObj]);
  };

  const radioActionTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <RadioButton
          name="is_selected"
          value={rowData.is_selected}
          onChange={() => handleRadioAction(index)}
          checked={rowData.is_selected}
        />
      </div>
    );
  };

  const radioSubActionTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <RadioButton
          name="is_selected"
          onChange={() => handleRadioActionForSubData(index)}
          value={rowData.is_selected}
          checked={rowData.is_selected}
        />
      </div>
    );
  };

  const handleRadioActionForSubData = (index) => {
    const updatedFormData = subData.map((item, i) => ({
      ...item,
      is_selected: i === index,
    }));

    setSubData(updatedFormData);

    const childData = updatedFormData[index]?.childData || [];

    setChildData(childData);

    setKey(key + 1);

    setSubKey(subKey + 5);

    setChildKey(childKey + 1);
  };

  const handleRadioAction = (index) => {
    const updatedFormData = applicable_data.map((item, i) => ({
      ...item,
      is_selected: i === index,
    }));
    setApplicableData(updatedFormData);

    const subData = updatedFormData[index]?.subData || [];

    const childData = subData[index]?.childData || [];

    setSubData(subData);

    setChildData(childData);
  };

  const add = () => {
    let newObj = {
      show: true,
      showSave: false,
    };

    setApplicableData((prevSubData) => [...prevSubData, newObj]);
  };

  const onSaveForApplicableData = (index) => {
    applicable_data[index].show = false;
  };

  const renderEditSaveButtonForApplicableData = (rowIndex) => {
    if (applicable_data[rowIndex].show) {
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
            onClick={() => onSaveForApplicableData(rowIndex)}
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
            onClick={() => onSaveForApplicableData(rowIndex)}
          ></i>
        </div>
      );
    }
  };

  const renderEditSaveButtonForSubData = (rowIndex) => {
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
            onClick={() => onSaveForApplicableData(rowIndex)}
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
            onClick={() => onSaveForApplicableData(rowIndex)}
          ></i>
        </div>
      );
    }
  };

  const renderEditSaveButtonForChildData = (rowIndex) => {
    if (childData[rowIndex].showSave) {
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
            onClick={() => onSaveForApplicableData(rowIndex)}
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
            onClick={() => onSaveForApplicableData(rowIndex)}
          ></i>
        </div>
      );
    }
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
            className="w-1/4 p-1 pt-3"
            name="short_description"
            label="Short Description"
            value={formData.short_description}
            onChange={handleChange}
          />
          <AutoCompleteField
            className="w-1/4 p-1 pt-3"
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
          <div className="justify-end">
            <Button
              rounded={false}
              label="Add"
              // icon="pi pi-plus"
              aria-controls="popup_menu_left"
              onClick={() => add()}
              aria-haspopup
            />
          </div>
        </div>
        <div>
          <DataTable value={applicable_data} paginator rows={5} scrollable>
            <Column
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                radioActionTemplate(rowData, rowIndex)
              }
              style={{ width: "2%" }}
            />
            <Column
              field="transaction"
              header="Transaction"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                transactionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="tax_flow"
              header="Tax Flow"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                taxFlowBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="tax_calc_method"
              header="Tax Calc Method"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                taxCalcMethodBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButtonForApplicableData(options.rowIndex)
              }
              style={{ width: "2%" }}
            />
            <Column
              header="Action"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplateForApplicableData(rowData, rowIndex)
              }
              style={{ width: "10%" }}
            />
          </DataTable>
        </div>
      </div>
      <div className="mt-5" key={subKey}>
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
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                radioSubActionTemplate(rowData, rowIndex)
              }
              style={{ width: "2%" }}
            />
            <Column
              field="tax_classification"
              header="Tax Classification"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                taxClassificationActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="lob"
              header="Lob"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                lobActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
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
              field="rate"
              header="Rate"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                rateActionBodyTemplate(rowData, rowIndex)
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
              field="effective_from"
              header="Effective From"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                subDataEffectiveFromActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="effective_to"
              header="Effective To"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                subDataEffectiveToActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButtonForSubData(options.rowIndex)
              }
              style={{ width: "2%" }}
            />
            <Column
              header="Action"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplateForSubData(rowData, rowIndex)
              }
              style={{ width: "10%" }}
            />
          </DataTable>
        </div>
        <div className="heading flex justify-between">
          <div className="mt-5">
            <h1>Applicable Items</h1>
          </div>
          <div className="mt-5">
            <Button
              rounded={false}
              label="Add"
              icon="pi pi-plus"
              onClick={() => addChildRow()}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
          </div>
        </div>
        <div key={childKey}>
          <DataTable value={childData} paginator rows={5} scrollable>
            <Column
              field="tax_classification"
              header="Tax Classification"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childTaxClassificationActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="transaction"
              header="Transaction"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childTransactionActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="item"
              header="Item"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childItemActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="item_code_from"
              header="Item Code From"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childItemCodeFromActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="item_code_to"
              header="Item Code To"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childItemCodeToActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="effective_from"
              header="Effective From"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childEffectiveFromActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="effective_to"
              header="Effective To"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                childEffectiveToActionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButtonForChildData(options.rowIndex)
              }
              style={{ width: "2%" }}
            />
            <Column
              header="Action"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplateForChildData(rowData, rowIndex)
              }
              style={{ width: "10%" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
