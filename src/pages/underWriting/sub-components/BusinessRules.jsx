import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import "./businessRule.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import InputField from "../../../components/InputField/InputField";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import data from "./businessRule.json";

export default function BusinessRules({ show, setShow }) {
  const [formData, setFormData] = useState([]);

  const menuLeft = useRef(null);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [key, setKey] = useState(0);

  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const handleInputChange = (name, value) => {
    // setFormData({ ...currencyData, [name]: value });
  };

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const renderEditSaveButton = (rowIndex) => {
    if (formData[rowIndex].showSave) {
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

  const onSave = (index) => {
    formData[index].showSave = false;
    setEditingRowIndex(null);
    setKey(key + 1);
  };

  const options_for_allow = [
    { code: "Y", name: "Yes" },
    { code: "N", name: "No" },
  ];

  const onEdit = (rowIndex) => {
    formData[rowIndex].showSave = true;
    setEditingRowIndex(rowIndex);
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

  const ruleIdTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="rate"
          value={rowData.rate}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled
        />
      </div>
    );
  };

  const ruleDescriptionTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="rate"
          value={rowData.rate}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled
        />
      </div>
    );
  };

  const allowTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <AutoCompleteField
          className="w-4/4"
          name="to_currency"
          value={rowData.to_currency}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          options={options_for_allow}
          dropdown
          disabled={!rowData.showSave}
        />
      </div>
    );
  };

  return (
    <div>
      <Dialog
        className="card-container"
        header="Business Rules"
        visible={show}
        style={{ width: "80vw" }}
        onHide={() => {
          if (!show) return;
          setShow(false);
        }}
      >
        <Card className="business-rule-card">
          <DataTable value={formData} paginator rows={5} scrollable>
            <Column
              field="rule_id"
              header="Rule ID"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                ruleIdTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />

            <Column
              field="rule_description"
              header="Rule Description"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                ruleDescriptionTemplate(rowData, rowIndex)
              }
              style={{ width: "15%" }}
            />
            <Column
              field="is_allow"
              header="Allow ?"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => allowTemplate(rowData, rowIndex)}
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
              header="Action"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "10%" }}
            />
          </DataTable>
        </Card>
      </Dialog>
    </div>
  );
}
