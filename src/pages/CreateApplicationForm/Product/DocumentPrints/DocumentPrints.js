import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import InputField from "../../../../components/InputField/InputField";
import CustomButton from "../../../../components/Button/CustomButton";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import DocumentPrintData from "./DocumentPrint.json";
import AutoCompleteField from "../../../../components/AutoCompleteField/AutoCompleteField";
import { useParams } from "react-router";

function DocumentPrints({ productData }) {
  const menuLeft = useRef(null);
  const [data, setData] = useState(DocumentPrintData);
  const [editingRows, setEditingRows] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [tableData, setTableData] = useState([]);

  const items = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedIndex) },
    { label: "Save", command: () => onSave(selectedIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: true }));
  };

  const onSave = (rowIndex) => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: false }));
  };

  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const matchingProduct = productData.find(
    (product) => product.key === productKey
  );

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.documentPrints) {
      setTableData(matchingProduct.data[0].documentPrints);
    }
  }, [matchingProduct]);

  const actionBodyTemplate = (rowData, options) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedIndex(options.rowIndex);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const handleAdd = () => {
    const newRow = {
      srl: "",
      documentId: "",
      documentName: "",
      printBeforeApproval: false,
      reprintAllowed: false,
      numberOfPrints: 0,
    };
    setTableData((prev) => [...prev, newRow]);
    const newIndex = tableData.length;
    setEditingRows((prev) => ({ ...prev, [newIndex]: true }));
    setEditingRowIndex(newIndex);
  };

  const handleInputChange = (name, value, rowIndex) => {
    const newData = [...tableData];
    newData[rowIndex][name] = value;
    setTableData(newData);
  };

  const onCancel = () => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [editingRowIndex]: false }));
  };

  const renderCancelButton = (rowIndex) => {
    if (editingRowIndex === rowIndex) {
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
          }}
          onClick={onCancel}
        ></i>
      );
    } else {
      return null;
    }
  };

  const renderEditSaveButton = (rowIndex) => {
    if (editingRowIndex === rowIndex) {
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
          }}
          onClick={() => onSave(rowIndex)}
        ></i>
      );
    } else {
      return null;
    }
  };

  const fieldTypeOptions = [
    { name: "Proposal" },
    { name: "Quotation" },
    { name: "Policy" },
    { name: "Endorsement" },
    { name: "Claim registration" },
    { name: "Claim settlement" },
  ];

  const render_documentPrints_header = () => {
    return (
      <div className="flex justify-end">
      <CustomButton
        label="+ADD"
        onClick={handleAdd}
        className="small-btn mt-4 -ml-16"
      />
    </div>
    )
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          header={render_documentPrints_header}
          value={tableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            style={{ width: "35%" }}
            field="srl"
            header="Sr No."
            body={(rowData, options) => (
              <InputField
                type="text"
                name="srl"
                value={rowData.srl}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="documentId"
            header="Document ID"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="documentId"
                value={rowData.documentId}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="documentName"
            header="Document Name"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="documentName"
                value={rowData.documentName}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
          <Column
            style={{width: '55%'}}
            field="transactionType"
            header="Transaction Type"
            body={(rowData, options) => (
              <AutoCompleteField
                name="transactionType"
                options={fieldTypeOptions}
                value={rowData.transactionType}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
                dropdown
              />
            )}
          />
          <Column
            style={{ width: "5%" }}
            field="printBeforeApproval"
            header="Print Before approval"
            body={(rowData, options) => (
              <input
                type="checkbox"
                name="printBeforeApproval"
                checked={rowData.printBeforeApproval}
                disabled={!editingRows[options.rowIndex]}
                onChange={(e) =>
                  handleInputChange(
                    "printBeforeApproval",
                    e.target.checked,
                    options.rowIndex
                  )
                }
              />
            )}
          />
          <Column
            field="reprintAllowed"
            header="Reprint Allowed"
            body={(rowData, options) => (
              <input
                type="checkbox"
                name="reprintAllowed"
                checked={rowData.reprintAllowed}
                disabled={!editingRows[options.rowIndex]}
                onChange={(e) =>
                  handleInputChange(
                    "reprintAllowed",
                    e.target.checked,
                    options.rowIndex
                  )
                }
              />
            )}
          />

          <Column
            style={{ width: "5%" }}
            field="numberOfPrints"
            header="Number of prints"
            body={(rowData, options) => (
              <InputField
                type="number"
                name="numberOfPrints"
                value={rowData.numberOfPrints}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />

          <Column
            field="action"
            body={(rowData, options) => renderEditSaveButton(options.rowIndex)}
            style={{ width: "5%" }}
          />
          <Column
            field="action"
            body={(rowData, options) => renderCancelButton(options.rowIndex)}
            style={{ width: "5%" }}
          />
          <Column body={actionBodyTemplate} style={{ width: "10%" }} />
        </DataTable>
       
      </div>
    </div>
  );
}

export default DocumentPrints;
