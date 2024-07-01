import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import InputField from "../../components/InputField/InputField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import Data from "./codemaster.json";
import DateField from "../../components/DateField/Datefield";
import { useParams } from "react-router-dom";
import { Menu } from "primereact/menu";

export default function CodeMaster() {
  const toast = useRef(null);
  const { id } = useParams();
  const [key, setKey] = useState(0);
  const menuLeft = useRef(null);

  const [data, setData] = useState({});

  const [subData, setSubData] = useState([{ show: true, showSave: false }]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const addRow = () => {
    let newObj = {
      show: true,
      showSave: false,
    };

    setSubData((prevSubData) => [...prevSubData, newObj]);
  };

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const onEdit = (rowIndex) => {
    subData[rowIndex].showSave = true;
    setEditingRowIndex(rowIndex);
  };

  const validateForm = () => {
    const { id, master_name } = data;
    return id && master_name;
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const onClickingSave = () => {
    if (validateForm()) {
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

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onSave = (index) => {
    subData[index].showSave = false;
    setEditingRowIndex(null);
    setKey(key + 1);
  };

  const parseDate = (dateString="") => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${month}-${day}-${year}`);
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

  useEffect(() => {
    if (id) {
      const codeData = Data[id];

      if (codeData) {
        setData({ ...codeData });
        setSubData(codeData.subData);
      }
      setKey(key + 1);
    } else {
      setSubData([]);
    }
  }, [id]);

  const effectiveFormTemplate = (rowData, index) => {
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

  const effectiveToTemplate = (rowData, index) => {
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

  const codeTemplate = (rowData, index) => {
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

  const descriptionTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="description"
          value={rowData.description}
          onChange={(e) => handleInputChange(e, options.rowIndex)}
          disabled={id && !rowData.showSave}
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
            <div className="heading">Code Master Details </div>
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
              field="id"
              className="w-1/3"
              name="id"
              label="ID"
              value={data.id}
              onChange={handleInputChange}
              mandatory={true}
            />
            <InputField
              field="master_name"
              className="w-1/3 pl-2"
              name="master_name"
              label="Master Name"
              value={data.master_name}
              onChange={handleInputChange}
              mandatory={true}
            />
            <InputField
              field="description"
              className="w-1/3 pl-2 pt-1"
              name="description"
              label="Description"
              value={data.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-5 mb-5">
          <div className="mt-7"></div>
          <div className="mb-5 heading flex justify-between">
            <h1>Sub Data</h1>
            <Button
              rounded={false}
              label="Add"
              icon="pi pi-plus"
              onClick={() => addRow()}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
          </div>
          <DataTable value={subData} paginator rows={5} scrollable>
            <Column
              field="code"
              header="Code"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) => codeTemplate(rowData, rowIndex)}
              style={{ width: "15%" }}
            />

            <Column
              field="description"
              header="Description"
              headerClassName="action"
              bodyClassName="action"
              body={(rowData, { rowIndex }) =>
                descriptionTemplate(rowData, rowIndex)
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
