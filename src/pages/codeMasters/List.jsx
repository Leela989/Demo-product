import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import Data from "./codemaster.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import InputField from "../../components/InputField/InputField";
import DateField from "../../components/DateField/Datefield";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import "./codemaster.css";
import { Card } from "primereact/card";

export default function List() {
  const navigate = useNavigate();
  const menuLeft = useRef(null);
  const menuLeft_sub = useRef(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedSubRowIndex, setSelectedSubRowIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingSubRowIndex, setEditingSubRowIndex] = useState(null);
  const [formData, setFormData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [key, setKey] = useState(0);
  const [subKey, setSubKey] = useState(0);

  const options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedRowIndex) },
    { label: "Delete" },
  ];

  const sub_options = [
    { label: "View" },
    { label: "Edit", command: () => onSubEdit(selectedSubRowIndex) },
    { label: "Delete" },
  ];

  const parseDate = (dateString) => {
    if (dateString != "") {
      const [day, month, year] = dateString.split("-");
      const date = new Date(`${month}-${day}-${year}`);
      date.setHours(12, 0, 0, 0); // Set the temporary time to 12:00 AM (midnight)
      return date;
    }
  };

  const onSave = (index) => {
    formData[index].show = false;
    setEditingRowIndex(null);
  };

  const onSubSave = (index) => {
    subData[index].showSave = false;
    setEditingSubRowIndex(null);
  };

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

  const addCodeMaster = () => {
    let newObj = {
      show: true,
      showSave: false,
    };

    setFormData((prevSubData) => [...prevSubData, newObj]);

    // navigate("/commonMaster/codeMaster/create");
  };

  const addSubData = () => {
    let newObj = {
      show: true,
      showSave: true,
      effective_from: "00-00-0000",
      effective_to: "00-00-0000",
      description: {
        en: "",
        es: "",
      },
    };

    setSubData((prevSubData) => [...prevSubData, newObj]);
  };

  const onEdit = (rowIndex) => {
    // navigate(`/commonMaster/codeMaster/edit/${rowIndex}`);

    formData[rowIndex].show = true;

    setEditingRowIndex(rowIndex);
    // setKey(key + 1);
  };

  const onSubEdit = (rowIndex) => {
    // navigate(`/commonMaster/codeMaster/edit/${rowIndex}`);

    subData[rowIndex].showSave = true;

    setEditingSubRowIndex(rowIndex);
    setSubKey(subKey + 1);
  };

  const handleInputChange = (name, value) => {
    // setFormData({ ...formData, [name]: value });
  };

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    // add more languages as needed
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [label, setLabel] = useState("English");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.value);
    if (e.value === "es") {
      setLabel("Spanish");
    } else {
      setLabel("English");
    }
    setSubKey(subKey + 1);
  };

  useEffect(() => {
    setFormData(Data);
    if (Data.length > 0) {
      setSelectedRowIndex(0);
      setSubData(Data[0].subData);
    }
  }, []);

  const handleRadioAction = (index) => {
    const updatedFormData = formData.map((item, i) => ({
      ...item,
      is_selected: i === index,
    }));
    setFormData(updatedFormData);
    setSelectedRowIndex(index);
    setSubData(updatedFormData[index].subData);
    setSubKey(subKey + 1);
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

  const subActionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu
          model={sub_options}
          popup
          ref={menuLeft_sub}
          id="popup_menu_left_1"
        />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setSelectedSubRowIndex(index);
            menuLeft_sub.current.toggle(event);
          }}
          aria-controls="popup_menu_left_1"
          aria-haspopup
        />
      </div>
    );
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

  const effectiveFormTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <DateField
          className="w-4/4"
          name="effective_from"
          value={parseDate(rowData.effective_from)}
          disabled={!rowData.showSave}
          showIcon={rowData.showSave}
          onChange={handleInputChange}
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
          disabled={!rowData.showSave}
          showIcon={rowData.showSave}
          onChange={handleInputChange}
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
          disabled={!rowData.showSave}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const descriptionTemplate = (rowData, index) => {
    const lang = selectedLanguage || "en";
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="description"
          value={rowData.description[lang]}
          disabled={!rowData.showSave}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const idTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="id"
          value={rowData.id}
          onChange={handleInputChange}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const nameTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <InputField
          className="w-4/4"
          name="master_name"
          value={rowData.master_name}
          onChange={handleInputChange}
          disabled={!rowData.show}
        />
      </div>
    );
  };

  const subRenderEditSaveButton = (rowIndex) => {
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
            onClick={() => onSubSave(rowIndex)}
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
            onClick={() => onSubSave(rowIndex)}
          ></i>
        </div>
      );
    }
  };

  const descriptionHeader = (
    <div className="flex align-items-center">
      <div>
        <span>Description</span>
      </div>
      <Tooltip
        target=".language-icon"
        content="Switch Language"
        position="top"
      />
      <i
        className="pi pi-globe ml-2 language-icon"
        style={{ cursor: "pointer" }}
      ></i>

      <Dropdown
        options={languages}
        value={label}
        onChange={handleLanguageChange}
        placeholder="Select Language"
        style={{ width: "200px" }}
      />
    </div>
  );

  return (
    <div className="flex parent-container">
      <Card className="business-rule-card left-container">
        <div className="w-50">
          <div className="flex flex justify-between">
            <div className="heading">
              <h1>Code Master</h1>
            </div>
            <div className="justify-end">
              <Button
                rounded={false}
                label="Add"
                // icon="pi pi-plus"
                aria-controls="popup_menu_left"
                onClick={() => addCodeMaster()}
                aria-haspopup
              />
            </div>
          </div>
          <div key={key} className="table-container">
            <DataTable value={formData} paginator rows={4} scrollable>
              <Column
                headerClassName="action"
                bodyClassName="action"
                body={(rowData, { rowIndex }) =>
                  radioActionTemplate(rowData, rowIndex)
                }
                style={{ width: "2%" }}
              />
              <Column
                field="id"
                header="ID"
                style={{ width: "10%" }}
                body={(rowData, { rowIndex }) => idTemplate(rowData, rowIndex)}
              ></Column>
              <Column
                field="master_name"
                header="Master Name"
                style={{ width: "10%" }}
                filter
                filterPlaceholder="Search by Master Name"
                body={(rowData, { rowIndex }) =>
                  nameTemplate(rowData, rowIndex)
                }
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
                style={{ width: "15%" }}
              />
            </DataTable>
          </div>
        </div>
      </Card>
      <Card className="business-rule-card ml-5 right-container">
        <div className="child-div" key={subKey}>
          <div className="title flex justify-between">
            <div>
              <h1>List of values</h1>
            </div>
            <div className="justify-end">
              <Button
                rounded={false}
                label="Add"
                // icon="pi pi-plus"
                aria-controls="popup_menu_left_1"
                onClick={() => addSubData()}
                aria-haspopup
              />
            </div>
          </div>
          <div className="table-container">
            <DataTable value={subData} paginator rows={4} scrollable>
              <Column
                field="code"
                header="Code"
                headerClassName="action"
                bodyClassName="action"
                body={(rowData, { rowIndex }) =>
                  codeTemplate(rowData, rowIndex)
                }
                style={{ width: "20%" }}
              />
              <Column
                field="description"
                header={descriptionHeader}
                headerClassName="action"
                bodyClassName="action"
                body={(rowData, { rowIndex }) =>
                  descriptionTemplate(rowData, rowIndex)
                }
                style={{ width: "20%" }}
              />
              <Column
                field="effective_from"
                header="Effective From"
                headerClassName="action"
                bodyClassName="action"
                body={(rowData, { rowIndex }) =>
                  effectiveFormTemplate(rowData, rowIndex)
                }
                style={{ width: "20%" }}
              />

              <Column
                field="effective_to"
                header="Effective To"
                headerClassName="action"
                bodyClassName="action"
                body={(rowData, { rowIndex }) =>
                  effectiveToTemplate(rowData, rowIndex)
                }
                style={{ width: "10%" }}
              />

              <Column
                field="action"
                body={(rowData, options) =>
                  subRenderEditSaveButton(options.rowIndex)
                }
                style={{ width: "10%" }}
              />

              <Column
                header="Action"
                headerClassName="action"
                bodyClassName="action"
                body={(rowData, { rowIndex }) =>
                  subActionBodyTemplate(rowData, rowIndex)
                }
                style={{ width: "10%" }}
              />
            </DataTable>
          </div>
        </div>
      </Card>
    </div>
  );
}
