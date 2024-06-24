import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import discountdata from "./DiscountLoading.json";
import "../../Styles/DetailLoginPage.css";
import InputField from "../../../../components/InputField/InputField";
import { useParams } from "react-router-dom";
import DialogueBox from "../../../../components/DialogueBox/DialogueBox";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CustomButton from "../../../../components/Button/CustomButton";
import LanguageDescription from "../../../../components/language-description/lang-desctiption";
import { useLocation } from "react-router-dom";
import { ViewAgendaTwoTone } from "@mui/icons-material";

const DiscountLoading = ({ productData }) => {
  const menuLeft = useRef(null);
  const { id, key } = useParams();
  const [discounttableData, setDiscountTableData] = useState(discountdata);
  const [add, setAdd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedIndex, set_selected_index] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [tableData, setTableData] = useState([]);
  const productKey = parseInt(key, 10);
  const [view, set_view] = useState(false);
  const [unique_key, set_unique_key] = useState(0);
  const matchingProduct = productData.find(
    (product) => product.key === productKey
  );

  useEffect(() => {
    if (matchingProduct && matchingProduct.data?.[0]?.Discount) {
      setTableData(matchingProduct.data[0].Discount);
    }
  }, [matchingProduct]);

  const [formData, setFormData] = useState({
    Type: "",
    Code: "",
    Description: "",
    shortDescription: "",
    longDescription: "",
    Mandatory: null,
    Default_renewal: null,
    rateModify: null,
    Default_yn: null,
    effectiveFrom: null,
    effectiveTo: null,
    Sort_order: "",
  });

  const handleInputChange = (name, value) => {
    const updatedValue = value && value.target ? value.target.value : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleSave = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      Type: "",
      Code: "",
      Description: "",
      shortDescription: "",
      longDescription: "",
      Mandatory: false,
      Default_renewal: false,
      rateModify: false,
      Default_yn: false,
      effectiveFrom: null,
      effectiveTo: null,
      Sort_order: "",
    });
  };

  const handleEdit = (rowData, rowIndex) => {
    setSelectedRow(rowIndex);
    setFormData({ ...rowData });
    setAdd(true);
  };

  const handleView = () => {
    // setAdd(true);
    set_view(true);
  };

  const handle_view_close = () => {
    set_view(false);
  };

  const handle_view_save = () => {
    set_view(false);
  };

  const handleClose = () => {
    setAdd(false);
    setDeletePopup(false);
  };

  const handleDelete = () => {
    const newData = [...discounttableData];
    newData.splice(selectedRow, 1);
    setDiscountTableData(newData);
    setDeletePopup(false);
  };

  const items = [
    { label: "View", command: () => handleView() },
    {
      label: "Edit",
      command: () => handleEdit(selectedRow.rowIndex, selectedIndex),
    },
    {
      label: "Delete",
      command: () => setDeletePopup(true),
    },
  ];

  const list = [{ name: "Discount" }, { name: "Loading" }];

  const onChange = (name, value) => {
    const updatedValue = value && value.target ? value.target.value : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleCheckboxChange = (name, isChecked) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: isChecked,
    }));
  };

  const langData = {
    default: "en",
    data: [
      {
        code: "en",
        lang: "English",
        description: selectedIndex?.Long_description || "",
      },
      { code: "es", lang: "Spanish", description: "" },
    ],
  };

  const languageDescription1 = {
    default: "en",
    data: [
      {
        lang: "English",
        code: "en",
        description: selectedIndex?.Long_description || "",
      },
      { lang: "Spanish", code: "es", description: "" },
    ],
  };

  // useEffect(() => {
  //   if(add){
  //     set_selected_index(null);
  //   }
  // }, [add,view, selectedRow, formData, selectedIndex])

  const handleLangUpdate = (value) => {
    // console.log("Updated Language Data:", value);
    // if (value) {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     Description: value
    //   }));
    // } else {
    //   console.error("Invalid language data received:");
    // }
  };

  const discountPopUp = () => {
    return (
      <div key={unique_key}>
        <div className="productStep">
          <div className="topBox">
            <AutoCompleField
              className="w-1/3 p-1"
              name="Type"
              label="Type"
              labelType="left"
              options={list}
              dropdown
              onChange={handleInputChange}
              value={selectedIndex?.Type || ""}
              disabled={view}
            />
            <InputField
              className="w-1/3 p-1"
              name="Code"
              label="Code"
              labelType="left"
              onChange={handleInputChange}
              value={selectedIndex?.Code || ""}
              disabled={view}
            />
            <LanguageDescription
              langDefault={languageDescription1.default}
              langData={langData.data}
              labelName="Description"
              className="w-1/2 p-1"
              onLangUpdate={handleLangUpdate}
              value={selectedIndex?.Description || ""}
              disabled={view}
            />
          </div>
          <div className="topBox">
            <div className="w-1/2 p-1">
              <LanguageDescription
                langDefault={languageDescription1.default}
                langData={langData.data}
                labelName="Long Description"
                className="w-2/2 p-1"
                onLangUpdate={handleLangUpdate}
                value={selectedIndex?.Long_description || ""}
                disabled={view}
              />
            </div>
            <div className="w-1/2 p-1">
              <LanguageDescription
                langDefault={languageDescription1.default}
                langData={langData.data}
                labelName="Short Description"
                className="w-2/2 p-1"
                onLangUpdate={handleLangUpdate}
                value={selectedIndex?.Short_description || ""}
                disabled={view}
              />
            </div>
          </div>
          <div className="topBox">
            <div className="checkboxes w-1/5">
              <CheckBox
                labelName="Mandatory"
                name="Mandatory"
                checked={selectedIndex?.Mandatory || ""}
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                disabled={view}
              />
            </div>
            <div className="checkboxes w-2/5">
              <CheckBox
                labelName="Default On Renewal"
                name="Default_renewal"
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                checked={selectedIndex?.Default_renewal || ""}
                disabled={view}
              />
            </div>
            <div className="checkboxes w-1/5">
              <CheckBox
                labelName="Rate Modify"
                name="rateModify"
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                checked={selectedIndex?.Rate_modify_yn || ""}
                disabled={view}
              />
            </div>
            <div className="checkboxes w-1/5">
              <CheckBox
                labelName="Default"
                name="Default_yn"
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                checked={selectedIndex?.Default_yn || ""}
                disabled={view}
              />
            </div>
          </div>
          <div className="topBox">
            <div className="checkboxes w-1/4">
              <CheckBox
                labelName="NCB "
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                checked={selectedIndex?.NCB_disc_yn || ""}
                disabled={view}
              />
            </div>
            <div className="checkboxes w-2/4">
              <CheckBox
                labelName="Add RI SI"
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                checked={selectedIndex?.Add_RI_yn || ""}
                disabled={view}
              />
            </div>
            <div className="checkboxes w-1/4">
              <CheckBox
                labelName="Commission apl"
                onChange={(name, checked) =>
                  handleCheckboxChange(name, checked)
                }
                checked={selectedIndex?.Commission_apl || ""}
                disabled={view}
              />
            </div>
          </div>
          <div className="topBox">
            <InputField
              className=""
              name="Sort_order"
              label="Sort Order"
              labelType="left"
              onChange={onChange}
              value={selectedIndex?.Sort_order || ""}
              disabled={view}
            />
            <DateField
              className="w-2/4 ml-1"
              name="effectiveFrom"
              label="Effective From"
              labelType="left"
              onChange={(e) => handleInputChange("effectiveFrom", e)}
              value={selectedIndex?.effectiveFrom || ""}
              disabled={view}
            />
            <DateField
              className="w-2/4 ml-1"
              name="effectiveTo"
              label="Effective To"
              labelType="left"
              onChange={(e) => handleInputChange("effectiveTo", e)}
              value={selectedIndex?.effectiveTo || ""}
              disabled={view}
            />
          </div>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            menuLeft.current.toggle(event);
            set_selected_index(rowData);
            setSelectedRow(rowIndex);
          }}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const handle_add = () => {
    setAdd(true);
    setSelectedRow(null);
    setFormData({});
    set_selected_index(null);
    set_unique_key(unique_key + 1);
  };

  const discount_loading_header = () => {
    return (
      <div className="flex justify-end">
        <CustomButton label="+ADD" onClick={handle_add} className="small-btn" />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DataTable
          header={discount_loading_header}
          value={tableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            style={{ width: "15%" }}
            field="Type"
            header="Type"
            body={(rowData) => (
              <InputField type="text" value={rowData.Type} disabled />
            )}
          />
          <Column
            style={{ width: "35%" }}
            field="discount/loading"
            header="Discount/Loading"
            body={(rowData) => (
              <InputField
                type="text"
                value={rowData.Code + "-" + rowData.Description}
                disabled
              />
            )}
          />
          <Column
            field="Mandatory"
            header="Mandatory"
            body={(rowData) => (
              <CheckBox checked={rowData.Mandatory || false} disabled />
            )}
          />
          <Column
            field="Default_yn"
            header="Default"
            body={(rowData) => (
              <CheckBox
                type="checkbox"
                checked={rowData.Default_yn || false}
                disabled
              />
            )}
          />
          <Column
            style={{ width: "5%" }}
            field="Sort_order"
            header="Sort Order"
            body={(rowData) => (
              <InputField
                type="number"
                value={rowData.Sort_order || ""}
                disabled
              />
            )}
          />
          <Column
            field="Default_renewal"
            header="Default On Renewal"
            body={(rowData) => (
              <CheckBox
                type="checkbox"
                checked={rowData.Default_renewal || false}
                disabled
              />
            )}
          />
          <Column
            body={(rowData, rowIndex) => actionBodyTemplate(rowData, rowIndex)}
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>

      {add && (
        <DialogueBox
          data={discountPopUp()}
          header={"Discount & Loading"}
          yesButtonText="Save"
          noButtonText="Cancel"
          visible={add}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

      {view && (
        <DialogueBox
          data={discountPopUp()}
          header={"Discount & Loading"}
          yesButtonText="Save"
          noButtonText="Cancel"
          visible={view}
          onSave={handle_view_save}
          onClose={handle_view_close}
        />
      )}

      {deletePopup && (
        <DialogueBox
          data={"Are you sure want to delete the row"}
          header={"Delete row message"}
          yesButtonText="Delete"
          noButtonText="Cancel"
          visible={deletePopup}
          onSave={handleDelete}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default DiscountLoading;
