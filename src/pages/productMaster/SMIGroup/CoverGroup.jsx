import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./SMI_Group.css";
import { Menu } from "primereact/menu";
import CustomButton from "../../../components/Button/CustomButton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import data from "./CoverGroup.json";
import { Dialog } from "primereact/dialog";
import DialogueBox from "../../../components/DialogueBox/DialogueBox";
import InputField from "../../../components/InputField/InputField";
import DateField from "../../../components/DateField/Datefield";

const CoverGroup = () => {
  const menuLeft = useRef(null);
  const navigate = useNavigate();
  const [createNewRecord, setCreateNewRecord] = useState(false);
  const [smiGroups, setSmiGroups] = useState(data);
  const [editingRows, setEditingRows] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [sub_table_data, set_Sub_table_data] = useState([]);
  const [sub_table_key, set_sub_table_key] = useState(0);
  const [main_table_selected_index, set_main_table_selected_index] = useState(null);
  const [want_to_edt, set_want_to_edit] = useState(false);
  const [data_index, set_data_index] = useState(0);

  const onEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: true }));
  };

  const main_table_edit = (rowIndex) => {
    console.log(rowIndex,"indexx")
    set_want_to_edit(true);
  }

  useEffect(() => {
    set_Sub_table_data(data[data_index].products);
  }, [])

  const main_table_save = (rowIndex) => {

  }



  const sub_table_save = (rowIndex) => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: false }));
  }

  const sub_table_cancel = (rowIndex) => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [rowIndex]: false }));
  }

  const [newRecord, setNewRecord] = useState({
    coverGroup: "",
    description: "",
    shortDescription: "",
    longDescription: "",
    effective_from: "",
    effective_to: "",
    products: [],
  });

  const sub_table_options = [
    { label: "View" },
    { label: "Edit", command: () => onEdit(selectedIndex) },
    // { label: "Save", command: () => onSave(selectedIndex) },
    { label: "Delete" },
  ];

  const main_table_options = [
    { label: "View" },
    { label: "Edit", command: () => main_table_edit(selectedIndex) },
    { label: "Save", command: () => main_table_save(selectedIndex) },
    { label: "Delete" },
  ];

  const subTableHeading = (header) => (
    <div className="flex justify-between items-center">
      <p>{header}</p>
      <div style={{ display: "flex" }}>
        <CustomButton
          label="+Add"
          onClick={handle_smi_add}
          className="small-btn mt-4 -ml-16"
        />
      </div>
    </div>
  );

  const handle_smi_add = () => {
    const newRow = {
      product: "",
      code: "",
    };
    set_Sub_table_data([...sub_table_data, newRow]);
    const newIndex = sub_table_data.length;
    setEditingRows((prev) => ({ ...prev, [newIndex]: true }));
    setEditingRowIndex(newIndex);
    set_sub_table_key((prev) => prev+1);
  };

  const onCancel = () => {
    setEditingRowIndex(null);
    setEditingRows((prev) => ({ ...prev, [editingRowIndex]: false }));
  };

  const renderEditSaveButton = (rowIndex) => {
    if (editingRowIndex === rowIndex) {
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
            onClick={() => sub_table_save(rowIndex)}
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

  const productTemplate = (rowData) => {
    if(editingRows < sub_table_data.length){
      set_Sub_table_data(rowData.products);
    }
    return (
            <Accordion activeIndex={[0]} 
            >
        <AccordionTab
          header={mainTableData(
            rowData.coverGroup,
            rowData.description,
            rowData.shortDescription,
            rowData.effective_from,
            rowData.effective_to
          )}
        >
            <div key={sub_table_key}>
            <DataTable
            value={sub_table_data}
            tableStyle={{ minWidth: "50rem" }}
            header={subTableHeading("Applicable SMI")}
            paginator rows={5} scrollable
            key={sub_table_key}
          >
            <Column
              field="product"
              header="Product"
              body={(rowData, options) => (
                <InputField
                  type="text"
                  name="product"
                  value={rowData.product}
                  disabled={!editingRows[options.rowIndex]}
                  onChange={(name, value) =>
                    handleInputChange(name, value, options.rowIndex)
                  }
                />
              )}
            />
            <Column
              field="code"
              header="SMI Code & Description"
              body={(rowData, options) => (
                <InputField
                  type="text"
                  name="code"
                  value={rowData.code}
                  disabled={!editingRows[options.rowIndex]}
                  onChange={(name, value) =>
                    handleInputChange(name, value, options.rowIndex)
                  }
                />
              )}
            />
            <Column
              field="action"
              body={(rowData, options) =>
                renderEditSaveButton(options.rowIndex)
              }
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

        </AccordionTab>
      </Accordion>
    );
  };

  const mainTableData = (
    coverGroup,
    description,
    shortDescription,
    effective_from,
    effective_to
  ) => (
    <div className="maintableData">
      <div>{coverGroup}</div>
      <div>{description}</div>
      <div>{shortDescription}</div>
      <div>{effective_from}</div>
      <div>{effective_to}</div>
    </div>
  );

  const renderMaintableHeading = () => (
    <div className="maintableHeading">
      <div>SMI Group</div>
      <div>Description</div>
      <div>Short Description</div>
      <div>Effective From</div>
      <div>Effective To</div>
      <div>Action</div>
    </div>
  );

  const handleCreate = () => {
    setCreateNewRecord(true);
  };

  const renderMainTableHeader = () => (
    <div>
      <div className="flex justify-end">
        <CustomButton label="Create" onClick={handleCreate} />
      </div>
    </div>
  );

  const actionBodyTemplate = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={sub_table_options} popup ref={menuLeft} id="popup_menu_left" />
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
  const actionBodyTemplate1 = (rowData, index) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={main_table_options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            console.log('index', index)
            set_main_table_selected_index(index);
            menuLeft.current.toggle(event);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const parseDate = (dateString) => {
    if (typeof dateString !== "string") {
      console.error("Date string is not valid:", dateString);
      return new Date();
    }
    return new Date(dateString);
  };

  const handleInputChange = (name, value, rowIndex) => {
    if (name === "effective_from" || name === "effective_to") {
      value = formatDate(parseDate(value));
    }
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
    if (rowIndex !== undefined) {
      const updatedData = [...sub_table_data];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [name]: value,
      };
      set_Sub_table_data(updatedData);
    }
  };

  const renderCreateNewRecordPopup = () => {
    const currentRecord = want_to_edt && data[main_table_selected_index] ? data[main_table_selected_index] : newRecord;
    console.log('currentRecord', currentRecord);
  
    return (
      <div>
        <div className="flex">
          <InputField
            className="w-1/3 p-1"
            name="coverGroup"
            label="Group ID"
            value={currentRecord.coverGroup}
            onChange={(name, value) => handleInputChange(name, value)}
            mandatory={true}
          />
          <InputField
            className="w-1/3 pt-3 p-1"
            name="description"
            label="Description"
            value={currentRecord.description}
            onChange={(name, value) => handleInputChange(name, value)}
          />
          <InputField
            className="w-1/3 pt-3 p-1"
            name="shortDescription"
            label="Short Description"
            value={currentRecord.shortDescription}
            onChange={(name, value) => handleInputChange(name, value)}
          />
        </div>
        <div className="flex">
          <InputField
            className="w-1/3 pt-2 p-1"
            name="longDescription"
            label="Long Description"
            value={currentRecord.longDescription}
            onChange={(name, value) => handleInputChange(name, value)}
          />
          <DateField
            className="w-1/3 pl-1"
            label="Effective From"
            name="effective_from"
            value={currentRecord.effective_from}
            onChange={(name, value) => handleInputChange(name, value)}
          />
          <DateField
            className="w-1/3 pl-2"
            label="Effective To"
            name="effective_to"
            value={currentRecord.effective_to}
            onChange={(name, value) => handleInputChange(name, value)}
          />
        </div>
      </div>
    );
  };
  

  const handleSave = () => {
    setSmiGroups([...smiGroups, newRecord]);
    setCreateNewRecord(false);
    setNewRecord({
      coverGroup: "",
      description: "",
      shortDescription: "",
      longDescription: "",
      effective_from: "",
      effective_to: "",
      products: [],
    });
  };

  const handle_edit_save = () => {
    set_want_to_edit(false);
  }

  const handle_edit_close = () => {
    set_want_to_edit(false);
  }

  const closeModal = () => {
    setCreateNewRecord(false);
  };

  return (
    <div className="card">
      <DataTable
        value={smiGroups}
        tableStyle={{ minWidth: "70rem" }}
        header={renderMainTableHeader}
      >
        <Column body={productTemplate} header={renderMaintableHeading}></Column>
        <Column
          header="Action"
          headerClassName="action"
          bodyClassName="action"
          body={(rowData, { rowIndex }) =>
            actionBodyTemplate1(rowData, rowIndex)
          }
          style={{ width: "10%" }}
        />
      </DataTable>
      {createNewRecord && (
        <DialogueBox
          data={renderCreateNewRecordPopup()}
          header={"SMI Group Master"}
          yesButtonText="Save"
          visible={createNewRecord}
          onSave={handleSave}
          onClose={closeModal}
          noButtonText="Cancel"
        />
      )}
      {
        want_to_edt && (
          <DialogueBox
          data={renderCreateNewRecordPopup()}
          header={"SMI Group Master"}
          yesButtonText="Save"
          visible={want_to_edt}
          onSave={handle_edit_save}
          onClose={handle_edit_close}
          noButtonText="Cancel"
        />
        )
      }
    </div>
  );
};

export default CoverGroup;
    ;
