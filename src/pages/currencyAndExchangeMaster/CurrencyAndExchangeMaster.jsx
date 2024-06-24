import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import InputField from "../../components/InputField/InputField";
import Departments from "../../pages/CompanyMaster/exchangeRate.json";
import DateField from "../../components/DateField/Datefield";
import "./currency.css";
import { Menu } from "primereact/menu";

function CurrencyAndExchangeMaster() {
  const [key, setKey] = useState(0);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const [showApprove, setShowApprove] = useState(true);

  const toast = useRef(null);

  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const list = [{ name: "Type 1" }, { name: "Type 2" }, { name: "Type 3" }];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const menuLeft = useRef(null);

  const navigate = useNavigate();

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const onEdit = (rowIndex) => {
    navigate(`/commonMaster/departmentMaster/edit/${rowIndex}`);
    setEditingRowIndex(rowIndex);
  };

  const [formData, setFormData] = useState([{ show: true }]);
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

  const [shortLangData, setShortLangData] = useState({
    default: "en",
    data: [
      { code: "en", lang: "English", description: "" },
      { code: "es", lang: "Spanish", description: "Descripción en español" },
    ],
  });

  const handleInputChange = (name, value) => {
    // setFormData({ ...formData, [name]: value });
  };

  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

  const currency_options = [
    { code: "UGX", name: "UGANDA  SHILLINGS" },
    { code: "USD", name: "US DOLLAR" },
    { code: "ZMW", name: "ZAMBIA KWACHA" },
    { code: "ZAR", name: "SOUTH AFRICAN RAND" },
    { code: "TZS", name: "TANZANIAN SHILLINGS" },
    { code: "EUR", name: "EURO" },
    { code: "SGD", name: "SINGAPORE DOLLARS" },
    { code: "SAR", name: "SAUDI RIYAL" },
    { code: "QAR", name: "QATAR RIYALS" },
  ];

  const rate_type_options = [
    { code: "B", name: "Buying" },
    { code: "S", name: "Selling" },
  ];

  const rateTypeTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="rate_type"
          value={rowData.rate_type}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          options={rate_type_options}
          dropdown
        />
      </div>
    );
  };

  const toCurrencyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="currency"
          value={rowData.currency}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          options={currency_options}
          dropdown
        />
      </div>
    );
  };

  const effectiveFormTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <DateField
          className="w-4/4"
          name="effective_from"
          value={rowData.effective_from}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
        />
      </div>
    );
  };

  const effectiveToTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <DateField
          className="w-4/4"
          name="effective_to"
          value={rowData.effective_to}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
        />
      </div>
    );
  };

  const rateTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="rate"
          value={rowData.rate}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
        />
      </div>
    );
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const addRow = () => {
    let obj = {
      show: true,
    };

    setFormData((prevDeptData) => [...prevDeptData, obj]);
  };

  const validateForm = () => {
    const { code, iso_code } = formData;
    return code && iso_code;
  };

  const onClickingSave = () => {
    if (validateForm()) {
      setShowApprove(false);
      showSuccess();
    } else {
      showMandatoryFill();
    }
  };

  const showMandatoryFill = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Please fill all the required details",
      life: 3000,
    });
  };

  const renderEditSaveButton = (rowIndex) => {
    if (formData[rowIndex].show) {
      return (
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
      );
    }
  };

  const renderCancelButton = (rowIndex) => {
    if (formData[rowIndex].show) {
      return (
        <i
          className="pi pi-times"
          style={{
            fontSize: "1rem",
            border: "none",
            borderRadius: "50%",
            padding: "5px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => onCancel(rowIndex)}
        ></i>
      );
    }
  };

  const onSave = (index) => {
    // formData[index].show = false;
    // setEditingRowIndex(null);
    // setKey(key + 1);
  };

  const onCancel = (index) => {
    // const updatedFormData = formData.filter((_, i) => i !== index);
    // console.log("FormData after filter:", updatedFormData);
    // setFormData(updatedFormData);
    // formData[index] = {};
    // formData[index].show = false;
    // setEditingRowIndex(null);
    // setKey(key + 1);
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

  return (
    <div key={key}>
      <div>
        <Toast ref={toast} />

        <div className="card">
          <div className="flex justify-between mb-3">
            <div className="heading">Currency And Exchange Rate details</div>
            <div className="flex justify-end">
              <Button
                rounded={false}
                label="Save"
                onClick={onClickingSave}
                aria-controls="popup_menu_left"
                aria-haspopup
              />
            </div>
          </div>
          <div className="flex">
            <InputField
              className="w-1/4"
              name="code"
              label="Code"
              value={formData.code}
              onChange={handleInputChange}
              mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2"
              name="iso_code"
              label="ISO Code"
              value={formData.code}
              onChange={handleInputChange}
              mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2 pt-1"
              name="code"
              label="Description"
              value={formData.code}
              onChange={handleInputChange}
              // mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2 pt-1"
              name="code"
              label="Short Description"
              value={formData.code}
              onChange={handleInputChange}
              // mandatory={true}
            />
          </div>
          <div className="flex mt-5">
            <InputField
              className="w-1/4"
              name="code"
              label="Unit"
              value={formData.code}
              onChange={handleInputChange}
              // mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2"
              name="code"
              label="Unit Short Description"
              value={formData.code}
              onChange={handleInputChange}
              // mandatory={true}
            />
            <div className="w-1/4 pl-2">
              <InputField
                className="w-4/4"
                name="code"
                label="Format Mask"
                value={formData.code}
                onChange={handleInputChange}
                // mandatory={true}
              />
              <div className="mt-2 sub-text">Example 99,99,999.99</div>
            </div>
            <InputField
              className="w-1/4 pl-2"
              name="code"
              label="Number of Decimals"
              value={formData.code}
              onChange={handleInputChange}
              // mandatory={true}
            />
          </div>
        </div>
        <div className="mt-5 mb-5">
          <div className="mt-7"></div>
          <div className="mb-5 heading flex justify-between">
            <h1>Exchange Rate</h1>
            <Button
              rounded={false}
              label="Add"
              icon="pi pi-plus"
              onClick={() => addRow()}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
          </div>
          <DataTable value={formData} paginator rows={5} scrollable>
            <Column
              field="rate_type"
              header="Rate Type"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                rateTypeTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="currency"
              header="To Currency"
              headerClassName="action"
              bodyClassName="action"
              body={toCurrencyTemplate}
              style={{ width: "15%" }}
            />
            <Column
              field="effective_from"
              header="Effective From"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                effectiveFormTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="effective_to"
              header="Effective To"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                effectiveToTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="rate"
              header="Rate"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => rateTemplate(rowData, rowIndex)}
              style={{ width: "15%" }}
            />

            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButton(options.rowIndex)
              }
              style={{ width: "2%" }}
            />
            <Column
              field="action"
              body={(rowData, options) => renderCancelButton(options.rowIndex)}
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

export default CurrencyAndExchangeMaster;
