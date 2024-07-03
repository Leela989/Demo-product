import React, { useState, useRef } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import CustomButton from "../../components/Button/CustomButton";
import { Checkbox } from "primereact/checkbox";
import jsonData from './UserAuthorisation.json';
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import InputField from "../../components/InputField/InputField";
import './UserAuthorisationSetup.css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import CheckBox from "../../components/CheckBox/CheckBox";
import Applicable_endorsement from './Applicable_endorsement.json';

export default function User_Authorisation_Attributes() {
  const menuLeft = useRef(null);
  const [formData, setFormData] = useState({ attributeName: "", fieldType: "" });
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("UW");
const [editingRows, setEditingRows] = useState({});


  const [uwData, setUwData] = useState(jsonData.data.uw);
  const [claimsData, setClaimsData] = useState(jsonData.data.claims_data);
  const [riData, setRiData] = useState(jsonData.data.RI_Data);
  const [common, setCommon] = useState(jsonData.data.Common);
  const [ApplicableEndorsement, set_Applicable_Endorsement] = useState(jsonData.data.Applicable_Endorsement);

  const handleAttributeNameChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      attributeName: value,
    }));
  };

  const handleFieldTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      fieldType: value,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderAttributeBox = (data) => {
    return (
      <div className="attributeBox" key={data.label}>
        <p className="attributeText">{data.label}</p>
        {data.type === "checkbox" ? (
          <div className="attributeCheckBox">
            <Checkbox
              checked={formData[data.label] || false}
              onChange={(e) => handleInputChange(data.label, e.checked)}
            />
          </div>
        ) : data.type === "dropdown" ? (
          <div className="attributeDropdown">
            <AutoCompleteField
              className="w-1/1 p-1"
              name={data.label}
              value={formData[data.label] || ""}
              onChange={(e) => handleInputChange(data.label, e.value)}
              options={data.options}
              dropdown
            />
          </div>
        ) : (
          <div className="att">
            <InputField
              type="text"
              className="attributeInputField small"
              name={data.label}
              value={formData[data.label] || ""}
              onChange={(e) => handleInputChange(data.label, e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  const handleAddClick = () => {
    setAddDialogVisible(true);
  };

  const handleSave = () => {
    const newAttribute = {
      label: formData.attributeName,
      type: formData.fieldType,
      options: formData.fieldType === "dropdown" ? [] : undefined,
    };

    if (activeTab === "UW") {
      setUwData([...uwData, newAttribute]);
    } else if (activeTab === "Claims") {
      setClaimsData([...claimsData, newAttribute]);
    } else if (activeTab === "RI") {
      setRiData([...riData, newAttribute]);
    } else if (activeTab === "Common") {
      setCommon([...common, newAttribute]);
    }

    setFormData({ attributeName: "", fieldType: "" });
    setAddDialogVisible(false);
  };

  const closeModal = () => {
    setAddDialogVisible(false);
  };

  const uw_popup = () => {
    return (
      <div className="attributes-tab_container">
        <div>
          <InputField
            type="text"
            className="attributeInputField small"
            label="Attribute Name"
            labelType="left"
            name="attributeName"
            value={formData.attributeName}
            onChange={(e) => handleAttributeNameChange(e.target.value)}
          />
        </div>
        <div className="mt-9">
          <AutoCompleteField
            className="w-1/1 p-1"
            name="fieldType"
            label="Field type"
            value={formData.fieldType}
            onChange={(e) => handleFieldTypeChange(e.value)}
            options={[
              { name: "checkbox", value: "checkbox" },
              { name: "dropdown", value: "dropdown" },
              { name: "number", value: "number" },
              { name: "text", value: "text" },
            ]}
            dropdown
          />
        </div>
      </div>
    );
  };

  const options = [
    {name: "View"},
    {name: "Edit"},
    {name: "Delete"}
  ]

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
        <Button
          text
          rounded
          className="action-menu"
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const endorsement_type_options = [
    { "name": "Nill Endorsement" },
    { "name": "Addition or Deletion of Risk/Cover" },
    { "name": "Change in Policy Period" },
    { "name": "Change in Coverages" },
    { "name": "Change in Broker/Agent" }
  ]

  return (
    <div className="attributes-tab-containers">
      <div className="flex justify-end">
        <CustomButton
          label="+ADD"
          className="small-btn w-20"
          onClick={handleAddClick}
        />
      </div>
      <TabView activeIndex={["UW", "Claims", "RI", "Common", "Applicable_Endorsement"].indexOf(activeTab)} onTabChange={(e) => setActiveTab(["UW", "Claims", "RI", "Common", "Applicable_Endorsement"][e.index])}>
        <TabPanel header="Underwriting">
          <div className="attribute_Listing">
            {uwData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="Claims">
          <div className="attribute_Listing">
            {claimsData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="Reinsurance">
          <div className="attribute_Listing">
            {riData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="Common">
          <div className="attribute_Listing">
            {common.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="Applicable Endorsement">
          <div className="attribute_Listing">
          <DataTable
          value={Applicable_endorsement}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          isDataSelectable={false}
        >
          <Column
            field="endorsement_type"
            header="Endorsement Type"
            body={(rowData, options) => (
              <AutoCompleteField
              className="w-1/1 p-1"
              name={'endorsement_type'}
              value={rowData.endorsement_type}
              onChange={(e) => handleInputChange('endorsement_type', e.value)}
              options={endorsement_type_options}
              disabled={!editingRows[options.rowIndex]}
              dropdown
            />
            )}
          />
          <Column
            field="endorsement_description"
            header="Endorsement Description"
            body={(rowData, options) => (
              <InputField
                type="text"
                name="srl"
                value={rowData.endorsement_description}
                disabled={!editingRows[options.rowIndex]}
                onChange={(name, value) =>
                  handleInputChange(name, value, options.rowIndex)
                }
              />
            )}
          />
                    <Column
            field="endorsement_type_yn"
            header="Endorsement Type Allow Y/N"
            body={(rowData, options) => (
              <CheckBox
                checked={rowData.endorsement_type_yn || false}
                disabled={!editingRows[options.rowIndex]}
              />
            )}
          />

          <Column
            body={(rowData, options) =>
              actionBodyTemplate(rowData, options.rowIndex)
            }
            style={{ width: "5%" }}
          />
        </DataTable>
          </div>
        </TabPanel>
      </TabView>

      {addDialogVisible && (
        <DialogueBox
          data={uw_popup()}
          header={`Add ${activeTab} Attribute`}
          yesButtonText="Add"
          visible={addDialogVisible}
          onSave={handleSave}
          onClose={closeModal}
          noButtonText="Cancel"
        />
      )}
    </div>
  );
}
