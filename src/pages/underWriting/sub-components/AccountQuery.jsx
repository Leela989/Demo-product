import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import InputField from "../../../components/InputField/InputField";
import AccountData from "./AccountData.json";
import DateField from "../../../components/DateField/Datefield";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";

const AccountQuery = ({ show, setShow }) => {
  const [formData, setFormData] = useState([]);

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const baseCurrencyOptions = [
    { name: "INR", fullDefinition: "Indian Rupees" },
    { name: "USD", fullDefinition: "United States Dollar" },
    { name: "EUR", fullDefinition: "Euro" },
    { name: "GBP", fullDefinition: "British Pound" },
    { name: "JPY", fullDefinition: "Japanese Yen" },
    { name: "CNY", fullDefinition: "Chinese Yuan Renminbi" },
  ];

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const options_for_c_or_d = [
    { code: "C", name: "Credit" },
    { code: "D", name: "Debit" },
  ];

  const onEdit = (rowIndex) => {
    formData[rowIndex].showSave = true;
    setEditingRowIndex(rowIndex);
  };

  const handleInputChange = (name, value) => {
    // setFormData({ ...currencyData, [name]: value });
  };

  useEffect(() => {
    setFormData(AccountData);
  }, [AccountData]);

  const renderEditSaveButton = (rowIndex) => {
    if (formData[rowIndex].show) {
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

  const onSave = (index) => {};

  const srlTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="srl"
          value={rowData.srl}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const docTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="doc"
          value={rowData.doc}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const parseDate = (dateString = "") => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${month}-${day}-${year}`);
  };

  const dateTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <DateField
          className="w-4/4"
          name="date"
          value={parseDate(rowData.date)}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const mainAccountTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="main_acc"
          value={rowData.main_acc}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const subAccountTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="sub_acc"
          value={rowData.sub_acc}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const currencyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="currency"
          value={rowData.currency}
          options={baseCurrencyOptions}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
          dropdown
        />
      </div>
    );
  };

  const amountTcTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="amount_tc"
          value={rowData.amount_tc}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const amountLcTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="amount_lc"
          value={rowData.amount_lc}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const narrationTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="narration"
          value={rowData.narration}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const cOrDTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="c_or_d"
          value={rowData.c_or_d}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          options={options_for_c_or_d}
          dropdown
          disabled={!rowData.show}
        />
      </div>
    );
  };

  return (
    <div>
      <Dialog
        className="card-container"
        header="Account Query"
        visible={show}
        style={{ width: "80vw" }}
        onHide={() => {
          if (!show) return;
          setShow(false);
        }}
      >
        <Card className="business-rule-card">
          <div className="flex mb-7 ">
            <div className="pl-1">Policy Number</div>
            <div className="ml-10 w-3/4">
              <InputField
                className="w-4/4"
                name="rule_id"
                value="3272532737334"
                onChange={(e) => handleInputChange(e, options.rowIndex)}
                disabled
              />
            </div>
          </div>

          <DataTable value={formData} paginator rows={3} scrollable>
            <Column
              field="srl"
              header="Srl #"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => srlTemplate(rowData, rowIndex)}
              style={{ width: "15%" }}
            />

            <Column
              field="doc"
              header="Doc #"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => docTemplate(rowData, rowIndex)}
              style={{ width: "15%" }}
            />
            <Column
              field="date"
              header="Date"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => dateTemplate(rowData, rowIndex)}
              style={{ width: "15%" }}
            />
            <Column
              field="main_ac"
              header="Main a/c"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                mainAccountTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="sub_acc"
              header="Sub a/c"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                subAccountTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="currency"
              header="Currency"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                currencyTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="amount_tc"
              header="Amount TC"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                amountTcTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="amount_lc"
              header="Amount LC"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                amountLcTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="narration"
              header="Narration"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                narrationTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="c_or_d"
              header="Credit / Debit"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => cOrDTemplate(rowData, rowIndex)}
              style={{ width: "15%" }}
            />
            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButton(options.rowIndex)
              }
              style={{ width: "2%" }}
            />
          </DataTable>
        </Card>
      </Dialog>
    </div>
  );
};

export default AccountQuery;
