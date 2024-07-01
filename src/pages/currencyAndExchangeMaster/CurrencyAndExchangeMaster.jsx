import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import InputField from "../../components/InputField/InputField";
import Departments from "./currency.json";
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

  const exchange_rate_options = [
    { label: "View" },
    { label: "Edit", command: () => editExchangeRate(selectedRowIndex) },
    { label: "Delete" },
  ];

  const { id } = useParams();

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
    formData[rowIndex].showSave = true;
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

  const [currencyData, setCurrencyData] = useState({});

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${month}-${day}-${year}`);
  };

  useEffect(() => {
    if (id == 0) {
      const departmentData = Departments[id];

      if (departmentData) {
        setCurrencyData({ ...departmentData });

        const list = [];

        const obj1 = {
          rate_type: "Buying",
          from_currency: "SAUDI RIYAL",
          to_currency: "US DOLLAR",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".27",
        };

        const obj2 = {
          rate_type: "Selling",
          from_currency: "SAUDI RIYAL",
          to_currency: "US DOLLAR",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".27",
        };

        const obj3 = {
          rate_type: "Buying",
          from_currency: "SAUDI RIYAL",
          to_currency: "SINGAPORE DOLLARS",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".36",
        };

        const obj4 = {
          rate_type: "Selling",
          from_currency: "SAUDI RIYAL",
          to_currency: "SINGAPORE DOLLARS",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".36",
        };

        const obj5 = {
          rate_type: "Buying",
          from_currency: "SAUDI RIYAL",
          to_currency: "QATAR RIYALS",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".97",
        };

        const obj6 = {
          rate_type: "Selling",
          from_currency: "SAUDI RIYAL",
          to_currency: "QATAR RIYALS",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".97",
        };

        const obj7 = {
          rate_type: "Buying",
          from_currency: "SAUDI RIYAL",
          to_currency: "EURO",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".25",
        };

        const obj8 = {
          rate_type: "Selling",
          from_currency: "SAUDI RIYAL",
          to_currency: "EURO",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: ".25",
        };

        const obj9 = {
          rate_type: "Buying",
          from_currency: "SAUDI RIYAL",
          to_currency: "INDIAN RUPEE",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: "22.25",
        };

        const obj10 = {
          rate_type: "Selling",
          from_currency: "SAUDI RIYAL",
          to_currency: "INDIAN RUPEE",
          effective_from: parseDate("02-05-2024"),
          effective_to: parseDate("31-12-2024"),
          rate: "22.25",
        };

        list.push(obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10);

        setFormData(list);
      }
      setKey(key + 1);
    }
  }, [id]);

  const editExchangeRate = (rowIndex) => {
    formData[rowIndex].showSave = true;
    formData[rowIndex].showRow = true;
    setKey(key + 1);
  };

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
    // setFormData({ ...currencyData, [name]: value });
  };

  const handleLangUpdate = (updatedLang) => {};

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
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const toCurrencyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="to_currency"
          value={rowData.to_currency}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          options={currency_options}
          dropdown
          disabled={id && !rowData.showSave}
        />
      </div>
    );
  };

  const fromCurrencyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="from_currency"
          value={rowData.from_currency}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          options={currency_options}
          dropdown
          disabled={id}
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
          disabled={id && !rowData.showSave}
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
          disabled={id && !rowData.showSave}
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
          disabled={id && !rowData.showSave}
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
    console.log("currency data -> ", currencyData);
    const { code, iso_code } = currencyData;
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
    if (formData[rowIndex].showSave) {
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

  const renderCancelButton = (rowIndex) => {
    if (formData[rowIndex].showSave) {
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
          onClick={() => onSave(rowIndex)}
        ></i>
      );
    }
  };

  const onSave = (index) => {
    formData[index].showSave = false;
    setEditingRowIndex(null);
    setKey(key + 1);
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
        <Menu
          model={exchange_rate_options}
          popup
          ref={menuLeft}
          id="popup_menu_left"
        />
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
              field="code"
              className="w-1/4"
              name="code"
              label="Code"
              value={currencyData.code}
              onChange={handleInputChange}
              mandatory={true}
            />
            <InputField
              field="iso_code"
              className="w-1/4 pl-2"
              name="iso_code"
              label="ISO Code"
              value={currencyData.iso_code}
              onChange={handleInputChange}
              mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2 pt-1"
              name="description"
              label="Description"
              value={currencyData.description}
              onChange={handleInputChange}
              // mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2 pt-1"
              name="short_description"
              label="Short Description"
              value={currencyData.short_description}
              onChange={handleInputChange}
              // mandatory={true}
            />
          </div>
          <div className="flex mt-5">
            <InputField
              className="w-1/4"
              name="unit"
              label="Unit"
              value={currencyData.unit}
              onChange={handleInputChange}
              // mandatory={true}
            />
            <InputField
              className="w-1/4 pl-2"
              name="unit_short_description"
              label="Unit Short Description"
              value={currencyData.unit_short_description}
              onChange={handleInputChange}
              // mandatory={true}
            />
            <div className="w-1/4 pl-2">
              <InputField
                className="w-4/4"
                name="format_mask"
                label="Format Mask"
                value={currencyData.format_mask}
                onChange={handleInputChange}
                // mandatory={true}
              />
              <div className="mt-2 sub-text">Example 99,99,999.99</div>
            </div>
            <InputField
              className="w-1/4 pl-2"
              name="number_of_decimals"
              label="Number of Decimals"
              value={currencyData.number_of_decimals}
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
            {/* <Column
              field="from_currency"
              header="From Currency"
              headerClassName="action"
              bodyClassName="action"
              body={fromCurrencyTemplate}
              style={{ width: "15%" }}
            /> */}
            <Column
              field="to_currency"
              header="To Currency"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                toCurrencyTemplate(rowData, rowIndex)
              }
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
            {/* <Column
              field="action"
              body={(rowData, options) => renderCancelButton(options.rowIndex)}
              style={{ width: "2%" }}
            /> */}

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
